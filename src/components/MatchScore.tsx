import { cn } from "@/lib/utils";

interface MatchScoreProps {
  score: number;
  showLabel?: boolean;
  showBar?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function MatchScore({ score, showLabel = true, showBar = false, size = "md", className }: MatchScoreProps) {
  const level = score >= 90 ? "high" : score >= 75 ? "mid" : "low";
  const colors = {
    high: { text: "text-[#00D2D3]", badge: "badge-teal" },
    mid: { text: "text-[#A8C8FF]", badge: "badge-blue" },
    low: { text: "text-[#FDE68A]", badge: "badge-orange" },
  };
  const c = colors[level];
  const sz = { sm: "text-[9px] px-2 py-0.5", md: "text-[10px] px-2.5 py-0.5", lg: "text-[11px] px-3 py-1" };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {showLabel && (
        <span className={cn("inline-flex items-center gap-1 font-bold tracking-wider rounded-full", c.badge, sz[size])}>
          {score}% Match
        </span>
      )}
      {showBar && (
        <div className="match-bar">
          <div className={cn("match-fill", level === "high" ? "match-high" : level === "mid" ? "match-mid" : "match-low")} style={{ width: `${score}%` }} />
        </div>
      )}
    </div>
  );
}
