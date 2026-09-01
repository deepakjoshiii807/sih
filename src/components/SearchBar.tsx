import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
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
          "relative bg-[#FAF8F2] border-2 border-[#1a1a1a]/20 paper-shadow",
          size === "large" ? "p-1.5" : "p-1"
        )}
      >
        <div className="flex items-stretch">
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Search className="w-5 h-5 text-[#8A8580] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className={cn(
                "w-full bg-transparent text-[#1a1a1a] placeholder:text-[#8A8580] focus:outline-none font-serif",
                size === "large" ? "text-lg" : "text-sm"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className={cn(
              "px-6 bg-[#2C2C2C] text-[#FAF8F2] font-medium hover:bg-[#1a1a1a] transition-colors flex items-center gap-2 shrink-0",
              size === "large" ? "px-8 text-base" : "px-5 text-sm"
            )}
          >
            Search
            <span className="text-lg">→</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
