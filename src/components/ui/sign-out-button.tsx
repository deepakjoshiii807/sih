import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

import { useAuth } from "@/lib/django-auth";
import { cn } from "@/lib/utils";

/**
 * Sidebar "Log out" button used by all four dashboards. Clears the Django JWT
 * session and returns to /login.
 */
export function SignOutButton({ open }: { open: boolean }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const handleSignOut = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await signOut();
      navigate("/login", { replace: true });
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={busy}
      className={cn(
        "flex items-center gap-3 w-full rounded-xl text-[#6B6F68] text-xs font-medium",
        "hover:bg-[#EDEBE0] hover:text-[#171A18] transition-colors",
        busy && "opacity-60",
        open ? "px-3 py-2" : "px-0 py-2 justify-center",
      )}
    >
      {busy ? <Loader2 size={16} className="animate-spin" /> : <LogOut size={16} />}
      {open && "Log out"}
    </button>
  );
}
