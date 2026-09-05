import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";

/** Shown while a dashboard fetches its data from the API. */
export function DashboardLoader({ label = "Loading your dashboard…" }: { label?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6F0]">
      <div className="flex flex-col items-center gap-3 text-[#6B6F68]">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="font-mono text-xs tracking-widest uppercase">{label}</span>
      </div>
    </div>
  );
}

/** Shown when the API call fails (e.g. backend unreachable). */
export function DashboardError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F6F0] px-6">
      <div className="max-w-md rounded-2xl border border-[#E8C7AE] bg-white p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0E8DD]">
          <AlertTriangle className="h-5 w-5 text-[#7a3f1a]" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-[#171A18]">Couldn't load your workspace</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#6B6F68]">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#244B35] px-4 py-2.5 text-sm font-semibold text-[#DCE6D0] transition-all hover:opacity-90"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        )}
      </div>
    </div>
  );
}
