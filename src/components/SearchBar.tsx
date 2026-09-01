import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  size?: "default" | "large";
  onSearch?: (query: string) => void;
}

export default function SearchBar({ placeholder = "Try: Find me a free AI course with certification", defaultValue = "", size = "default", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    if (onSearch) onSearch(query.trim());
    else navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className={cn("glass-strong rounded-2xl overflow-hidden", size === "large" ? "p-1.5" : "p-1")}>
      <div className="flex items-stretch gap-1.5">
        <div className="flex-1 flex items-center gap-3 px-4 py-3">
          <svg className="w-4 h-4 text-white/25 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn("w-full bg-transparent text-white placeholder:text-white/20 focus:outline-none sans", size === "large" ? "text-[15px]" : "text-[13px]")}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <button onClick={handleSearch} className={cn("px-5 bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all flex items-center gap-1.5 shrink-0 rounded-xl", size === "large" ? "px-7 text-[13px]" : "px-5 text-[12px]")}>
          Search <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
