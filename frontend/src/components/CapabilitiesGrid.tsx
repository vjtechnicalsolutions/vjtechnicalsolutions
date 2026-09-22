import { Satellite, Network, ShieldCheck, Wrench, Headset, Radio, Video, BadgeCheck } from "lucide-react";
import { FadeUp, SectionHeading } from "./Reveal";

const CAPABILITIES = [
  {
    icon: Satellite,
    title: "Satellite Connectivity",
    text: "Starlink Maritime, VSAT/KVH, OneWeb, Iridium Certus and hybrid connectivity support.",
    image: "/assets/maritime-radome-sunset.png",
  },
  {
    icon: Network,
    title: "Vessel IT & Networking",
    text: "LAN/WAN, Wi-Fi, MikroTik, routers, switches, computers, servers and onboard network support.",
    image: "https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    icon: Video,
    title: "Marine CCTV & Security",
    text: "IP camera systems, marinised housings, onboard NVR and remote viewing over the bonded link.",
    image: "https://images.unsplash.com/photo-1589935447067-5531094415d1?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    icon: ShieldCheck,
    title: "Firewall & Cybersecurity",
    text: "Firewall configuration, routing, migrations, access control and network troubleshooting.",
    image: "https://images.unsplash.com/photo-1608936511952-11bd2edde695?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
  {
    icon: Wrench,
    title: "Installation & Repair",
    text: "Onboard installation, replacement, commissioning, maintenance and fault restoration.",
    image: "/assets/maritime-radome-technician.png",
  },
  {
    icon: Headset,
    title: "Remote Technical Support",
    text: "Remote diagnostics, logs, system checks and coordination with technical teams.",
    image: "https://images.pexels.com/photos/3582597/pexels-photo-3582597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    icon: Radio,
    title: "Marine Equipment",
    text: "Marine IT, networking, connectivity equipment and accessories for operational needs.",
    image: "/assets/maritime-service-scene.png",
  },
  {
    icon: BadgeCheck,
    title: "Commissioning & Testing",
    text: "System commissioning, configuration, testing and technical handover support.",
    image: "https://images.unsplash.com/photo-1533960056888-5166859c1b1d?crop=entropy&cs=srgb&fm=jpg&q=85",
  },
];

export default function CapabilitiesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <SectionHeading
        eyebrow="Our Capabilities"
        title="Technical solutions for maritime & onshore operations"
        copy="Reliable field and technical support across connectivity, IT, networking, security, installation and maintenance."
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
                <h3 className="font-heading text-base font-bold text-[#071c38]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#61758b]">{c.text}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
