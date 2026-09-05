import { useCallback, useEffect, useState, type ReactNode } from "react";

import { DashboardError, DashboardLoader } from "@/components/ui/dashboard-state";
import { apiErrorMessage, API_BASE_URL } from "@/lib/api-client";
import { subscribeDataChanged } from "@/lib/data-events";

export interface LiveDashboardProps<T> {
  /** Fetches the dashboard payload (e.g. studentApi.getDashboard). */
  load: () => Promise<T>;
  /** Writes the payload into the page module's data holders. */
  hydrate: (payload: T) => void;
  /** Loading label while the first payload arrives. */
  label?: string;
  /** The dashboard page — rendered only after the first successful load. */
  children: ReactNode;
}

type Phase =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready" };

/**
 * Route-level data driver for the four dashboards.
 *
 *  - Fetches the dashboard payload from the Django API before first paint of the
 *    page, so the UI never flashes mock seed data.
 *  - Hydrates the page's module-scope data holders, then re-renders the page so
 *    every section reads server data.
 *  - Refreshes automatically whenever an API module calls notifyDataChanged()
 *    after a successful write (apply, verify, settings save, …).
 *  - Shows a full-screen loader on first load and a retryable error state when
 *    the backend is unreachable (e.g. VITE_API_URL not set / API down).
 */
export function LiveDashboard<T>({ load, hydrate, label, children }: LiveDashboardProps<T>) {
  const [phase, setPhase] = useState<Phase>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  const run = useCallback(async () => {
    try {
      const payload = await load();
      hydrate(payload);
      setPhase({ status: "ready" });
    } catch (err) {
      setPhase((prev) =>
        prev.status === "ready"
          ? prev // background refresh failed — keep showing the last good data
          : { status: "error", message: apiErrorMessage(err) },
      );
    }
  }, [load, hydrate]);

  useEffect(() => {
    void run();
    const unsubscribe = subscribeDataChanged(() => {
      void run();
    });
    return unsubscribe;
  }, [run, attempt]);

  const retry = () => {
    setPhase({ status: "loading" });
    setAttempt((a) => a + 1);
  };

  if (phase.status === "loading") {
    return <DashboardLoader label={label} />;
  }

  if (phase.status === "error") {
    const apiHint = API_BASE_URL
      ? `API: ${API_BASE_URL}`
      : "No API base configured.";
    return (
      <DashboardError
        message={`${phase.message} (${apiHint}) — make sure the Django backend is running and VITE_API_URL points to it.`}
        onRetry={retry}
      />
    );
  }

  return <>{children}</>;
}
