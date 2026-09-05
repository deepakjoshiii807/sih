import { Loader2 } from "lucide-react";
import { Navigate, useLocation } from "react-router";

import { useAuth } from "@/lib/django-auth";
import { apiRoleToProfileRole, roleHome, type ProfileRoleId } from "@/lib/profile-roles";

interface RequireRoleProps {
  /** Which product profile may view this route. */
  role: ProfileRoleId;
  children: React.ReactNode;
}

/**
 * Guards a dashboard route:
 *  - auth still restoring      -> centered spinner
 *  - signed out                -> /login?next=<current route>
 *  - signed in, wrong profile  -> that profile's own home route
 *  - signed in, correct role   -> renders children
 */
export default function RequireRole({ role, children }: RequireRoleProps) {
  const { isLoading, isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F6F0]">
        <div className="flex flex-col items-center gap-3 text-[#6B6F68]">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-mono text-xs tracking-widest uppercase">Loading workspace…</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    const next = location.pathname !== "/login" ? `?next=${encodeURIComponent(location.pathname)}` : "";
    return <Navigate to={`/login${next}`} replace />;
  }

  const profileRole = apiRoleToProfileRole(user.role);

  if (!profileRole) {
    return <Navigate to="/login" replace />;
  }

  if (profileRole !== role) {
    return <Navigate to={roleHome(profileRole)} replace />;
  }

  return <>{children}</>;
}
