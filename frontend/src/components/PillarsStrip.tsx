import { FadeUp, SectionHeading } from "./Reveal";

const PILLARS = [
  { n: "01", title: "Connectivity", text: "Multi-orbit LEO + GEO networks with bonded failover and global coverage." },
  { n: "02", title: "IT & Cybersecurity", text: "Managed firewalls, segmented networks and IACS-compliant hardening." },
  { n: "03", title: "Operational Technology", text: "CCTV, monitoring and automation that keep vessels audit-ready." },
  { n: "04", title: "Crew Welfare", text: "Crew Wi-Fi with fair quotas — morale up, complaints down." },
];

export default function PillarsStrip() {
  return (
    <section className="border-b border-[#dce6ef] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="One Partner — Total Solution"
            title="Innovation, integrated for maritime"
          />
          <FadeUp delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-[#61758b]">
              Connectivity, IT, cybersecurity, CCTV and crew welfare — delivered through one team,
              one contract and one 24/7 NOC.
            </p>
          </FadeUp>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#dce6ef] bg-[#dce6ef] sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <FadeUp key={p.n} delay={i * 0.06} className="bg-white">
              <div className="group h-full p-7 transition-colors duration-300 hover:bg-[#f5f8fb]">
                <p className="font-heading text-4xl font-extrabold text-outline-light transition-colors duration-300 group-hover:text-[#0876d1] group-hover:[-webkit-text-stroke:0px]">
                  {p.n}
                </p>
                <h3 className="mt-4 font-heading text-base font-bold text-[#071c38]">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#61758b]">{p.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
