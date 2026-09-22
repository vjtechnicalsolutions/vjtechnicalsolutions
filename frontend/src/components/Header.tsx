import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { VJ_IMAGES } from "@/lib/site";

const LINKS = [
  { name: "Services", path: "/services", testid: "nav-link-services" },
  { name: "Coverage", path: "/coverage", testid: "nav-link-coverage" },
  { name: "About", path: "/about", testid: "nav-link-about" },
  { name: "Intelligence", path: "/news", testid: "nav-link-news" },
  { name: "Support", path: "/support", testid: "nav-link-support" },
];

interface MegaCategory {
  id: string;
  label: string;
  kicker: string;
  title: string;
  image: string;
  explore: string;
  links: { name: string; path: string }[];
}

const MEGA: MegaCategory[] = [
  {
    id: "connectivity",
    label: "Connectivity",
    kicker: "CONNECTIVITY",
    title: "Multi-orbit vessel connectivity",
    image: VJ_IMAGES.starlinkMounted,
    explore: "/services",
    links: [
      { name: "Starlink Maritime", path: "/solutions/starlink" },
      { name: "Eutelsat OneWeb", path: "/solutions/oneweb" },
      { name: "Iridium Certus", path: "/solutions/iridium" },
      { name: "VSAT (Ku / Ka) — KVH", path: "/solutions/kvh" },
      { name: "FleetBroadband", path: "/solutions/fleetbroadband" },
    ],
  },
  {
    id: "it",
    label: "IT & Cybersecurity",
    kicker: "IT & CYBERSECURITY",
    title: "Vessel IT, networks & security",
    image: VJ_IMAGES.mikrotik,
    explore: "/services",
    links: [
      { name: "Vessel IT & Networking", path: "/services" },
      { name: "Firewall & Cybersecurity", path: "/services" },
      { name: "Crew Wi-Fi & Captive Portal", path: "/services" },
      { name: "Onshore IT & CCTV", path: "/services" },
    ],
  },
  {
    id: "ot",
    label: "Operational Technologies",
    kicker: "OPERATIONAL TECHNOLOGIES",
    title: "CCTV, monitoring & compliance",
    image: "https://images.unsplash.com/photo-1589935447067-5531094415d1?crop=entropy&cs=srgb&fm=jpg&q=85",
    explore: "/services",
    links: [
      { name: "Marine CCTV & Security", path: "/services" },
      { name: "Commissioning & Testing", path: "/services" },
      { name: "GMDSS Compliance", path: "/services" },
      { name: "Remote Monitoring", path: "/support" },
    ],
  },
  {
    id: "crew",
    label: "Crew Engagement",
    kicker: "CREW ENGAGEMENT",
    title: "Crew welfare & communications",
    image: "https://images.pexels.com/photos/3582597/pexels-photo-3582597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    explore: "/services",
    links: [
      { name: "Crew Wi-Fi with Quotas", path: "/services" },
      { name: "VoIP & Calling", path: "/services" },
      { name: "24/7 Support Desk", path: "/support" },
      { name: "Request Attendance", path: "/quote" },
    ],
  },
  {
    id: "all",
    label: "All Solutions",
    kicker: "ALL SOLUTIONS",
    title: "The complete capability stack",
    image: VJ_IMAGES.hero,
    explore: "/services",
    links: [
      { name: "Services Overview", path: "/services" },
      { name: "Coverage", path: "/coverage" },
      { name: "Intelligence Feed", path: "/news" },
      { name: "Careers", path: "/careers" },
    ],
  },
];

export function BrandMark({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <span className="inline-flex items-center rounded-lg bg-white px-3 py-2">
        <img src="/assets/vj-logo.png" alt="VJ Technical Solutions" className="h-9 w-auto" />
      </span>
    );
  }
  return <img src="/assets/vj-logo.png" alt="VJ Technical Solutions" className="h-11 w-auto" />;
}

