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
  const [searchParams, setSearchParams] = useSearchParams();
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

    // Text search
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

    // Type filter
    if (activeFilters.type && activeFilters.type !== "All") {
      results = results.filter(
        (o) => o.type.toLowerCase() === activeFilters.type.toLowerCase()
      );
    }

    // Cost filter
    if (activeFilters.cost && activeFilters.cost !== "All") {
      results = results.filter((o) => {
        const costLower = o.cost.toLowerCase();
        switch (activeFilters.cost) {
          case "Free":
            return costLower.includes("free");
          case "Under ₹5,000":
            return costLower.includes("free") || costLower.includes("₹3,500") || costLower.includes("₹7,500");
          case "Under ₹10,000":
            return costLower.includes("free") || costLower.includes("₹3,500") || costLower.includes("₹7,500");
          case "Paid":
            return !costLower.includes("free");
          default:
            return true;
        }
      });
    }

    // Mode filter
    if (activeFilters.mode && activeFilters.mode !== "All") {
      results = results.filter(
        (o) => o.mode.toLowerCase() === activeFilters.mode.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case "match":
        results.sort((a, b) => b.matchPercentage - a.matchPercentage);
        break;
      case "newest":
        results.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
        break;
      case "deadline":
        results.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        break;
      case "popular":
        results.sort((a, b) => b.matchPercentage - a.matchPercentage);
        break;
    }

    return results;
  }, [searchQuery, activeFilters, sortBy]);

  const activeFilterCount = Object.values(activeFilters).filter(
    (v) => v && v !== "All"
  ).length;

  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      {/* Header */}
      <section className="bg-[#FAF8F2] border-b border-[#D4CFC4] paper-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] font-semibold text-[#8A8580] uppercase tracking-[3px] mb-3 block">
              Explore
            </span>
            <h1 className="editorial-heading text-3xl sm:text-4xl text-[#1a1a1a] mb-3">
              Find your next opportunity.
            </h1>
            <p className="text-sm text-[#6B6560] mb-6 max-w-lg font-serif italic">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-[#8A8580]" />
            <FilterBar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
            {activeFilterCount > 0 && (
              <button
                onClick={() => setActiveFilters({})}
                className="text-xs text-[#B87654] hover:text-[#1a1a1a] font-medium transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#3D3D3D] bg-[#FAF8F2] border border-[#D4CFC4] hover:border-[#8A8580] transition-colors"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              {sortOptions.find((s) => s.value === sortBy)?.label}
            </button>
            {showSortMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-1 z-50 bg-[#FAF8F2] border border-[#D4CFC4] paper-shadow min-w-[160px] py-1"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortMenu(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 text-xs hover:bg-[#E8E4DA] transition-colors",
                        sortBy === option.value
                          ? "font-semibold text-[#1a1a1a] bg-[#E8E4DA]/50"
                          : "text-[#6B6560]"
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

        {/* Results Count */}
        <p className="text-xs text-[#8A8580] mb-6">
          {filteredOpportunities.length} opportunit{filteredOpportunities.length === 1 ? "y" : "ies"} found
          {searchQuery && (
            <span>
              {" "}for "<span className="font-medium text-[#3D3D3D]">{searchQuery}</span>"
            </span>
          )}
        </p>

        {/* Results Grid */}
        {filteredOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredOpportunities.map((opportunity, i) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                index={i}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="bg-[#FAF8F2] border border-[#D4CFC4] paper-shadow inline-block p-10 max-w-md mx-auto">
              <p className="font-serif text-lg text-[#1a1a1a] mb-2">No opportunities found</p>
              <p className="text-sm text-[#6B6560] mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilters({});
                }}
                className="text-sm font-medium text-[#3D4F6F] hover:text-[#1a1a1a] transition-colors underline"
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
