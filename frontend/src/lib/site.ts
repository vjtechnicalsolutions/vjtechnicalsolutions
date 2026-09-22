// Shared site data for VJ Technical Solutions — mirrors backend Post model for the news fallback.

export interface SatSystem {
  id: string;
  name: string;
  tag: string;
  orbit: string;
  latencyMs: number;
  down: number; // Mbps typical max
  up: number;
  antenna: string;
  bestFor: string;
  blurb: string;
  image: string;
}

export const SYSTEMS: SatSystem[] = [
  {
    id: "starlink",
    name: "Starlink Maritime",
    tag: "LEO PRIMARY",
    orbit: "LEO · ~550 km",
    latencyMs: 35,
    down: 220,
    up: 25,
    antenna: "Flat High-Performance phased array, dual-dish configs",
    bestFor: "Cargo, OSV & superyachts needing high-throughput primary",
    blurb:
      "High-throughput, low-latency LEO broadband. We install, commission and support single and dual flat-HP arrays with masthead obstruction surveys and bonded failover.",
    image: "https://images.unsplash.com/photo-1756573346001-6c3ab30e837b?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "oneweb",
    name: "Eutelsat OneWeb",
    tag: "LEO ENTERPRISE",
    orbit: "LEO · ~1,200 km",
    latencyMs: 70,
    down: 195,
    up: 32,
    antenna: "Intellian / Kymeta enterprise terminals, dual-LEO ready",
    bestFor: "Fleets needing contracted CIR and enterprise SLAs",
    blurb:
      "Enterprise-grade LEO with committed information rates and strong high-latitude performance. Ideal as a managed primary or as a dual-LEO pair with Starlink.",
    image: "https://images.unsplash.com/photo-1773161960044-4636c76b22fc?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "kvh",
    name: "KVH TracPhone VSAT",
    tag: "GEO VSAT",
    orbit: "GEO · Ku/Ka band",
    latencyMs: 620,
    down: 20,
    up: 3,
    antenna: "TracPhone V7-HTS / V11-IP 60cm–1m stabilised domes",
    bestFor: "Proven metered failover and existing dome fleets",
    blurb:
      "The workhorse GEO layer. We re-role existing TracPhone domes as managed secondary bearers under SD-WAN control instead of ripping out working hardware.",
    image: "https://images.pexels.com/photos/19089153/pexels-photo-19089153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    id: "iridium",
    name: "Iridium Certus 700",
    tag: "L-BAND GLOBAL",
    orbit: "LEO · 66 satellites, pole-to-pole",
    latencyMs: 550,
    down: 0.7,
    up: 0.7,
    antenna: "Cobham Sailor 4300 / Thales MissionLink above-deck units",
    bestFor: "GMDSS safety services and true polar coverage",
    blurb:
      "Truly global L-band safety and operational broadband — the only bearer that works at the poles. Our refit programmes pass radio survey first time, every time.",
    image: "https://images.unsplash.com/photo-1758248421325-6f3a1d92075a?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    id: "fleetbroadband",
    name: "Inmarsat FleetBroadband",
    tag: "L-BAND LEGACY",
    orbit: "GEO · I-4 / I-6 constellation",
    latencyMs: 700,
    down: 0.43,
    up: 0.43,
    antenna: "Sailor 250/500 FleetBroadband terminals",
    bestFor: "Legacy GMDSS compliance and voice continuity",
    blurb:
      "FBB 250/500 remains the compliance backbone on thousands of hulls. We maintain, migrate and consolidate FBB estates as fleets move primary traffic to LEO.",
    image: "https://images.pexels.com/photos/32630439/pexels-photo-32630439.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export interface Plan {
  name: string;
  price: string;
  note: string;
  features: string[];
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: "Coastal Link",
    price: "from $290/mo",
    note: "indicative, per vessel",
    features: ["4G/LTE + near-shore LEO", "Crew Wi-Fi with quotas", "Remote monitoring", "Next-port engineer dispatch"],
  },
  {
    name: "Offshore Pro",
    price: "from $990/mo",
    note: "indicative, per vessel",
    features: ["Starlink Maritime primary", "FBB / Certus failover", "Bonded SD-WAN router", "24/7 NOC watchkeeping"],
    highlight: true,
  },
  {
    name: "Global Hybrid",
    price: "from $2,400/mo",
    note: "indicative, per vessel",
    features: ["Dual-LEO (Starlink + OneWeb)", "KVH VSAT tertiary", "Committed information rate", "Quarterly link audits"],
  },
  {
    name: "Polar Certus",
    price: "on application",
    note: "survey-priced",
    features: ["Iridium Certus 700 primary", "GMDSS console integration", "High-latitude routing", "Survey documentation pack"],
  },
];

