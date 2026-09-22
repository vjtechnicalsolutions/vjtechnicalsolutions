import { FadeUp, SectionHeading } from "./Reveal";

const CHAPTERS = [
  {
    n: "01",
    title: "RF Topology & Link Budget",
    text: "Every install starts with a masthead survey: obstruction mapping, radar sweep arcs, cable runs and grounding. We compute the link budget before we drill a single hole.",
  },
  {
    n: "02",
    title: "Stabilisation & Mounting",
    text: "Gyro-stabilised VSAT pedestals and vibration-isolated flat-panel mounts, engineered for Beaufort 9 and verified with underway sea-trial speed tests.",
  },
  {
    n: "03",
    title: "SD-WAN Bonding & Failover",
    text: "Dual routers steer traffic across LEO, VSAT and L-band by latency and cost. Crew VoIP and ECDIS updates survive handoffs without a dropped session.",
  },
  {
    n: "04",
    title: "SOLAS / GMDSS Compliance",
    text: "Certus and FleetBroadband safety services commissioned with the documentation pack surveyors expect — our refits pass radio survey on first inspection.",
  },
];

export default function EngineerManifesto() {
  return (
    <section className="bg-[#071c38]">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <SectionHeading
          dark
          eyebrow="The Engineering Manifesto"
          title="How we keep 350+ hulls online"
          copy="Written by senior marine communications engineers, tested in salt water."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#1e3a5c] bg-[#1e3a5c] md:grid-cols-2">
          {CHAPTERS.map((c, i) => (
            <FadeUp key={c.n} delay={i * 0.07} className="bg-[#0a2547]">
              <div className="group h-full p-8 transition-colors duration-300 hover:bg-[#0d2c52] lg:p-10">
                <p className="font-heading text-5xl font-extrabold text-outline-dark transition-colors duration-300 group-hover:text-[#5bb7f5] group-hover:[-webkit-text-stroke:0px]">
                  {c.n}
                </p>
                <h3 className="mt-5 font-heading text-lg font-bold text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#b9cad8]">{c.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
