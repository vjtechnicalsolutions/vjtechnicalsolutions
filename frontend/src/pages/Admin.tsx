import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { LogOut, RefreshCw, Inbox, LifeBuoy, Loader2, CheckCheck, Undo2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { FadeUp } from "@/components/Reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  vessel_name: string | null;
  imo: string | null;
  port: string | null;
  system: string;
  message: string;
  status: string;
  created_at: string;
}

interface Ticket {
  id: string;
  ticket_ref: string;
  name: string;
  email: string;
  vessel_name: string | null;
  priority: string;
  subject: string;
  description: string;
  status: string;
  created_at: string;
}

async function authedGet<T,>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`, { credentials: "include" });
  if (!res.ok) throw new Error(`request failed with ${res.status}`);
  return (await res.json()) as T;
}

function statusBadge(s: string): string {
  if (s === "RESOLVED") return "bg-[#e7f6ee] text-[#15803d]";
  if (s === "IN_PROGRESS") return "bg-[#eaf4ff] text-[#0876d1]";
  return "bg-[#fffbeb] text-[#b45309]";
}

export default function Admin() {
  const { user, loading, setUser } = useAuth();
  const queryClient = useQueryClient();

  const enquiries = useQuery({ queryKey: ["admin-enquiries"], queryFn: () => authedGet<Enquiry[]>("/enquiries"), enabled: !!user, retry: false });
  const tickets = useQuery({ queryKey: ["admin-tickets"], queryFn: () => authedGet<Ticket[]>("/tickets"), enabled: !!user, retry: false });

  const statusMutation = useMutation({
    mutationFn: async ({ kind, id, status }: { kind: "enquiries" | "tickets"; id: string; status: string }) => {
      const res = await fetch(`/api/${kind}/${id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(`status update failed with ${res.status}`);
      return res.json();
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: [`admin-${vars.kind}`] });
      toast.success(`Marked as ${vars.status === "RESOLVED" ? "resolved" : "reopened"}.`);
    },
    onError: () => toast.error("Status update failed."),
  });

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  const actionButton = (kind: "enquiries" | "tickets", id: string, status: string, testid: string) =>
    status === "RESOLVED" ? (
      <button
        data-testid={`${testid}-reopen`}
        onClick={() => statusMutation.mutate({ kind, id, status: kind === "enquiries" ? "NEW" : "OPEN" })}
        disabled={statusMutation.isPending}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#dce6ef] px-3 py-1.5 text-xs font-bold text-[#61758b] transition-colors hover:border-[#0876d1] hover:text-[#0876d1] disabled:opacity-50"
      >
        <Undo2 className="h-3.5 w-3.5" /> Reopen
      </button>
    ) : (
      <button
        data-testid={`${testid}-resolve`}
        onClick={() => statusMutation.mutate({ kind, id, status: "RESOLVED" })}
        disabled={statusMutation.isPending}
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0876d1] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#0563b4] disabled:opacity-50"
      >
        <CheckCheck className="h-3.5 w-3.5" /> Resolve
      </button>
    );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-[76px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0876d1]" />
      </div>
    );
  }

  if (!user) {
    return (
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f8fb] px-5 pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <FadeUp className="relative w-full max-w-md">
          <div className="rounded-2xl border border-[#dce6ef] bg-white p-10 text-center shadow-[0_16px_48px_rgba(7,31,55,0.1)]" data-testid="admin-login-panel">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">NOC Admin Portal</p>
            <h1 className="mt-4 font-heading text-2xl font-bold text-[#071c38]">Restricted to VJ operations staff</h1>
            <p className="mt-3 text-sm leading-relaxed text-[#61758b]">
              Sign in with your Google account to view incoming service enquiries and support tickets.
            </p>
            <button
              data-testid="admin-google-signin-button"
              onClick={() => {
                // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
                const redirectUrl = window.location.origin + "/admin";
                window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
              }}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-lg border border-[#ccd9e4] bg-white px-6 py-4 text-sm font-bold text-[#102d52] shadow-sm transition-all hover:shadow-md"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81Z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24Z"/>
                <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.98-3.1Z"/>
                <path fill="#EA4335" d="M12 4.76c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.1C6.22 6.87 8.87 4.76 12 4.76Z"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        </FadeUp>
      </section>
    );
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-5 pb-24 pt-[120px] lg:px-8" data-testid="admin-dashboard">
      <FadeUp>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">Mission Control</p>
            <h1 className="mt-2 font-heading text-3xl font-extrabold text-[#071c38]">Operations Board</h1>
            <p className="mt-1 text-sm text-[#61758b]">
              Signed in as <span className="font-semibold text-[#071c38]">{user.name || user.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            {user.picture && <img src={user.picture} alt="" className="h-10 w-10 rounded-full border border-[#dce6ef]" />}
            <button
              data-testid="admin-refresh-button"
              onClick={() => { enquiries.refetch(); tickets.refetch(); }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#dce6ef] text-[#61758b] transition-colors hover:border-[#0876d1] hover:text-[#0876d1]"
              aria-label="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              data-testid="admin-logout-button"
              onClick={logout}
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#dce6ef] px-4 text-sm font-bold text-[#61758b] transition-colors hover:border-[#dc2626] hover:text-[#dc2626]"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-10">
        <Tabs defaultValue="enquiries">
          <TabsList data-testid="admin-view-toggle" className="bg-[#eaf4ff]">
            <TabsTrigger value="enquiries" data-testid="admin-tab-enquiries" className="inline-flex items-center gap-2">
              <Inbox className="h-4 w-4" /> Enquiries
              {enquiries.data && <span className="rounded-full bg-[#0876d1] px-2 py-0.5 text-[10px] font-bold text-white">{enquiries.data.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="tickets" data-testid="admin-tab-tickets" className="inline-flex items-center gap-2">
              <LifeBuoy className="h-4 w-4" /> Tickets
              {tickets.data && <span className="rounded-full bg-[#0876d1] px-2 py-0.5 text-[10px] font-bold text-white">{tickets.data.length}</span>}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="enquiries" className="mt-6">
            {enquiries.isLoading && <p className="py-10 text-center text-sm text-[#61758b]">Loading enquiries…</p>}
            {enquiries.isError && <p className="py-10 text-center text-sm text-[#dc2626]" data-testid="admin-enquiries-error">Could not load enquiries.</p>}
            {enquiries.data && enquiries.data.length === 0 && (
              <p className="rounded-xl border border-dashed border-[#b6c7d6] py-14 text-center text-sm text-[#61758b]" data-testid="admin-enquiries-empty">
                No service enquiries yet — submissions from the Request Service form land here.
              </p>
            )}
            {enquiries.data && enquiries.data.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-[#dce6ef] bg-white" data-testid="admin-enquiries-table">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#dce6ef] bg-[#f5f8fb]">
                      <TableHead className="text-[#61758b]">Received</TableHead>
                      <TableHead className="text-[#61758b]">Contact</TableHead>
                      <TableHead className="text-[#61758b]">Vessel / IMO</TableHead>
                      <TableHead className="text-[#61758b]">System</TableHead>
                      <TableHead className="text-[#61758b]">Message</TableHead>
                      <TableHead className="text-[#61758b]">Status</TableHead>
                      <TableHead className="text-[#61758b]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enquiries.data.map((e) => (
                      <TableRow key={e.id} className="border-[#dce6ef]" data-testid={`enquiry-row-${e.id}`}>
                        <TableCell className="whitespace-nowrap font-mono text-xs text-[#61758b]">{format(new Date(e.created_at), "dd MMM HH:mm")}</TableCell>
                        <TableCell>
                          <p className="text-sm font-semibold text-[#071c38]">{e.name}</p>
                          <p className="text-xs text-[#61758b]">{e.email}{e.phone ? ` · ${e.phone}` : ""}</p>
                        </TableCell>
                        <TableCell className="text-sm text-[#102d52]">{e.vessel_name || "—"}{e.imo ? ` / ${e.imo}` : ""}</TableCell>
                        <TableCell className="text-sm font-semibold text-[#0876d1]">{e.system}</TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-[#61758b]" title={e.message}>{e.message}</TableCell>
                        <TableCell>
                          <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold ${statusBadge(e.status)}`}>{e.status}</span>
                        </TableCell>
                        <TableCell>{actionButton("enquiries", e.id, e.status, `enquiry-${e.id}`)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="tickets" className="mt-6">
            {tickets.isLoading && <p className="py-10 text-center text-sm text-[#61758b]">Loading tickets…</p>}
            {tickets.isError && <p className="py-10 text-center text-sm text-[#dc2626]" data-testid="admin-tickets-error">Could not load tickets.</p>}
            {tickets.data && tickets.data.length === 0 && (
              <p className="rounded-xl border border-dashed border-[#b6c7d6] py-14 text-center text-sm text-[#61758b]" data-testid="admin-tickets-empty">
                No support tickets yet — dispatches from the Support Desk land here.
              </p>
            )}
            {tickets.data && tickets.data.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-[#dce6ef] bg-white" data-testid="admin-tickets-table">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#dce6ef] bg-[#f5f8fb]">
                      <TableHead className="text-[#61758b]">Ref</TableHead>
                      <TableHead className="text-[#61758b]">Priority</TableHead>
                      <TableHead className="text-[#61758b]">Subject</TableHead>
                      <TableHead className="text-[#61758b]">Vessel</TableHead>
                      <TableHead className="text-[#61758b]">Reporter</TableHead>
                      <TableHead className="text-[#61758b]">Status</TableHead>
                      <TableHead className="text-[#61758b]">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.data.map((t) => (
                      <TableRow key={t.id} className="border-[#dce6ef]" data-testid={`ticket-row-${t.id}`}>
                        <TableCell className="font-mono text-xs font-bold text-[#0876d1]">{t.ticket_ref}</TableCell>
                        <TableCell>
                          <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold ${t.priority === "P1" ? "bg-[#fef2f2] text-[#dc2626]" : t.priority === "P2" ? "bg-[#fffbeb] text-[#b45309]" : "bg-[#f5f8fb] text-[#61758b]"}`}>
                            {t.priority}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-[#071c38]" title={t.subject}>{t.subject}</TableCell>
                        <TableCell className="text-sm text-[#102d52]">{t.vessel_name || "—"}</TableCell>
                        <TableCell>
                          <p className="text-sm font-semibold text-[#071c38]">{t.name}</p>
                          <p className="text-xs text-[#61758b]">{t.email}</p>
                        </TableCell>
                        <TableCell>
                          <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold ${statusBadge(t.status)}`}>{t.status}</span>
                        </TableCell>
                        <TableCell>{actionButton("tickets", t.id, t.status, `ticket-${t.id}`)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </FadeUp>
    </section>
  );
}
