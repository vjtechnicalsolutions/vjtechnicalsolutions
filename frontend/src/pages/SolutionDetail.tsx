import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Check, Zap, Gauge, Globe2, ShieldCheck, Settings, Download, Upload, Timer, Antenna } from "lucide-react";
import { SYSTEMS, SOLUTION_DETAILS } from "@/lib/site";
import { FadeUp, SectionHeading } from "@/components/Reveal";

const FEATURE_ICONS = [Zap, Gauge, Globe2, ShieldCheck, Settings];

export default function SolutionDetail() {
  const { systemId } = useParams<{ systemId: string }>();
  const system = SYSTEMS.find((s) => s.id === systemId);
  const detail = systemId ? SOLUTION_DETAILS[systemId] : undefined;

  if (!system || !detail) return <Navigate to="/services" replace />;

  const specs = [
    { icon: Download, label: "Download", value: system.down < 1 ? `up to ${system.down * 1000} kbps` : `up to ${system.down} Mbps` },
    { icon: Upload, label: "Upload", value: system.up < 1 ? `up to ${system.up * 1000} kbps` : `up to ${system.up} Mbps` },
    { icon: Timer, label: "Latency", value: system.latencyMs < 100 ? `< ${system.latencyMs + 64} ms` : `~${system.latencyMs} ms` },
    { icon: Antenna, label: "Hardware", value: system.antenna },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-24" data-testid={`solution-detail-${system.id}`}>
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">{detail.eyebrow}</p>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              {system.name} Solutions for Your Vessel
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#61758b]">{detail.intro}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/quote"
                data-testid="solution-cta-specialist"
                className="group inline-flex items-center gap-3 rounded-lg bg-[#0876d1] px-7 py-4 text-sm font-bold text-white transition-all hover:bg-[#0563b4] hover:shadow-[0_0_28px_rgba(8,118,209,0.35)]"
              >
                Connect with a Specialist
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/coverage"
                className="inline-flex items-center rounded-lg border border-[#0876d1] px-7 py-4 text-sm font-bold text-[#0876d1] transition-colors hover:bg-[#0876d1] hover:text-white"
              >
                Explore Coverage
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.12}>
            <div className="group relative overflow-hidden rounded-2xl border border-[#dce6ef] shadow-[0_16px_48px_rgba(7,31,55,0.12)]">
              <img
                src={system.image}
                alt={`${system.name} hardware`}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071c38]/85 to-transparent p-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5bb7f5]">{system.tag}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="Key Features" title={`What ${system.name} delivers`} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {detail.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
            return (
              <FadeUp key={f} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-[#dce6ef] bg-white p-5 shadow-[0_8px_28px_rgba(7,31,55,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0876d1]/50">
                  <Icon className="h-6 w-6 text-[#0876d1]" />
                  <p className="mt-4 text-sm font-semibold leading-snug text-[#102d52]">{f}</p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      <section className="bg-[#071c38]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading dark eyebrow="Benefits for Customers" title="What changes onboard" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {detail.benefits.map((b, i) => (
              <FadeUp key={b} delay={i * 0.05}>
                <div className="flex items-start gap-3.5 rounded-xl border border-[#1e3a5c] bg-[#0a2547] p-5">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0876d1]/25">
                    <Check className="h-3.5 w-3.5 text-[#5bb7f5]" />
                  </span>
                  <p className="text-sm font-semibold leading-relaxed text-[#e5edf5]">{b}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeading eyebrow="Technical Specifications" title="Numbers from live installs" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specs.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.05}>
              <div className="h-full rounded-xl border border-[#dce6ef] bg-[#f5f8fb] p-6">
                <s.icon className="h-5 w-5 text-[#0876d1]" />
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#61758b]">{s.label}</p>
                <p className="mt-1.5 font-heading text-sm font-bold leading-snug text-[#071c38]">{s.value}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-[#f5f8fb]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <SectionHeading eyebrow="Use Cases" title="Where we deploy it" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {detail.useCases.map((u, i) => (
              <FadeUp key={u.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-[#dce6ef] bg-white p-6 shadow-[0_8px_28px_rgba(7,31,55,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0876d1]/50">
                  <h3 className="font-heading text-base font-bold text-[#071c38]">{u.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#61758b]">{u.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071c38]">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8">
          <FadeUp>
            <h2 className="mx-auto max-w-2xl font-heading text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              {detail.cta}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#b9cad8]">
              Discuss the best connectivity solution for your fleet or remote operations.
            </p>
            <Link
              to="/quote"
              data-testid="solution-cta-quote"
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-[#0876d1] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#0563b4] hover:shadow-[0_0_32px_rgba(8,118,209,0.45)]"
            >
              Talk to a Specialist <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
