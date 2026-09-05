import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import {
  apiClient,
  apiErrorMessage,
  clearTokens,
  getRefreshToken,
  refreshAccessToken,
  setTokens,
} from "./api-client";

/** Role values exactly as the Django backend stores them on User.role. */
export type ApiRole = "student" | "industry" | "academician" | "institution_admin";

export interface DjangoUser {
  id: number;
  email: string;
  name: string;
  initials: string;
  role: ApiRole;
  is_verified: boolean;
  phone: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  name: string;
  role: ApiRole;
  phone?: string;
}

interface AuthContextValue {
  /** True until the initial token → /me round-trip finishes. */
  isLoading: boolean;
  isAuthenticated: boolean;
  user: DjangoUser | null;
  signIn: (email: string, password: string) => Promise<DjangoUser>;
  signUp: (input: SignUpInput) => Promise<DjangoUser>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchMe(): Promise<DjangoUser | null> {
  try {
    const { data } = await apiClient.get<DjangoUser>("/auth/me");
    return data;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DjangoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On boot: restore session from stored tokens (refreshing if needed).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getRefreshToken() && !localStorage.getItem("l2l.access_token")) {
        if (!cancelled) setIsLoading(false);
        return;
      }
      let me = await fetchMe();
      if (!me) {
        const refreshed = await refreshAccessToken();
        if (refreshed) me = await fetchMe();
      }
      if (!cancelled) {
        setUser(me);
        if (!me) clearTokens();
        setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<DjangoUser> => {
    const { data } = await apiClient.post<{ access: string; refresh: string }>("/auth/token", {
      email: email.trim().toLowerCase(),
      password,
    });
    setTokens(data.access, data.refresh);
    const me = await fetchMe();
    setUser(me);
    return me as DjangoUser;
  }, []);

  const signUp = useCallback(async (input: SignUpInput): Promise<DjangoUser> => {
    const { data } = await apiClient.post<{ access: string; refresh: string }>("/auth/register", {
      email: input.email.trim().toLowerCase(),
      password: input.password,
      name: input.name.trim(),
      role: input.role,
      phone: input.phone ?? "",
    });
    setTokens(data.access, data.refresh);
    const me = await fetchMe();
    setUser(me);
    return me as DjangoUser;
  }, []);

  const signOut = useCallback(async () => {
    clearTokens();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading,
      isAuthenticated: !!user,
      user,
      signIn,
      signUp,
      signOut,
    }),
    [isLoading, user, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return ctx;
}

export { apiErrorMessage };
