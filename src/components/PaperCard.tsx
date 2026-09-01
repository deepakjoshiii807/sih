import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "warm" | "elevated";
  onClick?: () => void;
}

export default function PaperCard({ children, className, variant = "default", onClick }: PaperCardProps) {
  return (
    <div onClick={onClick} className={cn("glass-card rounded-2xl p-5", onClick && "cursor-pointer", className)}>
      {children}
    </div>
  );
}
