import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
  children: ReactNode;
  color?: "yellow" | "blue" | "green" | "pink";
  className?: string;
  rotation?: number;
}

const colorClasses = {
  yellow: "sticky-yellow",
  blue: "sticky-blue",
  green: "sticky-green",
  pink: "sticky-pink",
};

export default function StickyNote({ children, color = "yellow", className, rotation = -1 }: StickyNoteProps) {
  return (
    <div
      className={cn("p-5 paper-shadow-md relative", colorClasses[color], className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-[rgba(255,248,220,0.6)] border border-[rgba(200,190,160,0.3)]" style={{ transform: "rotate(-1.5deg)" }} />
      {children}
    </div>
  );
}
