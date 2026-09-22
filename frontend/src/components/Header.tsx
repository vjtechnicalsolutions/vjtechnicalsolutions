import { Link, NavLink } from "react-router-dom";
import { Menu, Lock } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

const LINKS = [
  { name: "Services", path: "/services", testid: "nav-link-services" },
  { name: "Coverage & Plans", path: "/coverage", testid: "nav-link-coverage" },
  { name: "About", path: "/about", testid: "nav-link-about" },
  { name: "Intelligence", path: "/news", testid: "nav-link-news" },
  { name: "Support", path: "/support", testid: "nav-link-support" },
];

export function BrandMark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span className="relative block h-10 w-11" aria-hidden>
        <span className="absolute left-0 top-1.5 h-6 w-10 -rotate-[15deg] rounded-full border-4 border-[#0876d1] border-t-transparent border-r-transparent" />
        <span className="absolute left-2 top-3.5 h-5 w-8 -rotate-[15deg] rounded-full border-[3px] border-[#1388e5] border-t-transparent border-r-transparent" />
      </span>
      <span className="leading-none">
        <span className={`block font-heading text-[15px] font-extrabold tracking-tight ${dark ? "text-white" : "text-[#071c38]"}`}>
          VJ TECHNICAL
        </span>
        <span className={`block font-heading text-[15px] font-extrabold tracking-tight ${dark ? "text-white" : "text-[#071c38]"}`}>
          SOLUTIONS
        </span>
        <span className={`mt-1 block font-mono text-[8px] font-semibold tracking-[0.2em] ${dark ? "text-[#7d99b5]" : "text-[#597086]"}`}>
          MARITIME | CONNECT | SUPPORT
        </span>
      </span>
    </span>
  );
}

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e2ebf3] bg-white/90 shadow-[0_4px_18px_rgba(8,29,53,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" data-testid="nav-brand-logo" aria-label="VJ Technical Solutions home">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.path}
              to={l.path}
              data-testid={l.testid}
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
            to="/admin"
            data-testid="nav-admin-link"
            aria-label="NOC admin portal"
            className="hidden h-11 w-11 items-center justify-center rounded-lg border border-[#dce6ef] text-[#61758b] transition-colors hover:border-[#0876d1] hover:text-[#0876d1] sm:flex"
          >
            <Lock className="h-4 w-4" />
          </Link>
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
            <SheetContent side="right" className="border-[#dce6ef] bg-white">
              <div className="mt-8 flex flex-col gap-2">
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
                <SheetClose render={<NavLink to="/admin" />}>
                  <span className="block rounded-lg px-4 py-3 text-sm font-semibold text-[#61758b]">
                    NOC Admin Portal
                  </span>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
