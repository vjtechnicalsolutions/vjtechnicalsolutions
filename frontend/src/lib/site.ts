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
    image: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/2ebbdca0f4f8c55408950a224dde6545d09b40bf06b8f4dee9330d79f0af1c47.jpeg",
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

export interface Industry {
  name: string;
  blurb: string;
  image: string;
}

export const INDUSTRIES: Industry[] = [
  {
    name: "Commercial Shipping",
    blurb: "Container, bulk and tanker fleets on LEO + VSAT hybrid networks",
    image: "https://images.pexels.com/photos/12530465/pexels-photo-12530465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Yachting",
    blurb: "Superyacht-grade bandwidth, crew Wi-Fi and guest experience systems",
    image: "https://images.unsplash.com/photo-1598737285721-29346a5c9278?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    name: "Cruise & Ferries",
    blurb: "High-density passenger connectivity and operational data links",
    image: "https://images.unsplash.com/photo-1614095557130-2f4a9e1da57d?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    name: "Fishing Fleets",
    blurb: "Ruggedised links and catch reporting for deep-sea fleets",
    image: "https://images.pexels.com/photos/27041514/pexels-photo-27041514.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Offshore & Energy",
    blurb: "Rigs, OSVs and wind farms with Certus polar-safe failover",
    image: "https://images.unsplash.com/photo-1690508313456-bf8c851e8319?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    name: "Naval & Patrol",
    blurb: "Secure, resilient comms for patrol and government vessels",
    image: "https://images.unsplash.com/photo-1771331515085-e3eaa2f8b64d?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    name: "Remote Sites",
    blurb: "Rapid-deploy connectivity for remote industrial locations",
    image: "https://images.pexels.com/photos/35486164/pexels-photo-35486164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    name: "Enterprise & Onshore",
    blurb: "Office, warehouse and CCTV networks run by the same NOC",
    image: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/5bb2478d8c0c871e8492ca13e9a35928557f8274e3b3d87eddcf35a4c78ff531.jpeg",
  },
];

export const STATS = { vessels: "350+", ports: "40+", systems: "5", watch: "24/7" };

export interface Product {
  name: string;
  tagline: string;
  bullets: string[];
  path: string;
}

export interface SolutionCategory {
  id: string;
  label: string;
  tagline: string;
  products: Product[];
}

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    id: "connectivity",
    label: "Connectivity",
    tagline: "Multi-orbit SATCOM across LEO, GEO and hybrid architectures",
    products: [
      { name: "Starlink Maritime", tagline: "High-throughput LEO internet with sub-50 ms latency.", bullets: ["Up to 220 Mbps download at sea", "Flat HP marine-rated hardware", "Dual-dish obstruction-proof configs"], path: "/solutions/starlink" },
      { name: "Eutelsat OneWeb", tagline: "Enterprise LEO with strong polar and northern route coverage.", bullets: ["Committed information rates", "Enterprise SLAs", "Failover-ready hybrid architecture"], path: "/solutions/oneweb" },
      { name: "Iridium Certus", tagline: "True global fallback via Iridium's L-band network.", bullets: ["Coverage including the poles", "Mission-critical fallback link", "Voice and data on one platform"], path: "/solutions/iridium" },
      { name: "VSAT (Ku / Ka) — KVH", tagline: "Proven GEO backbone for ocean-scale, predictable bandwidth.", bullets: ["Wide-area ocean coverage", "Stable backbone for routine data", "Cost-effective metered plans"], path: "/solutions/kvh" },
      { name: "FleetBroadband", tagline: "Inmarsat FBB for voice, data and safety on all vessel sizes.", bullets: ["Class 250 and 500 terminals", "Simultaneous voice and data", "GMDSS-compliant safety channel"], path: "/solutions/fleetbroadband" },
      { name: "LTE / 4G Hybrid", tagline: "Automatic port-side LTE offload to reduce satellite spend.", bullets: ["SIM-based automatic offload", "Reduces VSAT consumption near shore", "Integrated via SD-WAN routing"], path: "/quote" },
    ],
  },
  {
    id: "it",
    label: "IT & Cybersecurity",
    tagline: "Managed IT, endpoint security and SD-WAN fleet network management",
    products: [
      { name: "Vessel IT & Networking", tagline: "Complete onboard LAN/WAN built and supported by one team.", bullets: ["MikroTik routing and switching", "Servers, computers and Wi-Fi", "Documentation and handover"], path: "/quote" },
      { name: "Firewall & Cybersecurity", tagline: "Segmented, survey-ready networks aligned to IACS E26/E27.", bullets: ["Managed WAN-edge firewall", "OT / business / crew VLANs", "Audit evidence pack included"], path: "/quote" },
      { name: "SD-WAN Fleet Management", tagline: "Bonded multi-bearer routing with central NOC visibility.", bullets: ["Sub-300 ms failover", "Per-bearer health probes", "Cost and latency steering"], path: "/quote" },
    ],
  },
  {
    id: "crew",
    label: "Crew Engagement",
    tagline: "Connectivity, wellbeing and communication solutions for seafarers",
    products: [
      { name: "Crew Wi-Fi & Quotas", tagline: "Fair, managed internet access that protects operations.", bullets: ["Captive portal vouchers", "Per-crew bandwidth quotas", "Usage reporting to shore"], path: "/quote" },
      { name: "VoIP & DID Calling", tagline: "Direct numbers for crew and officers reachable from shore.", bullets: ["VoIP over satellite", "Individual DID per officer", "QoS-managed call quality"], path: "/quote" },
    ],
  },
  {
    id: "ot",
    label: "Operational Technologies",
    tagline: "Surveillance, safety and commissioning systems for daily operations",
    products: [
      { name: "Marine CCTV & Security", tagline: "AI-ready IP surveillance with shore-side viewing.", bullets: ["Marinised camera housings", "Onboard NVR storage", "Low-bandwidth remote viewing"], path: "/quote" },
      { name: "Installation & Repair", tagline: "Our core field work — attendance, install and fault restoration.", bullets: ["Port attendance at 40+ ports", "Underway fault diagnosis", "Flyaway kit deployment"], path: "/quote" },
      { name: "GMDSS & Commissioning", tagline: "Survey-ready safety comms and system handover.", bullets: ["Radio survey documentation", "Commissioning and sea trials", "Certified test reports"], path: "/quote" },
    ],
  },
];

