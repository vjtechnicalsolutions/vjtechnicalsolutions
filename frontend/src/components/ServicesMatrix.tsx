import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Antenna, Gauge, Globe2 } from "lucide-react";
import { Link } from "react-router-dom";
import { SYSTEMS } from "@/lib/site";
import { FadeUp, SectionHeading } from "./Reveal";

export default function ServicesMatrix() {
  const [activeId, setActiveId] = useState(SYSTEMS[0].id);
  const active = SYSTEMS.find((s) => s.id === activeId) ?? SYSTEMS[0];

  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
      <SectionHeading
        eyebrow="Connectivity Systems"
        title="Five bearers. One engineered network."
        copy="Every vessel gets a designed mix of LEO, GEO VSAT and L-band safety services — installed, bonded and watched by our NOC."
      />

      <FadeUp delay={0.1} className="mt-12">
        <div className="flex flex-wrap gap-2 border-b border-[#dce6ef] pb-4" role="tablist">
          {SYSTEMS.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === activeId}
              data-testid={`matrix-tab-${s.id}`}
              onClick={() => setActiveId(s.id)}
              className={`relative rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
                s.id === activeId ? "text-[#0876d1]" : "text-[#61758b] hover:text-[#071c38]"
              }`}
            >
              {s.name}
              {s.id === activeId && (
                <motion.span
                  layoutId="matrix-underline"
                  className="absolute inset-x-3 -bottom-[17px] h-0.5 bg-[#0876d1]"
                />
              )}
            </button>
          ))}
        </div>
      </FadeUp>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-[#dce6ef] shadow-[0_16px_48px_rgba(7,31,55,0.1)]">
            <img
              src={active.image}
              alt={`${active.name} antenna hardware`}
              className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#071c38]/90 to-transparent p-5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#5bb7f5]">{active.tag}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/80">{active.orbit}</span>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold text-[#071c38] sm:text-3xl">{active.name}</h3>
            <p className="mt-4 text-base leading-relaxed text-[#61758b]">{active.blurb}</p>
            <p className="mt-6 flex items-start gap-3 text-sm font-semibold text-[#102d52]">
              <Antenna className="mt-0.5 h-4 w-4 shrink-0 text-[#0876d1]" />
              {active.antenna}
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {[
                { icon: Gauge, label: "Latency", value: `${active.latencyMs} ms` },
                {
                  icon: Globe2,
                  label: "Down / Up",
                  value: active.down < 1 ? `${active.down * 1000} kbps` : `${active.down}↓ ${active.up}↑`,
                },
                { icon: Antenna, label: "Class", value: active.tag },
              ].map((c) => (
                <div key={c.label} className="rounded-xl border border-[#dce6ef] bg-[#f5f8fb] p-4">
                  <c.icon className="h-4 w-4 text-[#0876d1]" />
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-[#61758b]">{c.label}</p>
                  <p className="mt-1 font-heading text-xs font-bold leading-snug text-[#071c38] sm:text-sm">{c.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#dce6ef] bg-white p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#61758b]">Best for</p>
              <p className="mt-2 text-sm leading-relaxed text-[#334e68]">{active.bestFor}</p>
              <div className="mt-5">
                <div className="mb-1.5 flex justify-between font-mono text-[10px] uppercase tracking-wider text-[#61758b]">
                  <span>Relative throughput</span>
                  <span>{Math.round((active.down / 220) * 100)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#e2ebf3]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(2, (active.down / 220) * 100)}%` }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#075db1] to-[#1388e5]"
                  />
                </div>
              </div>
            </div>

            <Link
              to="/quote"
              data-testid={`matrix-quote-${active.id}`}
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0876d1] transition-colors hover:text-[#075db1]"
            >
              Spec this system for my vessel
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
