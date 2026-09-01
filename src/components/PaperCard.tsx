import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  rotation?: number;
  variant?: "default" | "warm" | "elevated";
  tape?: "none" | "center" | "left" | "right";
  paperclip?: boolean;
  onClick?: () => void;
}

export default function PaperCard({
  children,
  className,
  rotation = 0,
  variant = "default",
  tape = "none",
  paperclip = false,
  onClick,
}: PaperCardProps) {
  const bg = {
    default: "bg-[#FAF8F2]",
    warm: "bg-[#F5F0E4]",
    elevated: "bg-[#FAF8F2] paper-shadow-lg",
  };

  const tapeClass = tape === "left" ? "tape tape-left" : tape === "right" ? "tape tape-right" : tape === "center" ? "tape" : "";

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-[#FAF8F2] ink-border-subtle paper-shadow p-5 transition-all duration-200",
        variant === "elevated" && "paper-shadow-lg",
        tapeClass,
        paperclip && "paperclip",
        onClick && "cursor-pointer hover:-translate-y-0.5 hover:paper-shadow-hover",
        className
      )}
      style={rotation ? { transform: `rotate(${rotation}deg)` } : undefined}
    >
      {children}
    </div>
  );
}
