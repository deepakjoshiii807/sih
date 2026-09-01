import { useState } from "react";
import { useNavigate } from "react-router";
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
    if (onSearch) onSearch(query.trim());
    else navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className={cn("w-full bg-[#FAF8F2] ink-border paper-shadow", size === "large" ? "p-1.5" : "p-1")}>
      <div className="flex items-stretch">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#FAF8F2]">
          <Search className="w-4 h-4 text-[#8A8580] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "w-full bg-transparent text-[#1A1A1A] placeholder:text-[#8A8580] focus:outline-none editorial",
              size === "large" ? "text-base" : "text-sm"
            )}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <button
          onClick={handleSearch}
          className={cn(
            "btn-paper btn-ink shrink-0",
            size === "large" ? "px-7 text-sm" : "px-5 text-xs"
          )}
        >
          Search <span className="text-base leading-none">→</span>
        </button>
      </div>
    </div>
  );
}
