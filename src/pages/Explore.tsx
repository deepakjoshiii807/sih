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
const sortOpts: { value: SortOption; label: string }[] = [{ value: "match", label: "Best Match" }, { value: "newest", label: "Newest" }, { value: "deadline", label: "Deadline" }, { value: "popular", label: "Popular" }];

export default function Explore() {
  const [sp] = useSearchParams();
  const initQ = sp.get("q") || "";
  const [af, setAf] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<SortOption>("match");
  const [showSort, setShowSort] = useState(false);
  const [sq, setSq] = useState(initQ);

  const results = useMemo(() => {
    let r = [...opportunities];
    if (sq.trim()) { const q = sq.toLowerCase(); r = r.filter((o) => o.title.toLowerCase().includes(q) || o.provider.toLowerCase().includes(q) || o.description.toLowerCase().includes(q) || o.skills.some((s) => s.toLowerCase().includes(q)) || o.tags.some((t) => t.toLowerCase().includes(q))); }
    if (af.type && af.type !== "All") r = r.filter((o) => o.type === af.type.toLowerCase());
    if (af.cost && af.cost !== "All") r = r.filter((o) => af.cost === "Free" ? o.cost.toLowerCase().includes("free") : af.cost === "Paid" ? !o.cost.toLowerCase().includes("free") : true);
    if (af.mode && af.mode !== "All") r = r.filter((o) => o.mode === af.mode.toLowerCase());
    if (sortBy === "match") r.sort((a, b) => b.matchPercentage - a.matchPercentage);
    if (sortBy === "newest") r.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
    if (sortBy === "deadline") r.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    return r;
  }, [sq, af, sortBy]);

  return (
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <section className="relative z-10 border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-[10px] font-semibold text-white/25 uppercase tracking-[3px] mb-3 block sans">Explore</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">Find your next opportunity.</h1>
            <p className="text-[13px] text-white/30 mb-6 max-w-lg sans">Use natural language to describe what you're looking for.</p>
            <SearchBar size="large" defaultValue={initQ} onSearch={setSq} placeholder='I want an affordable cybersecurity course for beginners.' />
            <div className="flex flex-wrap gap-2 mt-3">
              {["Free AI courses", "Scholarships for BCA", "Remote internships", "Cloud certifications"].map((s) => (
                <button key={s} onClick={() => { setSq(s); }} className="px-3 py-1 text-[10px] text-white/20 glass rounded-full hover:text-white/40 hover:bg-white/[0.04] transition-all sans">{s}</button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-white/20" />
            <FilterBar filters={filters} activeFilters={af} onFilterChange={(id, val) => setAf((p) => ({ ...p, [id]: val }))} />
            {Object.values(af).filter((v) => v && v !== "All").length > 0 && (
              <button onClick={() => setAf({})} className="text-[11px] text-[#FF6B6B] hover:text-[#FFA8A8] font-medium sans flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Clear all</button>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setShowSort(!showSort)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-white/40 glass rounded-xl hover:text-white hover:bg-white/[0.06] transition-all sans">
              <ArrowUpDown className="w-3.5 h-3.5" /> {sortOpts.find((s) => s.value === sortBy)?.label}
            </button>
            <AnimatePresence>
              {showSort && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="absolute top-full right-0 mt-2 z-50 glass-strong rounded-xl min-w-[150px] py-1 overflow-hidden">
                    {sortOpts.map((o) => <button key={o.value} onClick={() => { setSortBy(o.value); setShowSort(false); }} className={cn("w-full text-left px-3 py-1.5 text-[11px] transition-all sans", sortBy === o.value ? "font-semibold text-white bg-white/[0.06]" : "text-white/35 hover:text-white hover:bg-white/[0.04]")}>{o.label}</button>)}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
        <p className="text-[11px] text-white/20 mb-6 sans"><span className="text-white/45 font-semibold">{results.length}</span> opportunit{results.length === 1 ? "y" : "ies"} found{sq && <span> for "<span className="text-white/45 font-medium">{sq}</span>"</span>}</p>
        <AnimatePresence mode="wait">
          {results.length > 0 ? (
            <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map((o, i) => <OpportunityCard key={o.id} opportunity={o} index={i} />)}
            </motion.div>
          ) : (
            <motion.div key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="glass rounded-2xl p-10 max-w-md mx-auto">
                <SearchX className="w-10 h-10 text-white/10 mx-auto mb-4" />
                <p className="text-lg font-semibold text-white mb-2">No matches yet</p>
                <p className="text-[12px] text-white/25 mb-4 sans">Try different keywords or remove filters.</p>
                <button onClick={() => { setSq(""); setAf({}); }} className="text-[12px] font-medium text-[#7C6BF0] hover:text-[#B8AEFF] sans">Reset everything</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
}