export const VJ_IMAGES = {
  hero: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/3f5a94e1d05f73c0e2622ab20bb6ad6e5d3dcb5f149bff206bffaf8ede53c3ab.jpeg",
  flatpanel: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/046b69d91f66c6777aa6ab4a5db103cb2a07d9dfcdca0baa71d7b894ca9e0896.jpeg",
  engineer: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/baf71f709dcfde7210581b0548d8477c02c2b7cf8d21e6b47cf2194dce050651.jpeg",
  starlinkMounted: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/2ebbdca0f4f8c55408950a224dde6545d09b40bf06b8f4dee9330d79f0af1c47.jpeg",
  cctvVessel: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/6d2e43237302b6737cb7fed62d0fcb0682c633cd022c9753a75f2daa5cfce278.jpeg",
  mikrotik: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/3f7f6d8e04edc3d9093c882182a057435cd8aa85c2446ef9ed1b362f968c7f91.jpeg",
  cisco: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/5bb2478d8c0c871e8492ca13e9a35928557f8274e3b3d87eddcf35a4c78ff531.jpeg",
};

export interface SolutionDetail {
  eyebrow: string;
  intro: string;
  features: string[];
  benefits: string[];
  useCases: { title: string; text: string }[];
  cta: string;
}

export const SOLUTION_DETAILS: Record<string, SolutionDetail> = {
  starlink: {
    eyebrow: "STARLINK FOR BUSINESS",
    intro:
      "Starlink Maritime is a high-performance satellite internet solution for vessels that need real broadband at sea. It delivers fast, low-latency connectivity across the globe — seamless operations, remote communication and real-time data exchange for commercial fleets, offshore industries and high-demand maritime applications.",
    features: [
      "Download speeds up to 220+ Mbps",
      "Latency under 99 ms for real-time use",
      "Global coverage, including international waters",
      "Scalable for business-critical operations",
      "Centralised remote management portal",
    ],
    benefits: [
      "Improves crew welfare with fast personal connectivity",
      "Real-time monitoring and operational diagnostics",
      "Uninterrupted communication for operations at sea",
      "Supports cloud applications and remote collaboration",
    ],
    useCases: [
      { title: "Commercial Shipping", text: "Reliable communication and navigation support on the busiest trade routes." },
      { title: "Research Vessels", text: "Real-time sensor data exchange and remote monitoring on long expeditions." },
      { title: "Offshore Energy", text: "High-speed internet for rigs, platforms and wind-farm support vessels." },
      { title: "Enterprise & Remote Sites", text: "Cloud applications and remote IT management beyond terrestrial networks." },
    ],
    cta: "Enhance connectivity with Starlink — talk to us about your fleet.",
  },
  oneweb: {
    eyebrow: "ONEWEB ENTERPRISE",
    intro:
      "Eutelsat OneWeb delivers low-latency, high-speed broadband through a Low Earth Orbit constellation, giving vessels seamless global coverage — including polar regions — with enterprise-grade service levels and committed information rates.",
    features: [
      "Low-latency broadband powered by LEO satellites",
      "High-speed connectivity optimised for maritime use",
      "Global coverage including remote and polar regions",
      "Secure and scalable network infrastructure",
      "Reliable performance in challenging weather",
    ],
    benefits: [
      "Real-time data transfer for fleet management",
      "High-speed internet for crew communication and welfare",
      "Supports cloud-based applications and remote work",
      "Encrypted network protects sensitive maritime data",
    ],
    useCases: [
      { title: "Merchant Fleets", text: "Continuous, SLA-backed communication across global shipping lanes." },
      { title: "Offshore & Energy", text: "Low-latency links for remote drilling and monitoring systems." },
      { title: "Yachting & Leisure", text: "Premium shore-like internet for owners, guests and charter operations." },
      { title: "Enterprise", text: "Secure, scalable connectivity for distributed remote operations." },
    ],
    cta: "Upgrade your fleet with OneWeb's cutting-edge LEO connectivity.",
  },
  kvh: {
    eyebrow: "KVH VSAT (KU / KA)",
    intro:
      "KVH TracPhone VSAT is the proven GEO workhorse of the maritime world. We install, maintain and re-role TracPhone domes as managed secondary bearers — protecting your existing hardware investment while LEO carries primary traffic.",
    features: [
      "Proven Ku/Ka-band HTS performance",
      "Global mini-VSAT network coverage",
      "Gyro-stabilised dome antennas, 60 cm–1 m",
      "Metered airtime options for cost control",
      "Ideal managed failover under SD-WAN control",
    ],
    benefits: [
      "Protects your existing VSAT hardware investment",
      "Predictable, metered airtime costs",
      "Survey-friendly legacy compliance record",
      "Smooth migration path toward LEO primary",
    ],
    useCases: [
      { title: "Existing Dome Fleets", text: "Re-role working TracPhone systems instead of ripping them out." },
      { title: "Tankers & Bulk Carriers", text: "Dependable secondary bearer on long ocean legs." },
      { title: "Backup Bearer", text: "Metered failover that only bills when it carries traffic." },
      { title: "Coastal Fleets", text: "Cost-efficient coverage for regional trading patterns." },
    ],
    cta: "Keep your VSAT investment working — bonded with modern LEO.",
  },
  iridium: {
    eyebrow: "IRIDIUM CERTUS",
    intro:
      "Iridium Certus is the only truly global satellite network — pole to pole, in any weather. Certus 700 delivers genuine L-band broadband and GMDSS safety services where GEO VSAT simply cannot reach.",
    features: [
      "Truly global, pole-to-pole LEO coverage",
      "Weatherproof L-band reliability",
      "GMDSS safety services integration",
      "Compact above-deck units, quick installs",
      "Certus 700 broadband up to 704 kbps",
    ],
    benefits: [
      "Safety compliance assured for radio survey",
      "Works where GEO drops below the horizon",
      "Low power draw and rugged hardware",
      "Crew calling and messaging anywhere on Earth",
    ],
    useCases: [
      { title: "Polar & High-Latitude", text: "The only bearer that works above ~75° where GEO fails." },
      { title: "Fishing Fleets", text: "Weatherproof safety and catch reporting in harsh seas." },
      { title: "Emergency & Safety", text: "GMDSS distress, safety and voice continuity services." },
      { title: "Offshore Support", text: "Reliable fallback for OSVs operating far from shore." },
    ],
    cta: "Guarantee coverage everywhere your vessel trades — including the poles.",
  },
  fleetbroadband: {
    eyebrow: "INMARSAT FLEETBROADBAND",
    intro:
      "FleetBroadband 250/500 remains the compliance backbone on thousands of hulls. We maintain, migrate and consolidate FBB estates — keeping voice and safety services alive while fleets move primary traffic to LEO.",
    features: [
      "FBB 250/500 terminals, global I-4/I-6 coverage",
      "Simultaneous voice and data",
      "Legacy GMDSS compliance support",
      "Low-cost, widely available hardware",
      "Simple integration with modern routers",
    ],
    benefits: [
      "Keeps legacy compliance intact during migration",
      "Voice continuity for bridge and crew",
      "Inexpensive always-on backup channel",
      "Decades of field knowledge on every model",
    ],
    useCases: [
      { title: "Legacy Compliance", text: "Maintain GMDSS obligations while modernising primary links." },
      { title: "Backup Bearer", text: "Always-on tertiary path behind LEO and VSAT." },
      { title: "Small Vessels", text: "Affordable entry-level global voice and data." },
      { title: "Coastal Fishing", text: "Simple, dependable comms for regional fleets." },
    ],
    cta: "Modernise without losing your compliance backbone.",
  },
};

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
