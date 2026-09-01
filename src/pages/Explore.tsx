import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, SearchX, RefreshCw } from "lucide-react";
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
  const [showSort, setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const results = useMemo(() => {
    let r = [...opportunities];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      r = r.filter((o) => o.title.toLowerCase().includes(q) || o.provider.toLowerCase().includes(q) || o.description.toLowerCase().includes(q) || o.skills.some((s) => s.toLowerCase().includes(q)) || o.tags.some((t) => t.toLowerCase().includes(q)));
    }
    if (activeFilters.type && activeFilters.type !== "All") r = r.filter((o) => o.type === activeFilters.type.toLowerCase());
    if (activeFilters.cost && activeFilters.cost !== "All") {
      r = r.filter((o) => {
        const c = o.cost.toLowerCase();
        if (activeFilters.cost === "Free") return c.includes("free");
        if (activeFilters.cost === "Paid") return !c.includes("free");
        return true;
      });
    }
    if (activeFilters.mode && activeFilters.mode !== "All") r = r.filter((o) => o.mode === activeFilters.mode.toLowerCase());
    if (sortBy === "match") r.sort((a, b) => b.matchPercentage - a.matchPercentage);
    if (sortBy === "newest") r.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
    if (sortBy === "deadline") r.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    return r;
  }, [searchQuery, activeFilters, sortBy]);

  const activeCount = Object.values(activeFilters).filter((v) => v && v !== "All").length;

  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      <section className="bg-[#FAF8F2] border-b border-[#D4CFC4] paper-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.2em] mb-3 block sans-ui">Explore</span>
            <h1 className="heading-lg text-3xl sm:text-4xl text-[#1A1A1A] mb-3">Find your next opportunity.</h1>
            <p className="body-lg text-[13px] text-[#7A7570] mb-6 max-w-lg">
              Use natural language to describe what you're looking for. We'll find the best matches.
            </p>
            <SearchBar size="large" defaultValue={initialQuery} onSearch={setSearchQuery} placeholder='I want an affordable cybersecurity course for beginners.' />
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-[#8A8580]" />
            <FilterBar filters={filters} activeFilters={activeFilters} onFilterChange={(id, val) => setActiveFilters((p) => ({ ...p, [id]: val }))} />
            {activeCount > 0 && (
              <button onClick={() => setActiveFilters({})} className="text-[11px] text-[#B87654] hover:text-[#1A1A1A] font-semibold sans-ui flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setShowSort(!showSort)} className="btn-paper bg-[#FAF8F2] ink-border-subtle text-[12px]">
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortOptions.find((s) => s.value === sortBy)?.label}
            </button>
            <AnimatePresence>
              {showSort && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute top-full right-0 mt-1 z-50 bg-[#FAF8F2] ink-border-subtle paper-shadow-md min-w-[160px] py-1">
                    {sortOptions.map((opt) => (
                      <button key={opt.value} onClick={() => { setSortBy(opt.value); setShowSort(false); }} className={cn("w-full text-left px-3 py-1.5 text-[12px] hover:bg-[#E8E4DA]/60 transition-colors sans-ui", sortBy === opt.value ? "font-semibold text-[#1A1A1A]" : "text-[#7A7570]")}>
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-[11px] text-[#8A8580] mb-6 sans-ui">
          {results.length} opportunit{results.length === 1 ? "y" : "ies"} found
          {searchQuery && <span> for "<span className="font-semibold text-[#1A1A1A]">{searchQuery}</span>"</span>}
        </p>

        <AnimatePresence mode="wait">
          {results.length > 0 ? (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((opp, i) => <OpportunityCard key={opp.id} opportunity={opp} index={i} />)}
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="bg-[#FAF8F2] ink-border paper-shadow p-10 max-w-md mx-auto">
                <SearchX className="w-10 h-10 text-[#D4CFC4] mx-auto mb-4" />
                <p className="heading-md text-lg text-[#1A1A1A] mb-2">No opportunities found</p>
                <p className="text-[13px] text-[#7A7570] mb-4 body-lg">Try adjusting your search or filters.</p>
                <button onClick={() => { setSearchQuery(""); setActiveFilters({}); }} className="text-[12px] font-semibold text-[#3D4F6F] hover:text-[#1A1A1A] sans-ui underline">Clear all filters</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}
