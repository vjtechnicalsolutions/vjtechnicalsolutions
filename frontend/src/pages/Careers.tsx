import { Mail, MapPin, Satellite, Headset, Video, Wrench } from "lucide-react";
import { FadeUp, SectionHeading } from "@/components/Reveal";

const ROLES = [
  {
    icon: Satellite,
    title: "Field Service Engineer — SATCOM",
    location: "Global ports · travel-based",
    text: "Install, commission and repair Starlink Maritime, OneWeb, KVH VSAT, Iridium Certus and FleetBroadband systems onboard vessels.",
  },
  {
    icon: Headset,
    title: "Service & Spares Coordinator",
    location: "Office / remote · full-time",
    text: "Schedule field engineers, arrange spare parts to ports worldwide and keep attendance jobs on track.",
  },
  {
    icon: Video,
    title: "Network & CCTV Technician",
    location: "Port-based · on-call",
    text: "Vessel LAN/WAN builds, MikroTik configuration, marine CCTV installation and crew Wi-Fi deployments.",
  },
  {
    icon: Wrench,
    title: "Commissioning Engineer",
    location: "Global ports · project-based",
    text: "System commissioning, sea-trial testing, survey documentation and technical handover to crew.",
  },
];

export default function Careers() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">Careers</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Work with VJ Technical Solutions.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#61758b]">
              We are a hands-on marine technical team. If you know your way around a radome, a router or a
              rack — and you don't mind a 04:30 port call — we want to hear from you.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading
          eyebrow="Open Tracks"
          title="Field roles we crew for"
          copy="Permanent and per-project engagements. Field engineers join our global attendance roster; NOC roles are remote."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {ROLES.map((r, i) => (
            <FadeUp key={r.title} delay={i * 0.06}>
              <div className="group h-full rounded-2xl border border-[#dce6ef] bg-white p-8 shadow-[0_8px_28px_rgba(7,31,55,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0876d1]/50 hover:shadow-[0_16px_48px_rgba(8,118,209,0.15)]">
                <r.icon className="h-7 w-7 text-[#0876d1]" />
                <h3 className="mt-5 font-heading text-lg font-bold text-[#071c38]">{r.title}</h3>
                <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#0876d1]">
                  <MapPin className="h-3 w-3" /> {r.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#61758b]">{r.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-14 rounded-2xl bg-[#071c38] p-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-white">How to apply</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#b9cad8]">
              Email your CV and a short note about the systems you've worked on. Use the subject line
              "Careers — &lt;role name&gt;". We reply to every application.
            </p>
            <a
              href="mailto:info.vjtechnicalsolutions@gmail.com?subject=Careers%20—%20Field%20Service%20Engineer"
              data-testid="careers-apply-button"
              className="mt-7 inline-flex items-center gap-3 rounded-lg bg-[#0876d1] px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-[#0563b4]"
            >
              <Mail className="h-4 w-4" /> info.vjtechnicalsolutions@gmail.com
            </a>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