export interface Region {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  leoLatency: string;
  geoLatency: string;
  note: string;
}

export const REGIONS: Region[] = [
  {
    id: "natlantic",
    name: "North Atlantic",
    primary: "Starlink Maritime / OneWeb",
    secondary: "KVH Ku-band VSAT",
    leoLatency: "35–60 ms",
    geoLatency: "600–700 ms",
    note: "Dense LEO shell coverage; winter storm obstructions handled by dual-dish layouts.",
  },
  {
    id: "med",
    name: "Mediterranean & Suez",
    primary: "Starlink Maritime",
    secondary: "FleetBroadband 500",
    leoLatency: "30–50 ms",
    geoLatency: "620 ms",
    note: "Port-dense routing; LTE aggregation adds a cheap third bearer within 20 nm of shore.",
  },
  {
    id: "pacific",
    name: "Pacific Crossing",
    primary: "OneWeb Enterprise",
    secondary: "Iridium Certus 700",
    leoLatency: "60–90 ms",
    geoLatency: "650 ms",
    note: "Long ocean legs favour OneWeb CIR contracts; Certus covers mid-ocean gaps.",
  },
  {
    id: "indian",
    name: "Indian Ocean",
    primary: "Starlink Maritime",
    secondary: "KVH Ku-band VSAT",
    leoLatency: "40–70 ms",
    geoLatency: "600 ms",
    note: "Monsoon-season link budgets validated on 30+ vessels across the Arabian Sea.",
  },
  {
    id: "arctic",
    name: "Arctic & Polar",
    primary: "Iridium Certus 700",
    secondary: "OneWeb (high-latitude shells)",
    leoLatency: "550 ms (L-band)",
    geoLatency: "no GEO coverage",
    note: "Above ~75°N GEO VSAT drops below horizon — Certus becomes the primary bearer.",
  },
];

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  image: string | null;
  read_minutes: number;
  created_at: string;
}

