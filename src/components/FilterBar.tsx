import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FilterOption } from "@/lib/types";

interface FilterBarProps {
  filters: FilterOption[];
  activeFilters: Record<string, string>;
  onFilterChange: (filterId: string, value: string) => void;
}

export default function FilterBar({ filters, activeFilters, onFilterChange }: FilterBarProps) {
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {filters.map((filter) => {
        const active = activeFilters[filter.id] || "All";
        const isOpen = openFilter === filter.id;
        return (
          <div key={filter.id} className="relative">
            <button
              onClick={() => setOpenFilter(isOpen ? null : filter.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider sans-ui transition-all",
                active !== "All"
                  ? "btn-ink text-[10px]"
                  : "bg-[#FAF8F2] ink-border-subtle text-[#7A7570] hover:text-[#1A1A1A] hover:border-[#8A8580]"
              )}
            >
              {filter.label}
              {active !== "All" && <span className="opacity-60">: {active}</span>}
              <svg className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </button>
            <AnimatePresence>
              {isOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpenFilter(null)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute top-full left-0 mt-1 z-50 bg-[#FAF8F2] ink-border-subtle paper-shadow-md min-w-[160px] py-1"
                  >
                    {filter.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { onFilterChange(filter.id, opt); setOpenFilter(null); }}
                        className={cn(
                          "w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#E8E4DA]/60 transition-colors sans-ui",
                          active === opt ? "font-semibold text-[#1A1A1A]" : "text-[#7A7570]"
                        )}
                      >
                        {opt}
                      </button>
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
