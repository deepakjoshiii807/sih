/**
 * Lightweight pub-sub so dashboard API modules can tell their pages "data has
 * changed — please refetch". Writes in src/lib/*-api.ts call notifyDataChanged()
 * after a successful mutation; each dashboard page subscribes and reloads.
 */
type Listener = () => void;

const listeners = new Set<Listener>();

export function subscribeDataChanged(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function notifyDataChanged(): void {
  listeners.forEach((fn) => {
    try {
      fn();
    } catch {
      /* listener errors must not break the write path */
    }
  });
}
