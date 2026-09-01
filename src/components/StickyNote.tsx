import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
  children: ReactNode;
  color?: "yellow" | "blue" | "green" | "pink";
  className?: string;
  rotation?: number;
  hasTape?: boolean;
}

export default function StickyNote({
  children,
  color = "yellow",
  className,
  rotation = -1,
  hasTape = true,
}: StickyNoteProps) {
  const colorClasses = {
    yellow: "sticky-yellow",
    blue: "sticky-blue",
    green: "sticky-green",
    pink: "sticky-pink",
  };

  return (
    <div
      className={cn(
        "relative p-5 paper-shadow-lg",
        colorClasses[color],
        hasTape && "tape",
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {children}
    </div>
  );
}
