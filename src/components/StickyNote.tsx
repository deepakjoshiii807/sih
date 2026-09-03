import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
  children: ReactNode;
  color?: "yellow" | "blue" | "green" | "peach";
  className?: string;
  rotation?: number;
}

const colorMap = {
  yellow: "pixel-sticky-yellow",
  blue: "pixel-sticky-blue",
  green: "pixel-sticky-green",
  peach: "pixel-sticky-peach",
};

export default function StickyNote({ children, color = "yellow", className, rotation = -1 }: StickyNoteProps) {
  return (
    <div
      className={cn("pixel-sticky", colorMap[color], className)}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
}
