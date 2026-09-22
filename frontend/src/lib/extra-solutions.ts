// Self-contained detail pages for non-satellite solutions (CCTV, crew Wi-Fi, LTE).
import { VJ_IMAGES } from "./site";

export interface ExtraSolution {
  id: string;
  name: string;
  tag: string;
  image: string;
  eyebrow: string;
  intro: string;
  features: string[];
  benefits: string[];
  useCases: { title: string; text: string }[];
  cta: string;
  specs: { label: string; value: string }[];
}

export const EXTRA_SOLUTIONS: Record<string, ExtraSolution> = {
  cctv: {
    id: "cctv",
    name: "Marine CCTV & Security",
    tag: "ONBOARD SURVEILLANCE",
    image: VJ_IMAGES.cctvVessel,
    eyebrow: "MARINE CCTV",
    intro:
      "Eyes at sea, around the clock. We design and install marinised IP camera systems with onboard recording and AI-assisted analytics — so blind spots, mooring lines and engine spaces are watched even when the crew isn't.",
    features: [
      "IP67 marinised cameras, 4–64 channels",
      "Onboard NVR with 30–90 day storage",
      "AI analytics: MOB zones and intrusion alerts",
      "Low-bandwidth remote viewing for shore teams",
      "Night-vision and thermal options",
    ],
    benefits: [
      "Blind-spot coverage across deck and engine spaces",
      "Recorded evidence for incidents and insurance",
      "Shore-side situational awareness for fleet managers",
      "Survey and vetting inspection support",
    ],
    useCases: [
      { title: "Deck & Mooring", text: "Watch lines, winches and tow gear during critical operations." },
      { title: "Engine Room", text: "Thermal and visual monitoring of machinery spaces." },
      { title: "Accommodation Security", text: "Access-zone alerts for stores, cabins and bridge." },
      { title: "Anchor & Tow Watch", text: "Continuous recording during high-risk evolutions." },
    ],
    cta: "Put eyes on every corner of your vessel.",
    specs: [
      { label: "Cameras", value: "IP67 marinised, 4–64 channels" },
      { label: "Storage", value: "Onboard NVR, 30–90 days" },
      { label: "Viewing", value: "Remote over bonded link" },
      { label: "Analytics", value: "AI anomaly & MOB zones" },
    ],
  },
  "crew-wifi": {
    id: "crew-wifi",
    name: "Crew Wi-Fi & Welfare",
    tag: "CREW ENGAGEMENT",
    image: "https://images.pexels.com/photos/3582597/pexels-photo-3582597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    eyebrow: "CREW WELFARE",
    intro:
      "Happy crew, retained crew. Our managed crew Wi-Fi gives every seafarer fair, reliable internet access over whichever bearer is active — with quotas and policies that protect operational traffic automatically.",
    features: [
      "Captive portal with vouchers / PINs",
      "Per-crew bandwidth and time quotas",
      "Fair-use QoS that never touches operations",
      "Works over LEO, VSAT or LTE — automatic",
      "Per-vessel usage reporting to shore",
    ],
    benefits: [
      "Morale and retention measurably improve",
      "Zero admin burden for officers",
      "Operational bandwidth always protected",
      "Clear usage accountability per crew member",
    ],
    useCases: [
      { title: "Cargo Fleets", text: "Fair access for mixed-nationality crews on long legs." },
      { title: "Fishing Crews", text: "Simple voucher system for rotating seasonal crew." },
      { title: "Offshore Rotations", text: "Predictable daily allowances for 28-day rotations." },
      { title: "Passenger Vessels", text: "Separate guest and crew networks on one plant." },
    ],
    cta: "Give your crew shore-grade internet, safely managed.",
    specs: [
      { label: "Portal", value: "Voucher / PIN captive sign-in" },
      { label: "Control", value: "Bandwidth + time quotas" },
      { label: "Reporting", value: "Per-vessel usage to shore" },
      { label: "Bearer", value: "Any — LEO / VSAT / LTE" },
    ],
  },
  lte: {
    id: "lte",
    name: "LTE / 4G Hybrid Offload",
    tag: "NEAR-SHORE BEARER",
    image: "https://images.pexels.com/photos/35486164/pexels-photo-35486164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    eyebrow: "LTE HYBRID",
    intro:
      "Stop burning satellite airtime in port. Our LTE hybrid setups automatically offload traffic to 4G/LTE whenever shore networks are in reach — cutting airtime spend while giving the crew their fastest link of the voyage.",
    features: [
      "Automatic shore-side LTE offload",
      "Multi-carrier roaming SIMs",
      "SD-WAN integrated — no manual switching",
      "Cuts satellite airtime spend in port",
      "Marine LTE router + high-gain antennas",
    ],
    benefits: [
      "Lower monthly airtime bills",
      "Fastest speeds of the voyage, in port",
      "Seamless, session-persistent switching",
      "Simple, rugged hardware",
    ],
    useCases: [
      { title: "Ferries", text: "High-capacity passenger data on coastal schedules." },
      { title: "Coastal Traders", text: "Cheap primary bearer on near-shore routes." },
      { title: "Port Operations", text: "Bulk uploads, updates and remote support in port." },
      { title: "Fishing Fleets", text: "Low-cost comms inside coastal coverage." },
    ],
    cta: "Pay satellite prices only when you're actually at sea.",
    specs: [
      { label: "Range", value: "Up to ~20 nm offshore" },
      { label: "Switching", value: "Automatic via SD-WAN" },
      { label: "SIMs", value: "Multi-carrier roaming" },
      { label: "Hardware", value: "Marine LTE router + antennas" },
    ],
  },
  spares: {
    id: "spares",
    name: "Marine Spare Parts Supply",
    tag: "SPARES & LOGISTICS",
    image: "/assets/maritime-service-scene.png",
    eyebrow: "SPARE PARTS",
    intro:
      "Downtime is the expensive part — not the component. We source and ship genuine spares for VSAT and LEO terminals, network gear and RF hardware, delivered to your vessel's next port before she berths.",
    features: [
      "Antennas — VSAT domes, flat panels, L-band terminals",
      "RF cables, connectors, glands & antenna mounts",
      "Routers & switches — MikroTik RB5009, Cisco Catalyst",
      "Wi-Fi access points, SFP modules & network accessories",
      "Dispatch to 40+ ports within 24–72 hours",
    ],
    benefits: [
      "Less downtime — the part is waiting at the next port",
      "Right part first time, matched to your serials",
      "We handle logistics, customs paperwork included",
      "Repair-not-replace saves real money",
    ],
    useCases: [
      { title: "Antennas & RF", text: "Domes, flat panels, BUCs, LNBs, pedestals and bearings." },
      { title: "Cables & Connectors", text: "RF coax, Ethernet, glands, patch cords and terminations." },
      { title: "Routers & Switches", text: "MikroTik RB5009, Cisco switches, access points, power supplies." },
      { title: "Emergency Flyaway Kit", text: "Pre-configured spare terminal flown to the next port." },
    ],
    cta: "Get the right spare to your next port — fast.",
    specs: [
      { label: "Sourcing", value: "OEM & certified aftermarket" },
      { label: "Dispatch", value: "24–72 h to major ports" },
      { label: "Coverage", value: "40+ ports, global courier" },
      { label: "Stock", value: "Critical spares held ready" },
    ],
  },
};
