import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Anchor, CheckCircle2, ClipboardCheck, Plane, Send, Ship } from "lucide-react";
import { FadeUp } from "@/components/Reveal";

interface Ticket {
  id: string;
  ticket_ref: string;
  priority: string;
  status: string;
  subject: string;
}

const ATTENDANCE_TYPES = [
  { id: "Scheduled Port Call", label: "Scheduled Port Call", note: "Engineer meets the vessel alongside — planned work" },
  { id: "Emergency Flyaway", label: "Emergency Flyaway", note: "Rapid dispatch with pre-configured kit to the next port" },
  { id: "Dry-dock / Refit", label: "Dry-dock / Refit", note: "Multi-day attendance during yard periods" },
  { id: "Voyage Ride-along", label: "Voyage Ride-along", note: "Engineer sails with the vessel for underway work" },
];

const STEPS = [
  { n: "01", title: "Share the details", text: "Vessel name, IMO, port and your preferred dates — that is all we need to start." },
  { n: "02", title: "We confirm fast", text: "Engineer, tools and spare kit confirmed within 4 business hours." },
  { n: "03", title: "Attendance on board", text: "Our engineer is at the gangway on time with calibrated test equipment." },
  { n: "04", title: "Report & handover", text: "Test results, photos and a signed service report before we leave." },
];

const EMPTY = { name: "", email: "", vessel_name: "", imo: "", priority: "Scheduled Port Call", subject: "", description: "" };

