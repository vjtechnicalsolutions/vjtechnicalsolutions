import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Send } from "lucide-react";
import { SYSTEM_OPTIONS } from "@/lib/site";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  system: string;
  status: string;
  created_at: string;
}

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  vessel_name: "",
  imo: "",
  port: "",
  service_date: "",
  system: "",
  message: "",
};

export default function EnquiryForm() {
  const [form, setForm] = useState(EMPTY);
  const [done, setDone] = useState<Enquiry | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const key = "vjtechnicalsolutions_next_ticket";
      const current = Number(localStorage.getItem(key) || "1");
      const ticketNumber = Math.max(1, current);
      localStorage.setItem(key, String(ticketNumber + 1));
      const ticketRef = "VJ-" + String(ticketNumber).padStart(5, "0");

      const submitForm = document.createElement("form");
      submitForm.method = "POST";
      submitForm.action = "https://formsubmit.co/2828c207e9f03020f6a8c251a774e6ce";
      submitForm.style.display = "none";

      const fields = {
        ...form,
        service_date: form.service_date || "",
        _subject: "New VJ Technical Solutions Vessel Attendance Request",
        _replyto: form.email,
        _template: "table",
        _url: "https://vjtechnicalsolutions.github.io/vjtechnicalsolutions/quote",
        _next: `https://vjtechnicalsolutions.github.io/vjtechnicalsolutions/request-received?ref=${encodeURIComponent(ticketRef)}`,
        _autoresponse: `VJ Technical Solutions – Request Received

Dear Customer,

Thank you for contacting VJ Technical Solutions.

We have received your vessel attendance request.

Request Reference: ${ticketRef}

Customer Details
Contact Person: ${form.name}
Email: ${form.email}
Phone / WhatsApp: ${form.phone}

Vessel Details
Vessel Name: ${form.vessel_name}
IMO Number: ${form.imo}
Port / Location: ${form.port}
Requested Date: ${form.service_date || "Not specified"}
System: ${form.system}

Required Work
${form.message}

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

      return { id: ticketRef, name: form.name, email: form.email, system: form.system, status: "received", created_at: new Date().toISOString() } as Enquiry;
    },
    onSuccess: (data) => {
      setDone(data);
      toast.success("Service request sent to VJ Technical Solutions.");
    },
    onError: () => toast.error("Could not send the request. Please try again or email info.vjtechnicalsolutions@gmail.com."),
  });

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  if (done) {
    return (
      <div className="rounded-2xl border border-[#bbf7d0] bg-[#f0fdf4] p-10 text-center" data-testid="quote-form-success">
        <CheckCircle2 className="mx-auto h-12 w-12 text-[#15803d]" />
        <h3 className="mt-5 font-heading text-2xl font-bold text-[#071c38]">Request logged — reference {done.id}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#334e68]">
          Our team has received your vessel attendance request. We will respond to info.vjtechnicalsolutions@gmail.com within 4 business hours.
        </p>
        <button
          data-testid="quote-form-new-button"
          onClick={() => { setDone(null); setForm(EMPTY); }}
          className="mt-7 rounded-lg border border-[#0876d1] px-6 py-3 text-sm font-bold text-[#0876d1] transition-colors hover:bg-[#0876d1] hover:text-white"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      data-testid="quote-enquiry-form"
      className="rounded-2xl border border-[#dce6ef] bg-white p-6 shadow-[0_12px_38px_rgba(7,31,55,0.08)] sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="vj-input" data-testid="quote-form-name-input" placeholder="Contact Person *" required value={form.name} onChange={set("name")} />
        <input className="vj-input" data-testid="quote-form-email-input" type="email" placeholder="Email *" required value={form.email} onChange={set("email")} />
        <input className="vj-input" data-testid="quote-form-vessel-input" placeholder="Vessel Name" value={form.vessel_name} onChange={set("vessel_name")} />
        <input className="vj-input" data-testid="quote-form-imo-input" placeholder="IMO Number" value={form.imo} onChange={set("imo")} />
        <input className="vj-input" data-testid="quote-form-port-input" placeholder="Port / Location" value={form.port} onChange={set("port")} />
        <input className="vj-input" data-testid="quote-form-phone-input" placeholder="Phone / WhatsApp" value={form.phone} onChange={set("phone")} />
        <select className="vj-input" data-testid="quote-form-system-select" required value={form.system} onChange={set("system")}>
          <option value="" disabled>Select System *</option>
          {SYSTEM_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input className="vj-input" data-testid="quote-form-date-input" type="date" value={form.service_date} onChange={set("service_date")} aria-label="Required date" />
        <textarea
          className="vj-input sm:col-span-2"
          data-testid="quote-form-message-input"
          rows={5}
          placeholder="Describe the issue / required work *"
          required
          value={form.message}
          onChange={set("message")}
        />
      </div>
      <button
        type="submit"
        data-testid="quote-form-submit-button"
        disabled={mutation.isPending}
        className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#0876d1] px-7 py-4 text-sm font-bold text-white transition-all hover:bg-[#0563b4] hover:shadow-[0_0_28px_rgba(8,118,209,0.35)] disabled:opacity-60 sm:w-auto"
      >
        <Send className="h-4 w-4" />
        {mutation.isPending ? "Transmitting…" : "Submit Service Request"}
      </button>
    </form>
  );
}
