import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, Sparkles, SearchX, RefreshCw, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
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

/* ─── Animated result count ─── */
function ResultCount({ count, query }: { count: number; query: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = display;
    const diff = count - start;
    const duration = 400;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setDisplay(Math.round(start + diff * p));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [count]);

  return (
    <p className="text-xs text-white/25 mb-6">
      <span className="text-white/50 font-semibold">{display}</span> opportunit{count === 1 ? "y" : "ies"} found
      {query && (
        <span>
          {" "}for "<span className="text-white/50 font-medium">{query}</span>"
        </span>
      )}
    </p>
  );
}

export default function Explore() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchInput(query);
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
        const c = o.cost.toLowerCase();
        switch (activeFilters.cost) {
          case "Free": return c.includes("free");
          case "Under ₹5,000": return c.includes("free") || c.includes("₹3,500") || c.includes("₹7,500");
          case "Under ₹10,000": return c.includes("free") || c.includes("₹3,500") || c.includes("₹7,500");
          case "Paid": return !c.includes("free");
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
      default: results.sort((a, b) => b.matchPercentage - a.matchPercentage); break;
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

      {/* ═══════ STICKY SEARCH HEADER ═══════ */}
      <section className="relative z-10 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#5B8DEF] flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Explore
                </h1>
                <p className="text-xs text-white/30">
                  AI-powered search across 12,000+ opportunities
                </p>
              </div>
            </div>

            {/* Big search */}
            <div className="glass rounded-2xl p-2">
              <div className="flex items-stretch gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3">
                  <Search className="w-5 h-5 text-white/25 shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Describe what you're looking for..."
                    className="w-full bg-transparent text-white placeholder:text-white/20 focus:outline-none text-base"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch(searchInput);
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSearch(searchInput)}
                  className="px-6 bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2 shrink-0"
                >
                  Search
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                "Free AI courses",
                "Scholarships for BCA",
                "Remote internships",
                "Cloud certifications",
                "Web dev jobs",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => { setSearchInput(s); handleSearch(s); }}
                  className="px-3 py-1 text-[11px] text-white/25 glass rounded-full hover:text-white/50 hover:bg-white/[0.06] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FILTERS + RESULTS ═══════ */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-white/20" />
            <FilterBar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
            {activeFilterCount > 0 && (
              <button
                onClick={() => setActiveFilters({})}
                className="inline-flex items-center gap-1 text-xs text-[#FF6B6B] hover:text-[#FFA8A8] font-medium transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/40 glass rounded-xl hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortOptions.find((s) => s.value === sortBy)?.label}
            </button>
            <AnimatePresence>
              {showSortMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.97 }}
                    transition={{ duration: 0.12 }}
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
            </AnimatePresence>
          </div>
        </div>

        {/* Count */}
        <ResultCount count={filteredOpportunities.length} query={searchQuery} />

        {/* Results */}
        <AnimatePresence mode="wait">
          {filteredOpportunities.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {filteredOpportunities.map((opportunity, i) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <div className="glass rounded-3xl p-12 max-w-md mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#6C5CE7]/[0.04] to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center mx-auto mb-6">
                    <SearchX className="w-8 h-8 text-white/15" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No matches yet</h3>
                  <p className="text-sm text-white/30 mb-6 leading-relaxed">
                    Try different keywords or remove some filters. Our AI is scanning 12,000+ opportunities — we'll find something that fits.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <button
                      onClick={() => { setSearchQuery(""); setSearchInput(""); setActiveFilters({}); }}
                      className="px-5 py-2 glass text-white/60 text-sm font-medium rounded-xl hover:bg-white/[0.08] transition-all"
                    >
                      Reset everything
                    </button>
                    <a
                      href="/"
                      className="px-5 py-2 bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] text-white text-sm font-semibold rounded-xl"
                    >
                      Back to home
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}