export default function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(MEGA[0].id);
  const active = MEGA.find((c) => c.id === activeCat) ?? MEGA[0];

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-[#e2ebf3] bg-white/90 shadow-[0_4px_18px_rgba(8,29,53,0.06)] backdrop-blur-xl"
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" data-testid="nav-brand-logo" aria-label="VJ Technical Solutions home">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <button
            data-testid="nav-link-solutions"
            aria-expanded={megaOpen}
            onMouseEnter={() => setMegaOpen(true)}
            onClick={() => setMegaOpen((o) => !o)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
              megaOpen ? "bg-[#edf5fc] text-[#0876d1]" : "text-[#132f53] hover:bg-[#edf5fc] hover:text-[#0876d1]"
            }`}
          >
            Solutions
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`} />
          </button>
          {LINKS.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              data-testid={l.testid}
              onMouseEnter={() => setMegaOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2.5 text-sm font-bold transition-colors ${
                  isActive ? "bg-[#edf5fc] text-[#0876d1]" : "text-[#132f53] hover:bg-[#edf5fc] hover:text-[#0876d1]"
                }`
              }
            >
              {l.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/quote"
            data-testid="nav-cta-quote"
            className="hidden h-11 items-center rounded-lg bg-[#075db1] px-5 text-sm font-bold text-white transition-colors hover:bg-[#064d93] sm:inline-flex"
          >
            Request Service
          </Link>

          <Sheet>
            <SheetTrigger
              data-testid="mobile-menu-button"
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#dce6ef] text-[#071c38] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="overflow-y-auto border-[#dce6ef] bg-white">
              <div className="mt-8 flex flex-col gap-1">
                <p className="px-4 pb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#61758b]">Solutions</p>
                {MEGA[0].links.map((l) => (
                  <SheetClose key={l.path} render={<NavLink to={l.path} />}>
                    <span className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-[#132f53] hover:bg-[#edf5fc] hover:text-[#0876d1]">
                      {l.name}
                    </span>
                  </SheetClose>
                ))}
                <div className="my-3 border-t border-[#e2ebf3]" />
                {LINKS.map((l) => (
                  <SheetClose key={l.path} render={<NavLink to={l.path} />}>
                    <span className="block rounded-lg px-4 py-3 text-base font-bold text-[#132f53] hover:bg-[#edf5fc] hover:text-[#0876d1]">
                      {l.name}
                    </span>
                  </SheetClose>
                ))}
                <SheetClose render={<NavLink to="/quote" />}>
                  <span className="mt-2 block rounded-lg bg-[#075db1] px-4 py-3 text-center text-base font-bold text-white">
                    Request Service
                  </span>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {megaOpen && (
        <div className="absolute inset-x-0 top-full hidden lg:block" data-testid="mega-menu">
          <div className="mx-auto max-w-5xl px-5 pt-2 lg:px-8">
            <div className="grid grid-cols-[240px_1fr] overflow-hidden rounded-2xl border border-[#dce6ef] bg-white shadow-[0_24px_70px_rgba(7,28,56,0.18)]">
              <div className="flex flex-col gap-1 bg-[#f5f8fb] p-3">
                {MEGA.map((c) => (
                  <button
                    key={c.id}
                    data-testid={`mega-cat-${c.id}`}
                    onMouseEnter={() => setActiveCat(c.id)}
                    onClick={() => setActiveCat(c.id)}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-left text-sm font-bold transition-colors ${
                      c.id === activeCat ? "bg-[#0876d1] text-white" : "text-[#132f53] hover:bg-[#eaf4ff]"
                    }`}
                  >
                    {c.label}
                    <span className={c.id === activeCat ? "text-white" : "text-[#0876d1]"}>›</span>
                  </button>
                ))}
                <Link
                  to="/services"
                  data-testid="mega-view-all"
                  onClick={() => setMegaOpen(false)}
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-[#0876d1] px-4 py-2.5 text-sm font-bold text-[#0876d1] transition-colors hover:bg-[#0876d1] hover:text-white"
                >
                  View All <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="p-6" key={active.id}>
                <div className="overflow-hidden rounded-xl">
                  <img src={active.image} alt={active.title} className="h-48 w-full object-cover" />
                </div>
                <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#0876d1]">{active.kicker}</p>
                <h3 className="mt-1 font-heading text-lg font-bold text-[#071c38]">{active.title}</h3>
                <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
                  {active.links.map((l) => (
                    <Link
                      key={l.name}
                      to={l.path}
                      data-testid={`mega-link-${l.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      onClick={() => setMegaOpen(false)}
                      className="group inline-flex items-center gap-2 text-sm font-bold text-[#132f53] transition-colors hover:text-[#0876d1]"
                    >
                      <span className="text-[#0876d1]">›</span> {l.name}
                    </Link>
                  ))}
                </div>
                <Link
                  to={active.explore}
                  data-testid={`mega-explore-${active.id}`}
                  onClick={() => setMegaOpen(false)}
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[#0876d1] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0563b4]"
                >
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
