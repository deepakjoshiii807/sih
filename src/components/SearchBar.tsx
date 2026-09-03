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

export default function SearchBar({ placeholder = "Try: Find me a free AI course with certification", defaultValue = "", size = "default", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    if (onSearch) onSearch(query.trim());
    else navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className={cn("pixel-card-sm overflow-hidden", size === "large" ? "p-1.5" : "p-1")}>
      <div className="flex items-stretch gap-1.5">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-cream">
          <Search className="w-4 h-4 text-ink-muted shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn("w-full bg-transparent text-ink placeholder:text-ink-muted focus:outline-none sans", size === "large" ? "text-[14px]" : "text-[13px]")}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <button onClick={handleSearch} className={cn("pixel-btn pixel-btn-primary shrink-0", size === "large" ? "text-[8px] px-6" : "text-[7px] px-4")}>
          Search →
        </button>
      </div>
    </div>
  );
}
