import { Mail, Clock, Globe2 } from "lucide-react";
import EnquiryForm from "@/components/EnquiryForm";
import { FadeUp } from "@/components/Reveal";

const INFO = [
  { icon: Mail, label: "Email", value: "info@vjtechnicalsolutions.com", href: "mailto:info@vjtechnicalsolutions.com" },
  { icon: Clock, label: "Response", value: "Within 4 business hours, 24/7 for P1" },
  { icon: Globe2, label: "Coverage", value: "40+ ports, global remote support" },
];

export default function Quote() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">Vessel Attendance</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Request technical support or a fleet quote.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#61758b]">
              Share your vessel and job details — the requirement lands directly in our NOC queue for review.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <FadeUp>
          <div className="space-y-4">
            {INFO.map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-xl border border-[#dce6ef] bg-white p-6 shadow-[0_8px_28px_rgba(7,31,55,0.05)]">
                <c.icon className="mt-0.5 h-6 w-6 shrink-0 text-[#0876d1]" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#61758b]">{c.label}</p>
                  {c.href ? (
                    <a href={c.href} className="mt-1 block text-sm font-bold text-[#071c38] transition-colors hover:text-[#0876d1]">
                      {c.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-bold text-[#071c38]">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="relative overflow-hidden rounded-xl border border-[#dce6ef]">
              <img src="/assets/maritime-service-scene.png" alt="Engineers at work on a vessel" className="aspect-[16/9] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071c38]/90 to-transparent p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5bb7f5]">Field team on attendance</p>
              </div>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <EnquiryForm />
        </FadeUp>
      </section>
    </>
  );
}
