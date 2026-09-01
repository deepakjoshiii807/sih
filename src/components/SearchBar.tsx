import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  size?: "default" | "large";
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Try: Find me a free AI course with certification",
  defaultValue = "",
  size = "default",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    if (onSearch) {
      onSearch(query.trim());
    } else {
      navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative glass-strong rounded-2xl overflow-hidden",
          size === "large" ? "p-1.5" : "p-1"
        )}
      >
        <div className="flex items-stretch">
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Search className="w-5 h-5 text-white/30 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className={cn(
                "w-full bg-transparent text-white placeholder:text-white/25 focus:outline-none",
                size === "large" ? "text-base" : "text-sm"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSearch}
            className={cn(
              "px-6 bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 flex items-center gap-2 shrink-0 rounded-xl",
              size === "large" ? "px-8 text-sm" : "px-5 text-xs"
            )}
          >
            Search
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
