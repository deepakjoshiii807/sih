import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import OpportunityCard from "@/components/OpportunityCard";
import FilterBar from "@/components/FilterBar";
import Footer from "@/components/Footer";
import { opportunities, filters } from "@/lib/mockData";
import { cn } from "@/lib/utils";

type SortOption = "match" | "newest" | "deadline" | "popular";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "match", label: "Best Match" },
  { value: "newest", label: "Newest" },
  { value: "deadline", label: "Deadline" },
  { value: "popular", label: "Popular" },
];

export default function Explore() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters((prev) => ({ ...prev, [filterId]: value }));
  };

  const filteredOpportunities = useMemo(() => {
    let results = [...opportunities];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.provider.toLowerCase().includes(q) ||
          o.description.toLowerCase().includes(q) ||
          o.skills.some((s) => s.toLowerCase().includes(q)) ||
          o.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (activeFilters.type && activeFilters.type !== "All") {
      results = results.filter(
        (o) => o.type.toLowerCase() === activeFilters.type.toLowerCase()
      );
    }

    if (activeFilters.cost && activeFilters.cost !== "All") {
      results = results.filter((o) => {
        const costLower = o.cost.toLowerCase();
        switch (activeFilters.cost) {
          case "Free": return costLower.includes("free");
          case "Under ₹5,000": return costLower.includes("free") || costLower.includes("₹3,500") || costLower.includes("₹7,500");
          case "Under ₹10,000": return costLower.includes("free") || costLower.includes("₹3,500") || costLower.includes("₹7,500");
          case "Paid": return !costLower.includes("free");
          default: return true;
        }
      });
    }

    if (activeFilters.mode && activeFilters.mode !== "All") {
      results = results.filter(
        (o) => o.mode.toLowerCase() === activeFilters.mode.toLowerCase()
      );
    }

    switch (sortBy) {
      case "match": results.sort((a, b) => b.matchPercentage - a.matchPercentage); break;
      case "newest": results.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime()); break;
      case "deadline": results.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()); break;
      case "popular": results.sort((a, b) => b.matchPercentage - a.matchPercentage); break;
    }

    return results;
  }, [searchQuery, activeFilters, sortBy]);

  const activeFilterCount = Object.values(activeFilters).filter(
    (v) => v && v !== "All"
  ).length;

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative">
      <div className="ambient-glow" />

      <Navbar />

      {/* Header */}
      <section className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[3px] mb-3 block">
              Explore
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Find your next opportunity.
            </h1>
            <p className="text-sm text-white/35 mb-6 max-w-lg">
              Use natural language to describe what you're looking for. We'll find the best matches.
            </p>
            <SearchBar
              defaultValue={initialQuery}
              size="large"
              onSearch={handleSearch}
              placeholder='I want an affordable cybersecurity course for beginners.'
            />
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-white/25" />
            <FilterBar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
            {activeFilterCount > 0 && (
              <button
                onClick={() => setActiveFilters({})}
                className="text-xs text-[#FF6B6B] hover:text-[#FFA8A8] font-medium transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/50 glass rounded-xl hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortOptions.find((s) => s.value === sortBy)?.label}
            </button>
            {showSortMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 z-50 glass-strong rounded-xl overflow-hidden min-w-[160px] py-1"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setShowSortMenu(false); }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 text-xs transition-all",
                        sortBy === option.value
                          ? "font-semibold text-white bg-white/[0.08]"
                          : "text-white/40 hover:text-white hover:bg-white/[0.05]"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-white/25 mb-6">
          {filteredOpportunities.length} opportunit{filteredOpportunities.length === 1 ? "y" : "ies"} found
          {searchQuery && (
            <span>
              {" "}for "<span className="font-medium text-white/50">{searchQuery}</span>"
            </span>
          )}
        </p>

        {/* Results Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredOpportunities.map((opportunity, i) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} index={i} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="glass rounded-2xl p-10 max-w-md mx-auto">
              <p className="text-lg font-semibold text-white mb-2">No opportunities found</p>
              <p className="text-sm text-white/35 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveFilters({}); }}
                className="text-sm font-medium text-[#6C5CE7] hover:text-[#A8C8FF] transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}
