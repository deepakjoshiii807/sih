import { cn } from "@/lib/utils";
import { Check, Lock, Circle, Play } from "lucide-react";
import type { RoadmapStep } from "@/lib/types";

const cfg = {
  completed: { icon: Check, color: "var(--forest)", bg: "bg-forest", label: "DONE" },
  "in-progress": { icon: Play, color: "var(--blue)", bg: "bg-blue", label: "NOW" },
  locked: { icon: Lock, color: "var(--ink-muted)", bg: "bg-cream-dark", label: "LOCKED" },
  recommended: { icon: Circle, color: "var(--yellow)", bg: "bg-[#D4A843]", label: "NEXT" },
};

export default function RoadmapNode({ step, isLast }: { step: RoadmapStep; isLast?: boolean }) {
  const c = cfg[step.status];
  const Icon = c.icon;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn("w-10 h-10 border-2 border-ink flex items-center justify-center shadow-[2px_2px_0px_var(--ink)]", step.status === "completed" ? "bg-forest text-white" : step.status === "in-progress" ? "bg-blue text-white" : step.status === "recommended" ? "bg-[#D4A843] text-white" : "bg-cream-dark text-ink-muted")} style={step.status === "locked" ? { borderColor: "var(--border)", boxShadow: "2px 2px 0px var(--border)" } : undefined}>
          <Icon className="w-4 h-4" />
        </div>
        {!isLast && <div className="w-[3px] flex-1 bg-ink min-h-[16px]" />}
      </div>
      <div className={cn("pb-5 flex-1", step.status === "locked" && "opacity-40")}>
        <div className="pixel-card-sm bg-card p-4 inline-block max-w-sm">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-[13px] text-ink">{step.title}</h4>
            <span className="pixel text-[6px] uppercase tracking-wider" style={{ color: c.color }}>{c.label}</span>
          </div>
          {step.description && <p className="text-[11px] text-ink-muted sans">{step.description}</p>}
          {step.resource && <p className="text-[10px] text-forest font-semibold mt-1 sans">📄 {step.resource}</p>}
        </div>
      </div>
    </div>
  );
}
