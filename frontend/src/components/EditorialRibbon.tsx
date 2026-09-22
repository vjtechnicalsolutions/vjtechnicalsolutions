import { Satellite } from "lucide-react";

const ITEMS = [
  "STARLINK MARITIME",
  "EUTELSAT ONEWEB",
  "KVH TRACPHONE VSAT",
  "IRIDIUM CERTUS 700",
  "FLEETBROADBAND 250/500",
  "MARINE CCTV",
  "BONDED SD-WAN",
  "MIKROTIK NETWORKS",
  "GMDSS COMPLIANCE",
];

export default function EditorialRibbon() {
  return (
    <div className="overflow-hidden border-y border-[#dce6ef] bg-[#f5f8fb] py-5" aria-hidden>
      <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-[#61758b]">
              {item}
            </span>
            <Satellite className="h-3.5 w-3.5 text-[#0876d1]" />
          </span>
        ))}
      </div>
    </div>
  );
}
