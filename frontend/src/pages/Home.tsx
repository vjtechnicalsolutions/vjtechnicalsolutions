import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import KineticHero from "@/components/KineticHero";
import EditorialRibbon from "@/components/EditorialRibbon";
import CapabilitiesGrid from "@/components/CapabilitiesGrid";
import ServicesMatrix from "@/components/ServicesMatrix";
import EngineerManifesto from "@/components/EngineerManifesto";
import { FadeUp, SectionHeading } from "@/components/Reveal";

const TICKS = [
  "Maritime SATCOM & vessel IT support",
  "Onboard installation and troubleshooting",
  "Port attendance and field engineering",
  "Network, firewall, CCTV and connectivity support",
];

const INDUSTRIES = ["Commercial Shipping", "Offshore & Marine", "Fishing Vessels", "Yachting", "Remote Sites", "Industrial", "Enterprise IT", "Onshore Offices"];

const STATS = [
  { v: "SATCOM", l: "Connectivity Support" },
  { v: "VESSEL IT", l: "Network & IT Support" },
  { v: "FIELD", l: "Installation & Attendance" },
  { v: "24/7", l: "Support Coordination" },
];

export default function Home() {
  return (
    <>
      <KineticHero />
      <EditorialRibbon />
      <CapabilitiesGrid />

      <div className="bg-[#f5f8fb]">
        <ServicesMatrix />
      </div>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">
        <div>
          <SectionHeading
            eyebrow="About VJ Technical Solutions"
            title="Practical technical support for connected operations."
            copy="We focus on maritime SATCOM, vessel IT and onshore technical services — combining remote troubleshooting with field installation, repair, maintenance and attendance when hands-on support is required."
          />
          <FadeUp delay={0.15}>
            <ul className="mt-8 space-y-3.5">
              {TICKS.map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm font-semibold text-[#102d52]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eaf4ff]">
                    <Check className="h-3.5 w-3.5 text-[#0876d1]" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#0876d1] transition-colors hover:text-[#075db1]"
            >
              Read the engineering manifesto
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>
        <FadeUp delay={0.1}>
          <div className="group relative overflow-hidden rounded-2xl border border-[#dce6ef] shadow-[0_16px_48px_rgba(7,31,55,0.1)]">
            <img
              src="/assets/maritime-radome-technician.png"
              alt="Field engineer servicing a vessel radome"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071c38]/90 to-transparent p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5bb7f5]">Field Operations</p>
              <p className="mt-1 font-heading text-lg font-bold text-white">Radome service, port of call — 04:30 UTC</p>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="bg-[#f5f8fb]">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <SectionHeading eyebrow="Industries" title="Supporting connected environments" align="center" />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {INDUSTRIES.map((ind, i) => (
              <FadeUp key={ind} delay={i * 0.04}>
                <div
                  className="relative flex h-36 items-end overflow-hidden rounded-xl border border-[#dce6ef] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(7,31,55,0.18)]"
                  style={{
                    backgroundImage: "linear-gradient(160deg, rgba(7,28,56,0.85), rgba(8,118,209,0.45)), url(/assets/maritime-service-scene.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <span className="font-heading text-base font-bold text-white">{ind}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071c38]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 text-center lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <FadeUp key={s.l}>
              <p className="font-heading text-2xl font-extrabold text-[#5bb7f5] sm:text-3xl">{s.v}</p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9cad8]">{s.l}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <EngineerManifesto />

      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1608936511952-11bd2edde695?crop=entropy&cs=srgb&fm=jpg&q=85"
          alt="Vessel underway at night"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041222]/95 via-[#06213d]/90 to-[#086db8]/60" />
        <div className="relative mx-auto max-w-7xl px-5 py-28 lg:px-8">
          <FadeUp>
            <h2 className="max-w-2xl font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Let&apos;s keep your systems operational.
            </h2>
            <p className="mt-4 max-w-xl text-base text-[#c7d5e2]">
              Vessel attendance, installation, repair, maintenance or a full connectivity refit — one email or one form away.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/quote"
                data-testid="home-cta-quote"
                className="inline-flex items-center gap-3 rounded-lg bg-white px-7 py-4 text-sm font-bold text-[#075db1] transition-all hover:shadow-[0_0_32px_rgba(255,255,255,0.35)]"
              >
                Request Service <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:info@vjtechnicalsolutions.com"
                className="inline-flex items-center rounded-lg border border-white/60 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#071c38]"
              >
                info@vjtechnicalsolutions.com
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
