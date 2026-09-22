import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle2, LifeBuoy, Send } from "lucide-react";
import { apiPost } from "@/lib/api";
import { FadeUp } from "@/components/Reveal";

interface Ticket {
  id: string;
  ticket_ref: string;
  priority: string;
  status: string;
  subject: string;
}

const PRIORITIES = [
  { id: "P1", label: "P1 — Vessel dead in the water", sla: "Engineer response: immediate, 24/7" },
  { id: "P2", label: "P2 — Primary link down", sla: "Engineer response: under 1 hour" },
  { id: "P3", label: "P3 — Degraded service", sla: "Engineer response: same business day" },
  { id: "P4", label: "P4 — General inquiry", sla: "Engineer response: next business day" },
];

const EMPTY = { name: "", email: "", vessel_name: "", imo: "", priority: "P3", subject: "", description: "" };

export default function Support() {
  const [form, setForm] = useState(EMPTY);
  const [done, setDone] = useState<Ticket | null>(null);

  const mutation = useMutation({
    mutationFn: () => apiPost<Ticket>("/tickets", form),
    onSuccess: (t) => {
      setDone(t);
      toast.success(`Ticket ${t.ticket_ref} dispatched to the NOC.`);
    },
    onError: () => toast.error("Could not raise the ticket. Please email info.vjtechnicalsolutions@gmail.com."),
  });

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">Support Desk</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Raise a ticket. An engineer picks it up.
            </h1>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <FadeUp>
          <div className="rounded-2xl border border-[#dce6ef] bg-white p-8 shadow-[0_8px_28px_rgba(7,31,55,0.05)]">
            <LifeBuoy className="h-8 w-8 text-[#0876d1]" />
            <h2 className="mt-5 font-heading text-xl font-bold text-[#071c38]">Response commitments</h2>
            <ul className="mt-6 space-y-4">
              {PRIORITIES.map((p) => (
                <li key={p.id} className="rounded-lg border border-[#dce6ef] bg-[#f5f8fb] p-4">
                  <p className="text-sm font-bold text-[#071c38]">{p.label}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#15803d]">{p.sla}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#fecaca] bg-[#fef2f2] p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
              <p className="text-xs leading-relaxed text-[#991b1b]">
                P1 emergencies: raise the ticket, then email{" "}
                <a href="mailto:info.vjtechnicalsolutions@gmail.com" className="underline">info.vjtechnicalsolutions@gmail.com</a>{" "}
                with the ticket reference to page the on-call engineer.
              </p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          {done ? (
            <div className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-10 text-center" data-testid="support-ticket-success">
              <CheckCircle2 className="mx-auto h-12 w-12 text-[#15803d]" />
              <h3 className="mt-5 font-heading text-2xl font-bold text-[#071c38]">Ticket {done.ticket_ref} is live</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#334e68]">
                Priority {done.priority} · Status {done.status}. Keep the reference — an engineer will reach
                out on your contact email.
              </p>
              <button
                data-testid="support-ticket-new-button"
                onClick={() => { setDone(null); setForm(EMPTY); }}
                className="mt-7 rounded-lg border border-[#0876d1] px-6 py-3 text-sm font-bold text-[#0876d1] transition-colors hover:bg-[#0876d1] hover:text-white"
              >
                Raise another ticket
              </button>
            </div>
          ) : (
            <form
              data-testid="support-ticket-form"
              className="rounded-2xl border border-[#dce6ef] bg-white p-6 shadow-[0_12px_38px_rgba(7,31,55,0.08)] sm:p-8"
              onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input className="vj-input" data-testid="ticket-name-input" placeholder="Your Name *" required value={form.name} onChange={set("name")} />
                <input className="vj-input" data-testid="ticket-email-input" type="email" placeholder="Email *" required value={form.email} onChange={set("email")} />
                <input className="vj-input" data-testid="ticket-vessel-input" placeholder="Vessel Name" value={form.vessel_name} onChange={set("vessel_name")} />
                <input className="vj-input" data-testid="ticket-imo-input" placeholder="IMO Number" value={form.imo} onChange={set("imo")} />
                <select className="vj-input sm:col-span-2" data-testid="ticket-priority-select" value={form.priority} onChange={set("priority")}>
                  {PRIORITIES.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
                <input className="vj-input sm:col-span-2" data-testid="ticket-subject-input" placeholder="Subject *" required value={form.subject} onChange={set("subject")} />
                <textarea className="vj-input sm:col-span-2" data-testid="ticket-description-input" rows={5} placeholder="Describe the fault, symptoms, and anything already tried *" required value={form.description} onChange={set("description")} />
              </div>
              <button
                type="submit"
                data-testid="support-ticket-submit-button"
                disabled={mutation.isPending}
                className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#0876d1] px-7 py-4 text-sm font-bold text-white transition-all hover:bg-[#0563b4] hover:shadow-[0_0_28px_rgba(8,118,209,0.35)] disabled:opacity-60 sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {mutation.isPending ? "Dispatching…" : "Dispatch Ticket"}
              </button>
            </form>
          )}
        </FadeUp>
      </section>
    </>
  );
}
