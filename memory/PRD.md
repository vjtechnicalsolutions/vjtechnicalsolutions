# PRD — VJ Technical Solutions Website

## Original problem statement
"Hi i am the net work engineer i ma working on vessel comunncation like starlink oneweb kvh fleet beaded curts and fbb o i nned crate website i have alrady demo one need you help to blid one" — later: add Emergent managed Google sign-in; match colors of the existing VJ Technical Solutions demo site (light, navy #071c38, blue #0876d1); add category-correct maritime pictures (Starlink → Starlink dish, CCTV → CCTV, etc.); example reference: stationsatcom.com.

## User personas
- Fleet owner / vessel captain requesting service, quotes or attendance
- Crew member / chief engineer raising support tickets (P1–P4)
- VJ operations staff (admin) viewing enquiries & tickets via Google sign-in

## Core requirements (static)
- Company/services marketing site: Home, Services, Coverage & Plans, About, Intelligence (news), Support, Quote/attendance form
- Working enquiry + support ticket forms persisted to MongoDB
- Admin board protected by Emergent-managed Google OAuth
- VJ branding: light theme, navy/blue, their 3 local maritime images + category-correct stock imagery
- Award-level motion: lenis smooth scroll, masked hero reveal, marquee, scroll reveals

## Architecture
- FastAPI + MongoDB (motor) backend: /api/enquiries, /api/tickets, /api/posts, /api/auth/session|me|logout (Emergent Google OAuth), admin GETs gated by session + optional ADMIN_EMAILS allowlist (backend/.env)
- React 19 + Vite + TS frontend: pages under src/pages, components under src/components, site data in src/lib/site.ts, auth context in src/lib/auth.tsx
- Seed: backend/seed.py (6 intelligence posts, idempotent by slug)
- Auth testing: /app/auth_testing.md

## Implemented
- 2026-09-22: Full site build — light VJ theme, kinetic hero (masked line reveal, parallax, live telemetry card), editorial marquee, 5-system services matrix with per-category images, capabilities grid with category images (incl. Marine CCTV), coverage simulator + plan tiers, engineering manifesto, news feed (DB + static fallback), support tickets with priority SLAs, enquiry/quote form, admin operations board with Google sign-in (Emergent managed), lenis smooth scroll, data-testids throughout.
- 2026-09-22: Official VJ logo integrated (header + footer white badge) + VJ wave favicons; admin locked to info.vjtechnicalsolutions@gmail.com via ADMIN_EMAILS; email alerts to owner Gmail via Emergent-managed Resend (backend/lib/emailer.py, guardrail-gated, fire-and-forget); Resolve/Reopen status actions on admin board (PATCH /api/enquiries|tickets/:id/status); Careers and FAQ pages added; copy refocused on vessel attendance & repair (hero, capabilities order).
- 2026-09-22: Plans section removed from Coverage. All contact email switched to info.vjtechnicalsolutions@gmail.com. Fake "Starlink dome" assets replaced with hardware-correct photos; AI-generated branded imagery (hero dusk vessel, flat panel, engineer, Starlink-mounted-on-vessel, vessel CCTV, MikroTik RB5009, Cisco switch) in VJ_IMAGES. Stationsatcom-style build: Solutions mega-menu in header (Connectivity / IT & Cybersecurity / Operational Technologies / Crew Engagement / All Solutions), /solutions/:systemId detail pages for all 5 systems (features, benefits, specs, use cases), /services rebuilt as categorized solutions catalog with filter tabs + stats, homepage gains PillarsStrip ("One Partner — Total Solution") and SolutionsGrid (8 industries with distinct photos). NOC Admin Portal links removed from public UI (route /admin still live, direct URL only).

## Backlog / next
- P0: Restrict admin via ADMIN_EMAILS once owner shares their Gmail
- P1: Status management on admin board (mark enquiry/ticket resolved)
- P1: Email notification to info@vjtechnicalsolutions.com on new enquiry/ticket (Resend)
- P2: Careers & FAQ pages from the original demo
- P2: Per-article news pages, case studies section
- P2: WhatsApp contact number once provided
