import { cn } from "@/lib/utils";

interface MatchScoreProps {
  score: number;
  showLabel?: boolean;
  showBar?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function MatchScore({ score, showLabel = true, showBar = false, size = "md", className }: MatchScoreProps) {
  const level = score >= 90 ? "high" : score >= 75 ? "medium" : "low";
  const colors = {
    high: { text: "text-[#2C6B4F]", bar: "match-high", border: "border-[#2C6B4F]/20" },
    medium: { text: "text-[#3D4F6F]", bar: "match-medium", border: "border-[#3D4F6F]/20" },
    low: { text: "text-[#B87654]", bar: "match-low", border: "border-[#B87654]/20" },
  };
  const c = colors[level];
  const sizes = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-[11px] px-2 py-0.5",
    lg: "text-xs px-2.5 py-1",
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {showLabel && (
        <span className={cn("inline-flex items-center gap-1 font-bold tracking-wider border", c.text, c.border, sizes[size])}>
          <svg className={cn(size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3")} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 2v12M4 6l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {score}% MATCH
        </span>
      )}
      {showBar && (
        <div className="match-bar">
          <div className={cn("match-bar-fill", c.bar)} style={{ width: `${score}%` }} />
        </div>
      )}
    </div>
  );
}
