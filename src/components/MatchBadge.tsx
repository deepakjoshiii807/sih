import { cn } from "@/lib/utils";

interface MatchBadgeProps {
  percentage: number;
  className?: string;
}

export default function MatchBadge({ percentage, className }: MatchBadgeProps) {
  const variant =
    percentage >= 90
      ? "badge-teal"
      : percentage >= 80
        ? "badge-blue"
        : "badge-orange";

  return (
    <span className={cn("badge-glass rounded-full", variant, className)}>
      {percentage}% Match
    </span>
  );
}
