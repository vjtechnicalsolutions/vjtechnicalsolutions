import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiPost } from "@/lib/api";
import { useAuth, type AuthUser } from "@/lib/auth";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;
    const sessionId = new URLSearchParams(location.hash.replace(/^#/, "")).get("session_id");
    if (!sessionId) {
      navigate("/admin", { replace: true });
      return;
    }
    (async () => {
      try {
        const user = await apiPost<AuthUser>("/auth/session", { session_id: sessionId });
        setUser(user);
        navigate("/admin", { replace: true, state: { user } });
      } catch {
        toast.error("Sign-in failed. Please try again.");
        navigate("/admin", { replace: true });
      }
    })();
  }, [location.hash, navigate, setUser]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white">
      <span className="ping-dot h-3 w-3 rounded-full bg-[#22c55e]" />
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-[#61758b]">
        Establishing secure session…
      </p>
    </div>
  );
}
