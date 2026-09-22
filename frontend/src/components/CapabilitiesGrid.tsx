import { Wrench, Headset, Satellite, Network, Video, ShieldCheck, Radio, BadgeCheck, Star } from "lucide-react";
import { FadeUp, SectionHeading } from "./Reveal";
import { VJ_IMAGES } from "@/lib/site";

const CAPABILITIES = [
  {
    icon: Wrench,
    title: "Installation & Repair",
    text: "Onboard installation, replacement, commissioning, maintenance and fault restoration — our core field work.",
    rating: "5.0",
    image: "https://images.pexels.com/photos/19089153/pexels-photo-19089153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    icon: Headset,
    title: "Pre-Attendance Diagnosis",
    text: "Remote log checks and diagnostics so the right engineer, parts and kit arrive on board first time.",
    rating: "4.9",
    image: "https://images.pexels.com/photos/3582597/pexels-photo-3582597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    icon: Satellite,
    title: "Satellite Connectivity",
    text: "Starlink Maritime, VSAT/KVH, OneWeb, Iridium Certus and hybrid connectivity installations.",
    rating: "4.9",
    image: VJ_IMAGES.flatpanel,
  },
  {
    icon: Network,
    title: "Vessel IT & Networking",
    text: "LAN/WAN, Wi-Fi, MikroTik, routers, switches, computers and servers installed onboard.",
    rating: "4.8",
    image: VJ_IMAGES.mikrotik,
  },
  {
    icon: Video,
    title: "Marine CCTV & Security",
    text: "IP camera systems, marinised housings, onboard NVR and remote viewing over the bonded link.",
    rating: "4.9",
    image: VJ_IMAGES.cctvVessel,
  },
  {
    icon: ShieldCheck,
    title: "Firewall & Cybersecurity",
    text: "Firewall configuration, routing, migrations, access control and network segmentation.",
    rating: "4.8",
    image: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/810357e0a35111bd05d8ecf2236a5fb950404afd799539e0d5f744a61f976c4a.jpeg",
  },
  {
    icon: Radio,
    title: "Marine Equipment & Spares",
    text: "Marine IT, networking and connectivity equipment — plus genuine spare parts delivered to your next port.",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1770471656503-cc6bb924a459?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    icon: BadgeCheck,
    title: "Commissioning & Testing",
    text: "System commissioning, configuration, testing and technical handover with certified reports.",
    rating: "4.9",
    image: "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/fd957a89ac2ca7ae6acde0ccb8f6307ef839a4db6bcd3ee8f7ce54ee9740900e.jpeg",
  },
];

export default function CapabilitiesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <SectionHeading
        eyebrow="Our Capabilities"
        title="Installation, spares & field work — done on board"
        copy="Our core work is hands-on: attending vessels, installing and repairing systems, and arranging genuine spares. Everything is delivered by our own field engineers."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((c, i) => (
          <FadeUp key={c.title} delay={i * 0.05}>
            <div className="group h-full overflow-hidden rounded-xl border border-[#dce6ef] bg-white shadow-[0_8px_28px_rgba(7,31,55,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0876d1]/50 hover:shadow-[0_16px_48px_rgba(8,118,209,0.16)]">
              <div className="relative overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 shadow-md">
                  <c.icon className="h-5 w-5 text-[#0876d1]" />
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading text-base font-bold text-[#071c38]">{c.title}</h3>
                </div>
                <div className="mt-1.5 flex items-center gap-1.5" aria-label={`Rated ${c.rating} out of 5`}>
                  <span className="flex gap-0.5 text-[#fbbf24]">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className="h-3 w-3 fill-current" />
                    ))}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#61758b]">{c.rating}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#61758b]">{c.text}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
