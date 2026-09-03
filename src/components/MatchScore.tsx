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
  const cls = {
    high: "pixel-match-high",
    mid: "pixel-match-mid",
    low: "pixel-match-low",
  };
  const sz = { sm: "text-[7px] px-1.5 py-0.5", md: "text-[8px] px-2 py-0.5", lg: "text-[9px] px-2.5 py-1" };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {showLabel && (
        <span className={cn("pixel-match", cls[level], sz[size])}>
          {score}% MATCH
        </span>
      )}
      {showBar && (
        <div className="pixel-progress">
          <div className={cn("pixel-progress-fill", level === "high" ? "green" : level === "mid" ? "blue" : "yellow")} style={{ width: `${score}%` }} />
        </div>
      )}
    </div>
  );
}