// Static fallback so /news renders fully even when the backend is unreachable (static preview CDN).
export const FALLBACK_POSTS: Post[] = [
  {
    id: "f1",
    slug: "starlink-maritime-firmware-2026",
    title: "Starlink Maritime Firmware Wave: What Vessel Operators Must Change",
    excerpt:
      "The latest Starlink Maritime firmware roll-out changes obstructed-view handling and priority data queues. Here is the field checklist we run before and after every upgrade.",
    body: "Starlink's latest maritime firmware wave adjusts how flat high-performance terminals handle partial obstructions and priority queueing.\n\nBefore upgrading we recommend a full config backup, a masthead obstruction survey, and a scheduled changeover window at anchor or in port.\n\nAfter the upgrade, validate failover to your secondary bearer and re-run speed tests on both bonded paths.",
    category: "Fleet Alert",
    image: "https://images.unsplash.com/photo-1756573346001-6c3ab30e837b?crop=entropy&cs=srgb&fm=jpg&q=85",
    read_minutes: 5,
    created_at: "2026-06-24T09:00:00Z",
  },
  {
    id: "f2",
    slug: "hybrid-leo-vsat-failover-design",
    title: "Designing Zero-Dropout Failover: Bonding LEO with Legacy VSAT",
    excerpt:
      "A single bearer is a single point of failure. How we bond Starlink or OneWeb with Ku/Ka VSAT and Iridium Certus so crews never notice a handoff.",
    body: "Modern vessels carry two to four bearers: LEO, GEO VSAT and L-band safety services.\n\nUsing SD-WAN bonding at the router level, traffic flows across the lowest-latency path while session persistence keeps VoIP and ECDIS updates alive during handoffs.\n\nReference topology: dual routers, per-bearer health probes, and automatic QoS re-marking on degradation.",
    category: "Engineering",
    image: "https://images.pexels.com/photos/32630439/pexels-photo-32630439.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    read_minutes: 7,
    created_at: "2026-06-10T09:00:00Z",
  },
  {
    id: "f3",
    slug: "iridium-certus-gmdss-refit",
    title: "Iridium Certus 700 & GMDSS: Lessons from a 12-Vessel Refit Programme",
    excerpt:
      "Twelve offshore support vessels, one winter, zero missed survey windows. Field notes on Certus 700 installs, antenna placement, and GMDSS compliance.",
    body: "Certus 700 gives offshore fleets a genuine broadband fallback with truly global coverage, including polar regions.\n\nKey lessons: keep the above-deck unit clear of radar sweep arcs, run dual shielded cable, and document the GMDSS console integration for surveyors.\n\nEvery vessel passed radio survey on first inspection.",
    category: "Case Study",
    image: "https://images.pexels.com/photos/36511255/pexels-photo-36511255.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    read_minutes: 6,
    created_at: "2026-05-28T09:00:00Z",
  },
  {
    id: "f4",
    slug: "oneweb-enterprise-maritime",
    title: "OneWeb Enterprise at Sea: Where It Beats Starlink Maritime",
    excerpt:
      "OneWeb's enterprise-grade SLAs and high-latitude performance make it the right primary bearer for specific routes. Our honest comparison from live installs.",
    body: "OneWeb is not a Starlink clone. Its enterprise SLA structure, committed information rates and high-latitude performance suit tankers and Arctic itineraries.\n\nWhere Starlink wins on price and raw throughput, OneWeb wins on contract guarantees.\n\nMany of our clients run both, bonded.",
    category: "Analysis",
    image: "https://images.unsplash.com/photo-1773161960044-4636c76b22fc?crop=entropy&cs=srgb&fm=jpg&q=85",
    read_minutes: 6,
    created_at: "2026-05-12T09:00:00Z",
  },
  {
    id: "f5",
    slug: "ai-cctv-maritime-security",
    title: "Eyes at Sea: How AI-Powered CCTV Transforms Maritime Security",
    excerpt:
      "Vessels span hundreds of meters with stretched crews. AI-assisted CCTV with onboard analytics now watches blind spots, mooring lines and engine spaces around the clock.",
    body: "Modern marine CCTV is no longer a recorder in the corner — it is an operational sensor network.\n\nWe design IP camera systems with marinised housings, onboard NVR storage, and analytics for man-overboard zones, unauthorised access and tow-line monitoring.\n\nFootage is synced to shore over the bonded link when bandwidth allows, giving fleet managers live situational awareness.",
    category: "Security",
    image: "https://images.unsplash.com/photo-1589935447067-5531094415d1?crop=entropy&cs=srgb&fm=jpg&q=85",
    read_minutes: 6,
    created_at: "2026-04-30T09:00:00Z",
  },
  {
    id: "f6",
    slug: "kvh-tracphone-to-leo-migration",
    title: "Migrating from KVH TracPhone to LEO Without Losing Your VSAT Investment",
    excerpt:
      "You do not have to rip out the dome. How we re-role KVH VSAT as a managed secondary bearer while LEO carries primary traffic.",
    body: "KVH VSAT contracts often run for years. Ripping out working hardware wastes money and removes a proven failover path.\n\nOur migration pattern: install the LEO terminal as primary, reconfigure the TracPhone as a metered secondary, and let the SD-WAN router steer traffic by cost and latency.\n\nTypical result: 10x throughput with zero increase in airtime spend.",
    category: "Migration",
    image: "https://images.pexels.com/photos/19089153/pexels-photo-19089153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    read_minutes: 5,
    created_at: "2026-04-15T09:00:00Z",
  },
];

export const SYSTEM_OPTIONS = [
  "Starlink Maritime",
  "Eutelsat OneWeb",
  "KVH / VSAT",
  "Iridium Certus",
  "FleetBroadband",
  "Vessel IT / Networking",
  "CCTV / Security",
  "Firewall / Cybersecurity",
  "Other",
];
