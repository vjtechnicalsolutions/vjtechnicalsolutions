import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/Reveal";

const FAQS = [
  {
    q: "Which satellite systems do you support?",
    a: "Starlink Maritime, Eutelsat OneWeb, KVH TracPhone VSAT (Ku/Ka), Iridium Certus, Inmarsat FleetBroadband, and 4G/LTE hybrid setups. We install, commission, migrate and support all of them — including bonded multi-bearer configurations.",
  },
  {
    q: "Which areas and ports do you cover?",
    a: "Our field engineers attend vessels at 40+ ports across major shipping routes, and our NOC provides remote support worldwide, 24/7. If your port isn't on the roster we can usually fly an engineer or a flyaway kit in.",
  },
  {
    q: "How fast can an engineer attend?",
    a: "For scheduled port calls we confirm an engineer within 4 business hours of your request. Emergency flyaway attendance depends on the next port and travel connections — share the vessel's ETA and we plan around it.",
  },
  {
    q: "How is pricing calculated?",
    a: "Every job is quoted per vessel after a link budget and route survey, so you never pay for capacity you can't use. Send your vessel details through the Request Service form and an engineer will come back with a tailored quote.",
  },
  {
    q: "Can you migrate us from KVH/FleetBroadband to Starlink without losing our VSAT contract?",
    a: "Yes — that's our most common job. We install the LEO terminal as primary, re-role your existing TracPhone or FBB terminal as a metered secondary bearer, and let the SD-WAN router steer traffic by cost and latency. Nothing working gets ripped out.",
  },
  {
    q: "Do you help with IACS UR E26/E27 cybersecurity compliance?",
    a: "Yes. We deliver a documented baseline: a managed firewall at the WAN edge, VLAN segmentation for OT/business/crew Wi-Fi, and the audit evidence pack surveyors ask for.",
  },
  {
    q: "Do you supply equipment, or only services?",
    a: "Both. We supply marine-grade IT, networking, CCTV and connectivity equipment with accessories, and we install what we sell — so warranty and support sit with one team.",
  },
  {
    q: "How do I book a vessel attendance?",
    a: "Use the Request Service form with your vessel name, IMO number, port and required date. The request lands directly in our NOC queue and an engineer responds within 4 business hours.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number>(0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">FAQ</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Answers before you ask.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#61758b]">
              Service availability, supported systems, response times and how vessel attendance works.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8" data-testid="faq-list">
        <div className="divide-y divide-[#e2ebf3] rounded-2xl border border-[#dce6ef] bg-white shadow-[0_8px_28px_rgba(7,31,55,0.05)]">
          {FAQS.map((f, i) => (
            <div key={f.q}>
              <button
                data-testid={`faq-item-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-[#f5f8fb] sm:px-8"
              >
                <span className={`font-heading text-base font-bold ${open === i ? "text-[#0876d1]" : "text-[#071c38]"}`}>
                  {f.q}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-[#0876d1] transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm leading-relaxed text-[#61758b] sm:px-8">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-10 text-center">
            <p className="text-sm text-[#61758b]">Still have a question?</p>
            <Link
              to="/quote"
              className="group mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#0876d1] transition-colors hover:text-[#075db1]"
            >
              Ask an engineer directly
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
