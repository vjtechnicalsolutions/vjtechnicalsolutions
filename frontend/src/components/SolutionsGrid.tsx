import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/site";
import { FadeUp, SectionHeading } from "./Reveal";

export default function SolutionsGrid() {
  return (
    <section className="bg-[#f5f8fb]">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Holistic Solutions"
          title="Reliable multi-network connectivity — whatever you operate"
          copy="Designed for shipping, offshore, government and beyond. Every environment gets hardware and a network plan matched to how it actually works."
          align="center"
        />
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {INDUSTRIES.map((ind, i) => (
            <FadeUp key={ind.name} delay={(i % 4) * 0.05}>
              <Link
                to="/quote"
                data-testid={`industry-card-${ind.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="group block overflow-hidden rounded-2xl border border-[#dce6ef] bg-white shadow-[0_8px_28px_rgba(7,31,55,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(8,118,209,0.16)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-4 w-4 text-[#0876d1]" />
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold text-[#071c38] transition-colors group-hover:text-[#0876d1]">
                    {ind.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#61758b] sm:text-sm">{ind.blurb}</p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
