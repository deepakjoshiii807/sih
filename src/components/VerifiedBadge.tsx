import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  className?: string;
  variant?: "default" | "compact";
}

export default function VerifiedBadge({ className, variant = "default" }: VerifiedBadgeProps) {
  if (variant === "compact") {
    return (
      <span className={cn("stamp stamp-verified text-[8px] py-0", className)}>
        ✓ Verified
      </span>
    );
  }
  return (
    <span className={cn("stamp stamp-verified", className)}>
      <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M13.5 4.5L6.5 11.5L2.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  );
}
