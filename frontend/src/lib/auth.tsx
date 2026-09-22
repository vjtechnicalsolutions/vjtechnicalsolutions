import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface AuthUser {
  user_id: string;
  email: string;
  name: string;
  picture?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  setUser: (u: AuthUser | null) => void;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  setUser: () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const check = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (!res.ok) throw new Error("not authenticated");
      setUser((await res.json()) as AuthUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // CRITICAL: returning from OAuth callback — AuthCallback exchanges session_id first.
    if (window.location.hash?.includes("session_id=")) {
      setLoading(false);
      return;
    }
    void check();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, refresh: check }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
