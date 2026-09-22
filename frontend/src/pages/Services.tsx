import { Link } from "react-router-dom";
import { ArrowRight, GitBranch } from "lucide-react";
import ServicesMatrix from "@/components/ServicesMatrix";
import CapabilitiesGrid from "@/components/CapabilitiesGrid";
import { FadeUp } from "@/components/Reveal";

export default function Services() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">Services</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Every bearer, every router, every radar sweep — engineered.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#61758b]">
              From antenna selection to bonded failover topology, we design, install and support the full
              connectivity stack plus the vessel IT, CCTV and security that ride on it.
            </p>
          </FadeUp>
        </div>
      </section>

      <ServicesMatrix />

      <section className="bg-[#f5f8fb]">
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

      <CapabilitiesGrid />
    </>
  );
}
