"""Update news post images to the matching on-vessel hardware photos, then seed any missing posts.
Run: cd /app/backend && python seed.py"""
import asyncio
from datetime import datetime, timezone

from lib.db import db, ensure_indexes

IMG = "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images"
STARLINK_IMG = f"{IMG}/2ebbdca0f4f8c55408950a224dde6545d09b40bf06b8f4dee9330d79f0af1c47.jpeg"
FLATPANEL_IMG = f"{IMG}/046b69d91f66c6777aa6ab4a5db103cb2a07d9dfcdca0baa71d7b894ca9e0896.jpeg"
IRIDIUM_IMG = f"{IMG}/ca1f60fc0195c20370549f5bda71d5ed16b9d3131ab533e10769fe091bf885cd.jpeg"
ONEWEB_IMG = f"{IMG}/dc6d0b9ee25edc64c52dcc8d14bbf16b0483b37721787497450bda6ebe653eda.jpeg"
KVH_IMG = f"{IMG}/e6c88ebb6cd6b75c0b87fa1c14e2f891770879995c3ea786f1deb1c0f2175c07.jpeg"
MIKROTIK_IMG = f"{IMG}/3f7f6d8e04edc3d9093c882182a057435cd8aa85c2446ef9ed1b362f968c7f91.jpeg"

POSTS = [
    {
        "slug": "starlink-maritime-firmware-2026",
        "title": "Starlink Maritime Firmware Wave: What Vessel Operators Must Change",
        "excerpt": "The latest Starlink Maritime firmware roll-out changes obstructed-view handling and priority data queues. Here is the field checklist we run before and after every upgrade.",
        "body": "Starlink's latest maritime firmware wave adjusts how flat high-performance terminals handle partial obstructions and priority queueing.\n\nBefore upgrading we recommend: a full config backup, a masthead obstruction survey, and a scheduled 20-minute changeover window at anchor or in port.\n\nAfter the upgrade, validate failover to your secondary bearer (VSAT or Certus) and re-run speed tests on both bonded paths. Our NOC has completed this cycle on 40+ vessels this quarter.",
        "category": "Fleet Alert",
        "image": STARLINK_IMG,
        "read_minutes": 5,
    },
    {
        "slug": "hybrid-leo-vsat-failover-design",
        "title": "Designing Zero-Dropout Failover: Bonding LEO with Legacy VSAT",
        "excerpt": "A single bearer is a single point of failure. How we bond Starlink or OneWeb with Ku/Ka VSAT and Iridium Certus so crews never notice a handoff.",
        "body": "Modern vessels carry two to four bearers: LEO (Starlink / OneWeb), GEO VSAT (KVH Ku/Ka), and L-band safety (Iridium Certus, FleetBroadband).\n\nUsing SD-WAN bonding at the router level, traffic flows across the lowest-latency path while session persistence keeps VoIP and ECDIS updates alive during handoffs.\n\nWe document a full reference topology: dual MikroTik routers, per-bearer health probes, and automatic QoS re-marking when the link degrades below threshold.",
        "category": "Engineering",
        "image": FLATPANEL_IMG,
        "read_minutes": 7,
    },
    {
        "slug": "iridium-certus-gmdss-refit",
        "title": "Iridium Certus 700 & GMDSS: Lessons from a 12-Vessel Refit Programme",
        "excerpt": "Twelve offshore support vessels, one winter, zero missed survey windows. Field notes on Certus 700 installs, antenna placement, and GMDSS compliance.",
        "body": "Certus 700 gives offshore fleets a genuine broadband fallback with truly global coverage, including polar regions where GEO VSAT drops out.\n\nKey lessons from our 12-vessel refit: keep the above-deck unit clear of radar sweep arcs, run dual shielded cable for redundancy, and document the GMDSS console integration for surveyors.\n\nEvery vessel passed radio survey on first inspection.",
        "category": "Case Study",
        "image": IRIDIUM_IMG,
        "read_minutes": 6,
    },
    {
        "slug": "oneweb-enterprise-maritime",
        "title": "OneWeb Enterprise at Sea: Where It Beats Starlink Maritime",
        "excerpt": "OneWeb's enterprise-grade SLAs and high-latitude performance make it the right primary bearer for specific routes. Our honest comparison from live installs.",
        "body": "OneWeb is not a Starlink clone. Its enterprise SLA structure, committed information rates, and strong high-latitude performance suit tankers and Arctic itineraries.\n\nWhere Starlink wins on price and raw throughput, OneWeb wins on contract guarantees and support tiers. Many of our clients run both, bonded.\n\nWe break down real throughput logs from three vessels running dual-LEO configurations across the North Atlantic.",
        "category": "Analysis",
        "image": ONEWEB_IMG,
        "read_minutes": 6,
    },
    {
        "slug": "vessel-cybersecurity-baseline",
        "title": "The 2026 Vessel Cybersecurity Baseline: Firewalls, VLANs and Crew Wi-Fi",
        "excerpt": "IACS UR E26/E27 enforcement is here. A practical baseline: segmented networks, managed firewalls, and crew Wi-Fi that cannot touch OT systems.",
        "body": "With IACS UR E26/E27 now enforced on new builds and increasingly demanded by charterers, vessel networks need documented segmentation.\n\nOur baseline: a managed firewall at the WAN edge, separate VLANs for OT (ECDIS, engine monitoring), business, and crew Wi-Fi, plus captive-portal bandwidth quotas.\n\nWe include the exact MikroTik configuration templates we deploy, and the audit evidence pack surveyors ask for.",
        "category": "Security",
        "image": MIKROTIK_IMG,
        "read_minutes": 8,
    },
    {
        "slug": "kvh-tracphone-to-leo-migration",
        "title": "Migrating from KVH TracPhone to LEO Without Losing Your VSAT Investment",
        "excerpt": "You do not have to rip out the dome. How we re-role KVH VSAT as a managed secondary bearer while LEO carries primary traffic.",
        "body": "FleetBroadband and KVH VSAT contracts often run for years. Ripping out working hardware wastes money and removes a proven failover path.\n\nOur migration pattern: install the LEO terminal as primary, reconfigure the existing TracPhone as a metered secondary, and let the SD-WAN router steer traffic by cost and latency.\n\nTypical result: 10x throughput on primary traffic with zero increase in total airtime spend.",
        "category": "Migration",
        "image": KVH_IMG,
        "read_minutes": 5,
    },
]


async def main():
    for post in POSTS:
        doc = {"id": post["slug"], **post, "created_at": datetime.now(timezone.utc)}
        res = await db.posts.update_one(
            {"slug": post["slug"]},
            {"$set": doc},
            upsert=True,
        )
        print(f"{post['slug']}: {'inserted' if res.upserted_id else 'updated'}")
    await ensure_indexes()
    print(f"done: {len(POSTS)} posts synced with matching hardware images")


if __name__ == "__main__":
    asyncio.run(main())
