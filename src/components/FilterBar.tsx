import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FilterOption } from "@/lib/types";

interface FilterBarProps { filters: FilterOption[]; activeFilters: Record<string, string>; onFilterChange: (id: string, val: string) => void; }

export default function FilterBar({ filters, activeFilters, onFilterChange }: FilterBarProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {filters.map((f) => {
        const active = activeFilters[f.id] || "All";
        const isOpen = open === f.id;
        return (
          <div key={f.id} className="relative">
            <button onClick={() => setOpen(isOpen ? null : f.id)} className={cn("inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider rounded-xl transition-all sans", active !== "All" ? "bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white shadow-lg shadow-purple-500/10" : "glass text-white/40 hover:text-white/60")}>
              {f.label}{active !== "All" && <span className="opacity-60">: {active}</span>}
              <svg className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 4.5L6 7.5L9 4.5"/></svg>
            </button>
            <AnimatePresence>
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpen(null)} />
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute top-full left-0 mt-2 z-50 glass-strong rounded-xl min-w-[150px] py-1 overflow-hidden">
                    {f.options.map((o) => (
                      <button key={o} onClick={() => { onFilterChange(f.id, o); setOpen(null); }} className={cn("w-full text-left px-3 py-1.5 text-[11px] transition-all sans", active === o ? "font-semibold text-white bg-white/[0.06]" : "text-white/35 hover:text-white hover:bg-white/[0.04]")}>{o}</button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
