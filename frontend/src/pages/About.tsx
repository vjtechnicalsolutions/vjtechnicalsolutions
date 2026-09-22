import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import EngineerManifesto from "@/components/EngineerManifesto";
import { FadeUp, SectionHeading } from "@/components/Reveal";
import { STATS as SITE_STATS } from "@/lib/site";

const STATS = [
  { v: SITE_STATS.vessels, l: "Vessels supported" },
  { v: SITE_STATS.systems, l: "Satellite systems certified" },
  { v: SITE_STATS.ports, l: "Ports with field engineers" },
  { v: SITE_STATS.watch, l: "Support coordination" },
];

const BADGES = ["SOLAS", "GMDSS", "IACS UR E26/E27", "ISO 27001-aligned", "Iridium Partner", "KVH Certified"];

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">About the NOC</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Marine engineers first. IT specialists second. Always on call.
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 lg:grid-cols-2 lg:px-8">
        <FadeUp>
          <div className="group relative overflow-hidden rounded-2xl border border-[#dce6ef] shadow-[0_16px_48px_rgba(7,31,55,0.1)]">
            <img
              src="https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images/baf71f709dcfde7210581b0548d8477c02c2b7cf8d21e6b47cf2194dce050651.jpeg"
              alt="VJ engineer servicing a vessel radome at golden hour"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </FadeUp>
        <div>
          <SectionHeading
            eyebrow="Who We Are"
            title="Practical technical support for connected operations."
            copy="VJ Technical Solutions focuses on maritime SATCOM, vessel IT and onshore technical services. Our approach combines remote troubleshooting with field installation, repair, maintenance and attendance when hands-on support is required."
          />
          <FadeUp delay={0.15}>
            <ul className="mt-8 space-y-3.5">
              {["Maritime SATCOM & vessel IT support", "Onboard installation and troubleshooting", "Port attendance and field engineering", "Network, firewall, CCTV and connectivity support"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm font-semibold text-[#102d52]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eaf4ff]">
                    <Check className="h-3.5 w-3.5 text-[#0876d1]" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      <section className="bg-[#071c38]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 text-center lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <FadeUp key={s.l}>
              <p className="font-heading text-3xl font-extrabold text-[#5bb7f5]">{s.v}</p>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#b9cad8]">{s.l}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <EngineerManifesto />

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="Compliance" title="Survey-ready by default" align="center" />
        <FadeUp delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {BADGES.map((b) => (
              <span key={b} className="rounded-full border border-[#dce6ef] bg-[#f5f8fb] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[#102d52]">
                {b}
              </span>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/quote"
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#0876d1] transition-colors hover:text-[#075db1]"
            >
              Talk to an engineer about your next survey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
