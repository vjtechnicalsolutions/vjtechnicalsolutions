import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { BrandMark } from "./Header";

const SYSTEMS_LINKS = ["Starlink Maritime LEO", "Eutelsat OneWeb", "KVH TracPhone VSAT", "Iridium Certus 700", "Inmarsat FleetBroadband"];
const SERVICE_LINKS = ["Vessel IT & Networking", "CCTV & Security", "Firewall & Cybersecurity", "Installation & Repair", "Remote Support"];

export default function Footer() {
  return (
    <footer className="bg-[#041222]">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className="select-none font-heading text-[13vw] font-extrabold leading-none tracking-tight text-outline-dark sm:text-7xl lg:text-8xl">
          VJ TECHNICAL
        </p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-[#5bb7f5]">
          Engineering zero-dropout maritime satellite arrays globally
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-4">
          <div>
            <BrandMark dark />
            <p className="mt-5 text-sm leading-relaxed text-[#b9cad8]">
              Maritime &amp; onshore technical services for connectivity, vessel IT, networking and field support.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">Systems</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#b9cad8]">
              {SYSTEMS_LINKS.map((s) => (
                <li key={s}>
                  <Link to="/services" className="transition-colors hover:text-[#5bb7f5]">{s}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#b9cad8]">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <Link to="/services" className="transition-colors hover:text-[#5bb7f5]">{s}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white">Operations</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#b9cad8]">
              <li>
                <a href="mailto:info@vjtechnicalsolutions.com" className="inline-flex items-center gap-2 text-white transition-colors hover:text-[#5bb7f5]">
                  <Mail className="h-3.5 w-3.5" /> info@vjtechnicalsolutions.com
                </a>
              </li>
              <li><Link to="/support" className="transition-colors hover:text-[#5bb7f5]">24/7 Support Desk</Link></li>
              <li><Link to="/quote" className="transition-colors hover:text-[#5bb7f5]">Request Vessel Attendance</Link></li>
              <li><Link to="/admin" className="transition-colors hover:text-[#5bb7f5]">NOC Admin Portal</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[#203346] pt-6 text-center font-mono text-xs text-[#7d99b5]">
          © 2026 VJ Technical Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
