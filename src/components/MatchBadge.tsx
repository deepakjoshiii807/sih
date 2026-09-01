import { cn } from "@/lib/utils";

interface MatchBadgeProps {
  percentage: number;
  className?: string;
}

export default function MatchBadge({ percentage, className }: MatchBadgeProps) {
  const color =
    percentage >= 90
      ? "text-[#2C6B4F] border-[#2C6B4F]/30"
      : percentage >= 80
        ? "text-[#3D4F6F] border-[#3D4F6F]/30"
        : "text-[#B87654] border-[#B87654]/30";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold tracking-wide border",
        color,
        className
      )}
    >
      {percentage}% Match
    </span>
  );
}
