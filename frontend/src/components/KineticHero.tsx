import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Activity, Signal, ArrowUpDown } from "lucide-react";
import { MaskedLine } from "./Reveal";
import { SYSTEMS, STATS } from "@/lib/site";

export default function KineticHero() {
  const [activeId, setActiveId] = useState(SYSTEMS[0].id);
  const active = SYSTEMS.find((s) => s.id === activeId) ?? SYSTEMS[0];
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 140]);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#071c38] pt-[76px]">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <img
          src="/assets/maritime-radome-sunset.png"
          alt="VSAT radome array on a vessel mast at sunset"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031427]/95 via-[#05192e]/80 to-[#05192e]/40" />
        <div className="absolute inset-0 bg-grid-dark" />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-3 rounded-full border border-[#1e3a5c] bg-[#0a2547]/80 px-4 py-2"
          >
            <span className="ping-dot h-2 w-2 rounded-full bg-[#22c55e]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b9d9f3]">
              24/7 Maritime NOC · Link Live
            </span>
          </motion.div>

          <h1 className="mt-8 font-heading text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-[64px]">
            <MaskedLine delay={0.25}>KEEPING VESSELS</MaskedLine>
            <MaskedLine delay={0.38}>
              <span className="text-[#5bb7f5]">CONNECTED</span> —
            </MaskedLine>
            <MaskedLine delay={0.51}>ACROSS EVERY OCEAN.</MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-[#c7d5e2] sm:text-lg"
          >
            VJ Technical Solutions is first a field team — vessel attendance, installation, repair and
            maintenance at 40+ ports — backed by deep Starlink Maritime, OneWeb, KVH VSAT, Iridium Certus
            and FleetBroadband expertise, so your vessel stays online, operational and survey-ready on every voyage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/quote"
              data-testid="hero-cta-quote"
              className="group inline-flex items-center gap-3 rounded-lg bg-[#0876d1] px-7 py-4 text-sm font-bold text-white transition-all hover:bg-[#0563b4] hover:shadow-[0_0_32px_rgba(8,118,209,0.5)]"
            >
              Request Vessel Attendance
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/coverage"
              data-testid="hero-cta-coverage"
              className="inline-flex items-center gap-3 rounded-lg border border-white/60 px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#071c38]"
            >
              Explore Coverage
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-[#1e3a5c] pt-7"
          >
            {[
              { v: STATS.vessels, l: "Vessels supported" },
              { v: STATS.ports, l: "Ports with engineers" },
              { v: STATS.watch, l: "NOC watchkeeping" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-heading text-2xl font-extrabold text-white sm:text-3xl">{s.v}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7d99b5]">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="rounded-2xl border border-white/40 bg-white/95 p-6 shadow-[0_24px_80px_rgba(3,20,39,0.55)] backdrop-blur-xl"
          data-testid="hero-service-selector"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#61758b]">
              Live Link Budget · MV Demo
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#e7f6ee] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#15803d]">
              <span className="ping-dot h-1.5 w-1.5 rounded-full bg-[#22c55e]" /> Nominal
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {SYSTEMS.map((s) => (
              <button
                key={s.id}
                data-testid={`service-tab-${s.id}`}
                onClick={() => setActiveId(s.id)}
                className={`rounded-lg border px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  s.id === activeId
                    ? "border-[#0876d1] bg-[#eaf4ff] text-[#0876d1]"
                    : "border-[#dce6ef] text-[#61758b] hover:border-[#0876d1]/50 hover:text-[#071c38]"
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>

          <div key={active.id} className="mt-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-heading text-xl font-bold text-[#071c38]">{active.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#61758b]">{active.orbit}</p>
              </div>
              <div className="text-right">
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="font-mono text-3xl font-bold text-[#0876d1]"
                >
                  {active.latencyMs}
                  <span className="text-sm text-[#61758b]"> ms</span>
                </motion.p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[#61758b]">Latency</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                { label: "Downlink", value: active.down, max: 220, unit: "Mbps", icon: Signal },
                { label: "Uplink", value: active.up, max: 32, unit: "Mbps", icon: ArrowUpDown },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#61758b]">
                    <span className="inline-flex items-center gap-2">
                      <row.icon className="h-3.5 w-3.5 text-[#0876d1]" /> {row.label}
                    </span>
                    <span className="text-[#071c38]">{row.value} {row.unit}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#e2ebf3]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(2, (row.value / row.max) * 100))}%` }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[#075db1] to-[#1388e5]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#dce6ef] bg-[#f5f8fb] p-4">
              <Activity className="h-5 w-5 shrink-0 text-[#15803d]" />
              <p className="text-xs leading-relaxed text-[#334e68]">
                SD-WAN failover armed — traffic re-routes to the secondary bearer in under 300 ms if this
                link degrades.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
