import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FilterOption } from "@/lib/types";

interface FilterBarProps {
  filters: FilterOption[];
  activeFilters: Record<string, string>;
  onFilterChange: (filterId: string, value: string) => void;
}

export default function FilterBar({ filters, activeFilters, onFilterChange }: FilterBarProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {filters.map((filter) => {
        const activeValue = activeFilters[filter.id] || "All";
        const isExpanded = expandedFilter === filter.id;

        return (
          <div key={filter.id} className="relative">
            <button
              onClick={() => setExpandedFilter(isExpanded ? null : filter.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all duration-200",
                activeValue !== "All"
                  ? "bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] text-white border border-purple-500/30 shadow-lg shadow-purple-500/10"
                  : "glass text-white/50 hover:text-white hover:bg-white/[0.08]"
              )}
            >
              {filter.label}
              {activeValue !== "All" && (
                <span className="text-[10px] opacity-70">: {activeValue}</span>
              )}
              <svg className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </button>

            {isExpanded && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setExpandedFilter(null)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 z-50 glass-strong rounded-xl overflow-hidden min-w-[160px] py-1"
                >
                  {filter.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        onFilterChange(filter.id, option);
                        setExpandedFilter(null);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 text-xs transition-all",
                        activeValue === option
                          ? "font-semibold text-white bg-white/[0.08]"
                          : "text-white/40 hover:text-white hover:bg-white/[0.05]"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
