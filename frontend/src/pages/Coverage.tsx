import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass } from "lucide-react";
import { REGIONS } from "@/lib/site";
import { FadeUp, SectionHeading } from "@/components/Reveal";

export default function Coverage() {
  const [regionId, setRegionId] = useState(REGIONS[0].id);
  const region = REGIONS.find((r) => r.id === regionId) ?? REGIONS[0];

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">Coverage</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Pick your ocean. We engineer the link.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#61758b]">
              Route-aware bearer selection across LEO, GEO VSAT and L-band — with latency profiles from live
              installations, not brochure numbers.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8" data-testid="coverage-simulator">
        <SectionHeading eyebrow="Coverage Simulator" title="Where does your vessel trade?" />
        <div className="mt-10 flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <button
              key={r.id}
              data-testid={`region-${r.id}`}
              onClick={() => setRegionId(r.id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition-all ${
                r.id === regionId
                  ? "border-[#0876d1] bg-[#eaf4ff] text-[#0876d1]"
                  : "border-[#dce6ef] text-[#61758b] hover:border-[#0876d1]/50 hover:text-[#071c38]"
              }`}
            >
              <Compass className="h-4 w-4" /> {r.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={region.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid gap-6 rounded-2xl border border-[#dce6ef] bg-white p-8 shadow-[0_12px_38px_rgba(7,31,55,0.07)] lg:grid-cols-2"
          >
            <div>
              <h3 className="font-heading text-2xl font-bold text-[#071c38]">{region.name}</h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between gap-6 border-b border-[#e2ebf3] pb-3">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-[#61758b]">Recommended primary</dt>
                  <dd className="text-right font-semibold text-[#071c38]">{region.primary}</dd>
                </div>
                <div className="flex justify-between gap-6 border-b border-[#e2ebf3] pb-3">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-[#61758b]">Failover bearer</dt>
                  <dd className="text-right font-semibold text-[#071c38]">{region.secondary}</dd>
                </div>
              </dl>
              <p className="mt-5 text-sm leading-relaxed text-[#61758b]">{region.note}</p>
            </div>
            <div className="rounded-xl border border-[#dce6ef] bg-[#f5f8fb] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#61758b]">Latency profile</p>
              {[
                { label: "LEO bearer", value: region.leoLatency, pct: 12 },
                { label: "GEO VSAT / L-band", value: region.geoLatency, pct: region.geoLatency.includes("no ") ? 0 : 88 },
              ].map((row) => (
                <div key={row.label} className="mt-6">
                  <div className="mb-2 flex justify-between font-mono text-[11px] uppercase tracking-wider">
                    <span className="text-[#61758b]">{row.label}</span>
                    <span className="font-semibold text-[#071c38]">{row.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#e2ebf3]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(row.pct, 2)}%` }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full rounded-full ${row.label.startsWith("LEO") ? "bg-gradient-to-r from-[#075db1] to-[#1388e5]" : "bg-[#b6c7d6]"}`}
                    />
                  </div>
                </div>
              ))}
              <p className="mt-6 text-xs leading-relaxed text-[#8aa0b8]">
                Lower is better. LEO bearers carry latency-sensitive traffic; GEO/L-band carries bulk and
                safety services.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
