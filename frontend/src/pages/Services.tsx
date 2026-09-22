import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, GitBranch } from "lucide-react";
import ServicesMatrix from "@/components/ServicesMatrix";
import { FadeUp, SectionHeading } from "@/components/Reveal";
import { SOLUTION_CATEGORIES, STATS } from "@/lib/site";

const HERO_STATS = [
  { v: STATS.systems, l: "Satellite systems" },
  { v: STATS.ports, l: "Ports covered" },
  { v: STATS.vessels, l: "Vessels supported" },
  { v: STATS.watch, l: "NOC support" },
];

export default function Services() {
  const [catId, setCatId] = useState("all");
  const visible = catId === "all" ? SOLUTION_CATEGORIES : SOLUTION_CATEGORIES.filter((c) => c.id === catId);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">All Solutions</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Integrated maritime &amp; satellite communication solutions.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#61758b]">
              Maritime technology across connectivity, IT, crew welfare and operational safety — installed
              and supported by one field team.
            </p>
            <Link
              to="/quote"
              data-testid="services-hero-cta"
              className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-[#0876d1] px-7 py-4 text-sm font-bold text-white transition-all hover:bg-[#0563b4]"
            >
              Connect with a Specialist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-[#dce6ef] pt-8 sm:grid-cols-4">
              {HERO_STATS.map((s) => (
                <div key={s.l}>
                  <p className="font-heading text-2xl font-extrabold text-[#071c38] sm:text-3xl">{s.v}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#61758b]">{s.l}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8" data-testid="solutions-catalog">
        <FadeUp>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Solution categories">
            {[{ id: "all", label: "All Solutions" }, ...SOLUTION_CATEGORIES.map((c) => ({ id: c.id, label: c.label }))].map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={catId === c.id}
                data-testid={`solution-cat-${c.id}`}
                onClick={() => setCatId(c.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${
                  catId === c.id
                    ? "border-[#0876d1] bg-[#0876d1] text-white"
                    : "border-[#dce6ef] text-[#61758b] hover:border-[#0876d1]/50 hover:text-[#071c38]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {visible.map((cat) => (
          <div key={cat.id} className="mt-16">
            <SectionHeading eyebrow={cat.label} title={cat.tagline} />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cat.products.map((p, i) => (
                <FadeUp key={p.name} delay={(i % 3) * 0.05}>
                  <div className="flex h-full flex-col rounded-2xl border border-[#dce6ef] bg-white p-7 shadow-[0_8px_28px_rgba(7,31,55,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0876d1]/50 hover:shadow-[0_16px_48px_rgba(8,118,209,0.15)]">
                    <h3 className="font-heading text-lg font-bold text-[#071c38]">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#61758b]">{p.tagline}</p>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-[#334e68]">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#15803d]" /> {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={p.path}
                      data-testid={`product-${p.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0876d1] transition-colors hover:text-[#075db1]"
                    >
                      Know More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="border-t border-[#dce6ef] bg-[#f5f8fb]">
        <ServicesMatrix />
      </div>

      <section className="border-t border-[#dce6ef] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <FadeUp className="flex flex-col items-start gap-6 rounded-2xl border border-[#bfdbfe] bg-[#eaf4ff] p-8 sm:flex-row sm:items-center">
            <GitBranch className="h-10 w-10 shrink-0 text-[#0876d1]" />
            <div className="flex-1">
              <h2 className="font-heading text-xl font-bold text-[#071c38]">Hybrid failover topology, standard on every install</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#334e68]">
                LEO primary → VSAT secondary → L-band tertiary, bonded at the router with per-bearer health
                probes. Session-persistent handoff in under 300 ms — the crew never sees a dropout.
              </p>
            </div>
            <Link
              to="/quote"
              data-testid="services-cta-quote"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#0876d1] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0563b4]"
            >
              Design my network <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
