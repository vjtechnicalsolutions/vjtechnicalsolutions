import { useState } from "react";
import { Expand } from "lucide-react";
import { VJ_IMAGES } from "@/lib/site";
import { FadeUp } from "@/components/Reveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const IMG = "https://static.prod-images.emergentagent.com/jobs/e1e3194f-4ae3-4d74-9184-a90288057005/images";

interface Shot {
  src: string;
  title: string;
  category: string;
}

const SHOTS: Shot[] = [
  { src: VJ_IMAGES.engineer, title: "Engineer servicing radome at golden hour", category: "Attendance" },
  { src: VJ_IMAGES.starlinkMounted, title: "Starlink flat panel mounted on vessel mast", category: "Installation" },
  { src: `${IMG}/fd957a89ac2ca7ae6acde0ccb8f6307ef839a4db6bcd3ee8f7ce54ee9740900e.jpeg`, title: "Commissioning a Sailor radome with live link tests", category: "Commissioning" },
  { src: VJ_IMAGES.mikrotik, title: "MikroTik RB5009 racked and patched", category: "Network" },
  { src: VJ_IMAGES.cctvVessel, title: "Marinised CCTV camera fixed on superstructure", category: "CCTV" },
  { src: `${IMG}/dc6d0b9ee25edc64c52dcc8d14bbf16b0483b37721787497450bda6ebe653eda.jpeg`, title: "Intellian OneWeb terminal installed on mast", category: "Installation" },
  { src: `${IMG}/e6c88ebb6cd6b75c0b87fa1c14e2f891770879995c3ea786f1deb1c0f2175c07.jpeg`, title: "KVH VSAT dome attendance on cargo vessel", category: "Attendance" },
  { src: VJ_IMAGES.cisco, title: "Cisco switch installed in vessel rack", category: "Network" },
  { src: `${IMG}/ca1f60fc0195c20370549f5bda71d5ed16b9d3131ab533e10769fe091bf885cd.jpeg`, title: "Iridium Certus terminal pole-mounted", category: "Installation" },
  { src: `${IMG}/810357e0a35111bd05d8ecf2236a5fb950404afd799539e0d5f744a61f976c4a.jpeg`, title: "Firewall and network security cabinet", category: "Network" },
  { src: `${IMG}/c5712ceaf77479643689033e9eeaa39d7da9238c1a089218a4f7354f09901e24.jpeg`, title: "FleetBroadband terminal on fishing vessel", category: "Installation" },
  { src: VJ_IMAGES.hero, title: "Vessel online at dusk — every bearer nominal", category: "Attendance" },
  { src: "/assets/maritime-radome-sunset.png", title: "Radome array service at sunset", category: "Attendance" },
  { src: "/assets/maritime-service-scene.png", title: "VJ Marine field kit on deck", category: "Spares" },
  { src: "https://images.pexels.com/photos/19089153/pexels-photo-19089153.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", title: "Mast antenna cluster inspection", category: "Attendance" },
  { src: "https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", title: "Rack cabling and network dressing", category: "Network" },
];

const CATEGORIES = ["All", "Attendance", "Installation", "Commissioning", "Network", "CCTV", "Spares"];

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [openShot, setOpenShot] = useState<Shot | null>(null);
  const shots = cat === "All" ? SHOTS : SHOTS.filter((s) => s.category === cat);

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">Photo Gallery</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Our work, on board.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#61758b]">
              Attendance, installation, commissioning and spares — photographed where it happens: on the mast,
              in the rack, on the deck.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8" data-testid="gallery-grid">
        <FadeUp>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                data-testid={`gallery-cat-${c.toLowerCase()}`}
                onClick={() => setCat(c)}
                className={`rounded-full border px-5 py-2.5 text-sm font-bold transition-all ${
                  cat === c
                    ? "border-[#0876d1] bg-[#0876d1] text-white"
                    : "border-[#dce6ef] text-[#61758b] hover:border-[#0876d1]/50 hover:text-[#071c38]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shots.map((s, i) => (
            <FadeUp key={s.src} delay={(i % 4) * 0.05}>
              <button
                data-testid={`gallery-item-${i}`}
                onClick={() => setOpenShot(s)}
                className="group relative block w-full overflow-hidden rounded-xl border border-[#dce6ef] bg-white shadow-[0_8px_28px_rgba(7,31,55,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(8,118,209,0.16)]"
              >
                <img src={s.src} alt={s.title} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="h-4 w-4 text-[#0876d1]" />
                </span>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071c38]/90 to-transparent p-4 text-left">
                  <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#5bb7f5]">{s.category}</span>
                  <span className="mt-1 block text-sm font-semibold leading-snug text-white">{s.title}</span>
                </span>
              </button>
            </FadeUp>
          ))}
        </div>
      </section>

      <Dialog open={openShot !== null} onOpenChange={(open) => !open && setOpenShot(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-[#dce6ef] bg-white sm:max-w-3xl" data-testid="gallery-lightbox">
          {openShot && (
            <>
              <img src={openShot.src} alt={openShot.title} className="w-full rounded-lg object-cover" />
              <DialogHeader>
                <span className="w-max rounded-full bg-[#0876d1] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                  {openShot.category}
                </span>
                <DialogTitle className="font-heading text-lg font-bold text-[#071c38]">{openShot.title}</DialogTitle>
                <DialogDescription className="text-sm text-[#61758b]">VJ Technical Solutions — field work photo</DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
