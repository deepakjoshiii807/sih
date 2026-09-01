import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickyNoteProps {
  children: ReactNode;
  color?: "yellow" | "blue" | "green" | "pink";
  className?: string;
  rotation?: number;
  hasTape?: boolean;
}

const colorMap = {
  yellow: {
    bg: "rgba(253, 203, 110, 0.08)",
    border: "rgba(253, 203, 110, 0.2)",
    glow: "rgba(253, 203, 110, 0.06)",
  },
  blue: {
    bg: "rgba(91, 141, 239, 0.08)",
    border: "rgba(91, 141, 239, 0.2)",
    glow: "rgba(91, 141, 239, 0.06)",
  },
  green: {
    bg: "rgba(0, 210, 211, 0.08)",
    border: "rgba(0, 210, 211, 0.2)",
    glow: "rgba(0, 210, 211, 0.06)",
  },
  pink: {
    bg: "rgba(255, 107, 107, 0.08)",
    border: "rgba(255, 107, 107, 0.2)",
    glow: "rgba(255, 107, 107, 0.06)",
  },
};

export default function StickyNote({
  children,
  color = "yellow",
  className,
  rotation = -1,
}: StickyNoteProps) {
  const c = colorMap[color];

  return (
    <div
      className={cn(
        "relative p-5 backdrop-blur-xl rounded-2xl transition-all duration-300",
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: `0 8px 32px ${c.glow}`,
      }}
    >
      {children}
    </div>
  );
}
