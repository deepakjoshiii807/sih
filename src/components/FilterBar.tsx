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
                "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-colors",
                activeValue !== "All"
                  ? "bg-[#2C2C2C] text-[#FAF8F2] border-[#2C2C2C]"
                  : "bg-[#FAF8F2] text-[#3D3D3D] border-[#D4CFC4] hover:border-[#8A8580]"
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
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-1 z-50 bg-[#FAF8F2] border border-[#D4CFC4] paper-shadow min-w-[160px] py-1"
                >
                  {filter.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        onFilterChange(filter.id, option);
                        setExpandedFilter(null);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 text-xs hover:bg-[#E8E4DA] transition-colors",
                        activeValue === option
                          ? "font-semibold text-[#1a1a1a] bg-[#E8E4DA]/50"
                          : "text-[#6B6560]"
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
