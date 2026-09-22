import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowUpRight, Clock } from "lucide-react";
import { apiGet } from "@/lib/api";
import { FALLBACK_POSTS, type Post } from "@/lib/site";
import { FadeUp } from "@/components/Reveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function News() {
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const { data, isError } = useQuery({ queryKey: ["posts"], queryFn: () => apiGet<Post[]>("/posts"), retry: false });
  const posts = !isError && data && data.length > 0 ? data : FALLBACK_POSTS;

  return (
    <>
      <section className="relative overflow-hidden border-b border-[#dce6ef] bg-[#f5f8fb] pt-[76px]">
        <div className="absolute inset-0 bg-grid-light" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-28">
          <FadeUp>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#0876d1]">Intelligence Feed</p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-tight tracking-tight text-[#071c38] sm:text-5xl">
              Signals from the fleet.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#61758b]">
              Firmware alerts, constellation changes, regulatory updates and field reports from our engineers.
              {isError && <span className="text-[#8aa0b8]"> (showing cached briefings)</span>}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8" data-testid="news-feed">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <FadeUp key={p.slug} delay={(i % 3) * 0.06}>
              <button
                data-testid={`news-card-${p.slug}`}
                onClick={() => setOpenPost(p)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#dce6ef] bg-white text-left shadow-[0_8px_28px_rgba(7,31,55,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0876d1]/50 hover:shadow-[0_16px_48px_rgba(8,118,209,0.15)]"
              >
                {p.image && (
                  <div className="overflow-hidden">
                    <img src={p.image} alt="" className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-[#0876d1] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                      {p.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#8aa0b8]">
                      <Clock className="h-3 w-3" /> {p.read_minutes} min
                    </span>
                  </div>
                  <h2 className="mt-4 font-heading text-lg font-bold leading-snug text-[#071c38]">{p.title}</h2>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[#61758b]">{p.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#0876d1]">
                    {format(new Date(p.created_at), "dd MMM yyyy")}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </FadeUp>
          ))}
        </div>
      </section>

      <Dialog open={openPost !== null} onOpenChange={(open) => !open && setOpenPost(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto border-[#dce6ef] bg-white sm:max-w-2xl" data-testid="news-article-dialog">
          {openPost && (
            <>
              {openPost.image && <img src={openPost.image} alt="" className="aspect-[16/8] w-full rounded-lg object-cover" />}
              <DialogHeader>
                <span className="w-max rounded-full bg-[#0876d1] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white">
                  {openPost.category}
                </span>
                <DialogTitle className="font-heading text-xl font-bold leading-snug text-[#071c38] sm:text-2xl">
                  {openPost.title}
                </DialogTitle>
                <DialogDescription className="font-mono text-[11px] uppercase tracking-wider text-[#8aa0b8]">
                  {format(new Date(openPost.created_at), "dd MMMM yyyy")} · {openPost.read_minutes} min read
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm leading-relaxed text-[#334e68]">
                {openPost.body.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
