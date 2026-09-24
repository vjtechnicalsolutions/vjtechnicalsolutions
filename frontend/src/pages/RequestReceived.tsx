import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function RequestReceived() {
  const [params] = useSearchParams();
  const ref = params.get("ref");

  return (
    <main className="min-h-screen bg-[#f5f8fb] px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-[#dce6ef] bg-white p-8 text-center shadow-[0_18px_60px_rgba(7,31,55,0.10)] sm:p-12">
          <img
            src="/vjtechnicalsolutions/assets/vj-new-logo.jpg"
            alt="VJ Technical Solutions"
            className="mx-auto h-16 w-auto object-contain"
          />

          <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdf4]">
            <CheckCircle2 className="h-9 w-9 text-[#15803d]" />
          </div>

          <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#0876d1]">
            Request Received
          </p>
          <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-[#071c38] sm:text-4xl">
            Thank you for contacting VJ Technical Solutions
          </h1>

          <div className="mx-auto mt-6 max-w-md rounded-xl border border-[#bfdbfe] bg-[#eaf4ff] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#61758b]">
              Request Reference
            </p>
            <p className="mt-2 font-mono text-2xl font-bold text-[#071c38]">
              {ref || "Reference pending"}
            </p>
          </div>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-[#334e68]">
            Your vessel attendance request has been received successfully.
            Our technical team will review the details and respond within 4 business hours.
          </p>

          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border border-[#dce6ef] bg-[#f8fafc] p-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#0876d1]" />
              <div>
                <p className="text-sm font-bold text-[#071c38]">Confirmation email</p>
                <p className="mt-1 text-xs leading-relaxed text-[#61758b]">
                  Acknowledgement with your submitted request details has been sent to your email.
                </p>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-[#dce6ef] bg-[#f8fafc] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0876d1]" />
              <div>
                <p className="text-sm font-bold text-[#071c38]">Request logged</p>
                <p className="mt-1 text-xs leading-relaxed text-[#61758b]">
                  Please keep your reference number for future communication.
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex rounded-lg bg-[#0876d1] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#0563b4]"
          >
            Return to VJ Technical Solutions
          </Link>

          <p className="mt-6 text-xs text-[#61758b]">
            VJ Technical Solutions · Keeping Vessels Connected, Operational, and Technically Ready
          </p>
        </div>
      </div>
    </main>
  );
}
