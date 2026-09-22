"""Emergent-managed Resend email — owner notifications for new enquiries/tickets.
Server-side templates only (G4); every send passes the structural gate (G2/G3)."""

import ipaddress
import logging
import os
import re
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env")

logger = logging.getLogger(__name__)

# Emergent managed email proxy. CONSTANT by design — never read from env.
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "")  # this app's OWN brand (G1)
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_NOTIFY_EMAIL = os.environ.get("OWNER_NOTIFY_EMAIL", "")
APP_URL = os.environ.get("APP_URL", "")

# ---------- Guardrail gate (G2/G3 structural checks; call on EVERY send) ----------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


# ---------- Send ----------
async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


async def notify_owner(subject: str, html: str) -> None:
    """Fire-and-forget wrapper: alert failures never break the API request."""
    if not (EMAIL_KEY and EMAIL_FROM_NAME and OWNER_NOTIFY_EMAIL):
        logger.warning("email not configured; skipping owner notification")
        return
    try:
        email_id = await send_email(to=OWNER_NOTIFY_EMAIL, subject=subject, html=html)
        logger.info("owner notification sent: %s (%s)", subject, email_id)
    except Exception as exc:
        logger.error("owner notification failed: %s", exc)


# ---------- Server-side templates ----------
def _rows(fields: list[tuple[str, str]]) -> str:
    return "".join(
        f'<tr><td style="padding:7px 12px;color:#61758b;font-size:13px;white-space:nowrap">{escape(k)}</td>'
        f'<td style="padding:7px 12px;font-size:13px;color:#102d52"><strong>{escape(v or "—")}</strong></td></tr>'
        for k, v in fields
    )


def _shell(title: str, rows_html: str, note: str) -> str:
    admin_link = (
        f'<p style="margin-top:20px"><a href="{APP_URL}/admin" '
        f'style="background:#0876d1;color:#ffffff;padding:10px 18px;border-radius:8px;'
        f'text-decoration:none;font-size:13px;font-weight:bold">Open Operations Board</a></p>'
        if APP_URL.startswith("https://")
        else ""
    )
    return (
        f'<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif">'
        f'<h2 style="margin:0 0 4px;color:#071c38;font-size:18px">{escape(title)}</h2>'
        f'<p style="margin:0 0 16px;color:#61758b;font-size:12px">{escape(EMAIL_FROM_NAME)} — website notification</p>'
        f'<table role="presentation" style="border:1px solid #dce6ef;border-radius:8px">{rows_html}</table>'
        f'<p style="margin-top:16px;color:#334e68;font-size:13px">{escape(note)}</p>'
        f"{admin_link}"
        f'<p style="font-size:12px;color:#8aa0b8;margin-top:24px">Sent by {escape(EMAIL_FROM_NAME)}. '
        f"We never ask for passwords or card details by email.</p></td></tr></table>"
    )


def enquiry_email_html(fields: list[tuple[str, str]]) -> str:
    return _shell("New service request received", _rows(fields),
                  "Review this enquiry on the operations board and respond within 4 business hours.")


def ticket_email_html(fields: list[tuple[str, str]]) -> str:
    return _shell("New support ticket dispatched", _rows(fields),
                  "A new ticket is live on the operations board. P1/P2 tickets need immediate attention.")
