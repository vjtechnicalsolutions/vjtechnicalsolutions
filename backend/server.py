import asyncio
import logging
import os
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import List, Optional

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Request, Response
from pydantic import BaseModel, EmailStr, Field
from pymongo import ReturnDocument
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from lib.db import client, db, ensure_indexes
from lib.emailer import enquiry_email_html, notify_owner, ticket_email_html


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.index_task = asyncio.create_task(ensure_indexes())
    yield
    client.close()


app = FastAPI(lifespan=lifespan)
api_router = APIRouter(prefix="/api")

EMERGENT_SESSION_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"
SESSION_DAYS = 7

ENQUIRY_STATUSES = {"NEW", "IN_PROGRESS", "RESOLVED"}
TICKET_STATUSES = {"OPEN", "IN_PROGRESS", "RESOLVED"}


# ---------- Models ----------
class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    vessel_name: Optional[str] = None
    imo: Optional[str] = None
    port: Optional[str] = None
    service_date: Optional[str] = None
    system: str
    message: str


class Enquiry(EnquiryCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "NEW"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class TicketCreate(BaseModel):
    name: str
    email: EmailStr
    vessel_name: Optional[str] = None
    imo: Optional[str] = None
    priority: str = "P4"
    subject: str
    description: str


class Ticket(TicketCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    ticket_ref: str = Field(default_factory=lambda: f"VJ-{uuid.uuid4().hex[:6].upper()}")
    status: str = "OPEN"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class Post(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    title: str
    excerpt: str
    body: str
    category: str
    image: Optional[str] = None
    read_minutes: int = 4
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SessionRequest(BaseModel):
    session_id: str


class StatusUpdate(BaseModel):
    status: str


class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None


# ---------- Auth helpers ----------
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("session_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


async def get_admin_user(request: Request) -> dict:
    user = await get_current_user(request)
    allowlist = [e.strip().lower() for e in os.environ.get("ADMIN_EMAILS", "").split(",") if e.strip()]
    if allowlist and user["email"].lower() not in allowlist:
        raise HTTPException(status_code=403, detail="Admin access restricted")
    return user


# ---------- Auth routes (Emergent-managed Google sign-in) ----------
@api_router.post("/auth/session", response_model=User)
async def create_auth_session(body: SessionRequest, response: Response):
    async with httpx.AsyncClient(timeout=15) as http:
        r = await http.get(EMERGENT_SESSION_URL, headers={"X-Session-ID": body.session_id})
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session_id")
    data = r.json()
    email = data["email"].lower()
    user_doc = await db.users.find_one({"email": email}, {"_id": 0})
    if user_doc is None:
        user_doc = {
            "user_id": f"user_{uuid.uuid4().hex[:12]}",
            "email": email,
            "name": data.get("name", ""),
            "picture": data.get("picture"),
            "created_at": datetime.now(timezone.utc),
        }
        await db.users.insert_one(dict(user_doc))
    token = data["session_token"]
    await db.user_sessions.insert_one({
        "user_id": user_doc["user_id"],
        "session_token": token,
        "expires_at": datetime.now(timezone.utc) + timedelta(days=SESSION_DAYS),
        "created_at": datetime.now(timezone.utc),
    })
    response.set_cookie(
        key="session_token", value=token, httponly=True, secure=True,
        samesite="none", max_age=SESSION_DAYS * 24 * 3600, path="/",
    )
    return User(**user_doc)


@api_router.get("/auth/me", response_model=User)
async def auth_me(user: dict = Depends(get_current_user)):
    return User(**user)


@api_router.post("/auth/logout")
async def auth_logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_many({"session_token": token})
    response.delete_cookie(key="session_token", path="/", secure=True, samesite="none")
    return {"ok": True}


# ---------- Public routes ----------
@api_router.get("/")
async def root():
    return {"message": "VJ Technical Solutions API"}


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    enquiry = Enquiry(**input.model_dump())
    await db.enquiries.insert_one(enquiry.model_dump())
    html = enquiry_email_html([
        ("Name", enquiry.name),
        ("Email", enquiry.email),
        ("Phone", enquiry.phone or ""),
        ("Vessel", enquiry.vessel_name or ""),
        ("IMO", enquiry.imo or ""),
        ("Port / Location", enquiry.port or ""),
        ("System", enquiry.system),
        ("Required date", enquiry.service_date or ""),
        ("Message", enquiry.message),
    ])
    asyncio.create_task(notify_owner(f"New service request — {enquiry.system}", html))
    return enquiry


@api_router.post("/tickets", response_model=Ticket)
async def create_ticket(input: TicketCreate):
    ticket = Ticket(**input.model_dump())
    await db.tickets.insert_one(ticket.model_dump())
    html = ticket_email_html([
        ("Reference", ticket.ticket_ref),
        ("Priority", ticket.priority),
        ("Subject", ticket.subject),
        ("Reporter", ticket.name),
        ("Email", ticket.email),
        ("Vessel", ticket.vessel_name or ""),
        ("IMO", ticket.imo or ""),
        ("Description", ticket.description),
    ])
    asyncio.create_task(notify_owner(f"New support ticket {ticket.ticket_ref} ({ticket.priority})", html))
    return ticket


@api_router.get("/posts", response_model=List[Post])
async def list_posts():
    return await db.posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(50)


# ---------- Admin routes ----------
@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries(user: dict = Depends(get_admin_user)):
    return await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.patch("/enquiries/{enquiry_id}/status", response_model=Enquiry)
async def update_enquiry_status(enquiry_id: str, body: StatusUpdate, user: dict = Depends(get_admin_user)):
    status = body.status.upper()
    if status not in ENQUIRY_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    doc = await db.enquiries.find_one_and_update(
        {"id": enquiry_id}, {"$set": {"status": status}},
        return_document=ReturnDocument.AFTER, projection={"_id": 0},
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return doc


@api_router.get("/tickets", response_model=List[Ticket])
async def list_tickets(user: dict = Depends(get_admin_user)):
    return await db.tickets.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)


@api_router.patch("/tickets/{ticket_id}/status", response_model=Ticket)
async def update_ticket_status(ticket_id: str, body: StatusUpdate, user: dict = Depends(get_admin_user)):
    status = body.status.upper()
    if status not in TICKET_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid status")
    doc = await db.tickets.find_one_and_update(
        {"id": ticket_id}, {"$set": {"status": status}},
        return_document=ReturnDocument.AFTER, projection={"_id": 0},
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return doc


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)
