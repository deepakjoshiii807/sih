import { cn } from "@/lib/utils";

interface VerifiedStampProps {
  className?: string;
}

export default function VerifiedStamp({ className }: VerifiedStampProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 border-2 border-[#2C6B4F] text-[#2C6B4F] font-serif text-[10px] font-bold tracking-[3px] uppercase transform -rotate-3 opacity-80",
        className
      )}
    >
      VERIFIED
    </span>
  );
}