export default function Support() {
  const [form, setForm] = useState(EMPTY);
  const [done, setDone] = useState<Ticket | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const key = "vjtechnicalsolutions_next_ticket";
      const current = Number(localStorage.getItem(key) || "1");
      const ticketNumber = Math.max(1, current);
      localStorage.setItem(key, String(ticketNumber + 1));
      const ticketRef = "VJ-" + String(ticketNumber).padStart(5, "0");

      const iframeName = "formsubmit_" + Date.now();
      const iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const submitForm = document.createElement("form");
      submitForm.method = "POST";
      submitForm.action = "https://formsubmit.co/2828c207e9f03020f6a8c251a774e6ce";
      submitForm.target = iframeName;
      submitForm.style.display = "none";

      const fields = {
        ...form,
        _subject: "New VJ Technical Solutions Vessel Attendance Request",
        _replyto: form.email,
        _template: "table",
        _url: "https://vjtechnicalsolutions.github.io/vjtechnicalsolutions/support",
        _autoresponse: `VJ Technical Solutions – Request Received

Dear Customer,

Thank you for contacting VJ Technical Solutions.

We have received your vessel attendance request.

Request Reference: ${ticketRef}

Our team will review your request and respond within 4 business hours.

Best Regards,

VJ Technical Solutions

Keeping Vessels Connected, Operational, and Technically Ready`,
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = String(value ?? "");
        submitForm.appendChild(input);
      });

      document.body.appendChild(submitForm);
      submitForm.submit();
      setTimeout(() => {
        submitForm.remove();
        iframe.remove();
      }, 5000);

      return { id: crypto.randomUUID(), ticket_ref: ticketRef, priority: form.priority, status: "received", subject: form.subject } as Ticket;
    },
    onSuccess: (t) => {
      setDone(t);
      toast.success(`Attendance request ${t.ticket_ref} sent to VJ Technical Solutions.`);
    },
    onError: () => toast.error("Could not send the request. Please try again or email info.vjtechnicalsolutions@gmail.com."),
  });

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">Vessel Attendance</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Engineers on board, wherever you berth.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#61758b]">
              We are a field team, not a call centre. Our work is hands-on vessel attendance — installation,
              repair, fault-finding and commissioning, done on board at your port of call.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <FadeUp>
          <div className="rounded-2xl border border-[#dce6ef] bg-white p-8 shadow-[0_8px_28px_rgba(7,31,55,0.05)]">
            <Ship className="h-8 w-8 text-[#0876d1]" />
            <h2 className="mt-5 font-heading text-xl font-bold text-[#071c38]">How attendance works</h2>
            <ol className="mt-6 space-y-5">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="font-heading text-2xl font-extrabold text-outline-light">{s.n}</span>
                  <div>
                    <p className="text-sm font-bold text-[#071c38]">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#61758b]">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#bfdbfe] bg-[#eaf4ff] p-4">
              <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0876d1]" />
              <p className="text-xs leading-relaxed text-[#334e68]">
                Every attendance ends with a signed service report — link tests, spares used and photos.{" "}
                <a href="/assets/VJ-Sample-Service-Report.pdf" download className="font-bold text-[#0876d1] underline" data-testid="attendance-report-download">
                  Sample report
                </a>{" "}
                ·{" "}
                <a href="/assets/VJ-Blank-Service-Report-Delivery-Order.pdf" download className="font-bold text-[#0876d1] underline" data-testid="blank-forms-download">
                  Blank forms (PDF)
                </a>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#dce6ef] bg-white p-8 shadow-[0_8px_28px_rgba(7,31,55,0.05)]">
            <h2 className="font-heading text-xl font-bold text-[#071c38]">Attendance types</h2>
            <ul className="mt-5 space-y-3">
              {ATTENDANCE_TYPES.map((t) => (
                <li key={t.id} className="flex items-start gap-3 rounded-lg border border-[#dce6ef] bg-[#f5f8fb] p-4">
                  {t.id === "Emergency Flyaway" ? (
                    <Plane className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
                  ) : t.id === "Dry-dock / Refit" ? (
                    <Anchor className="mt-0.5 h-5 w-5 shrink-0 text-[#0876d1]" />
                  ) : (
                    <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0876d1]" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-[#071c38]">{t.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#61758b]">{t.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          {done ? (
            <div className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-10 text-center" data-testid="support-ticket-success">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#15803d]" />
              <h3 className="mt-5 font-heading text-2xl font-bold text-[#071c38]">Attendance request {done.ticket_ref} logged</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#334e68]">
                Our team has received your vessel attendance request. We will respond to info.vjtechnicalsolutions@gmail.com within 4 business hours.
              </p>
              <button
                data-testid="support-ticket-new-button"
                onClick={() => { setDone(null); setForm(EMPTY); }}
                className="mt-7 rounded-lg border border-[#0876d1] px-6 py-3 text-sm font-bold text-[#0876d1] transition-colors hover:bg-[#0876d1] hover:text-white"
              >
                Request another attendance
              </button>
            </div>
          ) : (
            <form
              data-testid="support-ticket-form"
              className="rounded-2xl border border-[#dce6ef] bg-white p-6 shadow-[0_12px_38px_rgba(7,31,55,0.08)] sm:p-8"
              onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
            >
              <h2 className="font-heading text-xl font-bold text-[#071c38]">Request vessel attendance</h2>
              <p className="mt-1.5 text-sm text-[#61758b]">Tell us where the vessel will be and what needs doing.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input className="vj-input" data-testid="ticket-name-input" placeholder="Your Name *" required value={form.name} onChange={set("name")} />
                <input className="vj-input" data-testid="ticket-email-input" type="email" placeholder="Email *" required value={form.email} onChange={set("email")} />
                <input className="vj-input" data-testid="ticket-vessel-input" placeholder="Vessel Name" value={form.vessel_name} onChange={set("vessel_name")} />
                <input className="vj-input" data-testid="ticket-imo-input" placeholder="IMO Number" value={form.imo} onChange={set("imo")} />
                <select className="vj-input sm:col-span-2" data-testid="ticket-priority-select" value={form.priority} onChange={set("priority")} aria-label="Attendance type">
                  {ATTENDANCE_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
                <input className="vj-input sm:col-span-2" data-testid="ticket-subject-input" placeholder="Port / location & preferred dates *" required value={form.subject} onChange={set("subject")} />
                <textarea className="vj-input sm:col-span-2" data-testid="ticket-description-input" rows={5} placeholder="Describe the job — installation, repair, fault symptoms, equipment involved *" required value={form.description} onChange={set("description")} />
              </div>
              <button
                type="submit"
                data-testid="support-ticket-submit-button"
                disabled={mutation.isPending}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#0876d1] px-7 py-4 text-sm font-bold text-white transition-all hover:bg-[#0563b4] hover:shadow-[0_0_28px_rgba(8,118,209,0.35)] disabled:opacity-60 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {mutation.isPending ? "Sending…" : "Request Attendance"}
              </button>
            </form>
          )}
        </FadeUp>
      </section>
    </>
  );
}
