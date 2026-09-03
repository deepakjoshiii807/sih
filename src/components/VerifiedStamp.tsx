import { cn } from "@/lib/utils";

interface VerifiedStampProps {
  className?: string;
}

export default function VerifiedStamp({ className }: VerifiedStampProps) {
  return (
    <span className={cn("pixel-verified", className)}>
      <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none">
        <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      VERIFIED
    </span>
  );
}
