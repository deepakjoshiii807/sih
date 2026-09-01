import { cn } from "@/lib/utils";
import { Check, Lock, Circle, Play } from "lucide-react";
import type { RoadmapStep } from "@/lib/types";

const cfg = {
  completed: { icon: Check, color: "#00D2D3", bg: "bg-[#00D2D3]", label: "Completed" },
  "in-progress": { icon: Play, color: "#5B8DEF", bg: "bg-[#5B8DEF]", label: "In Progress" },
  locked: { icon: Lock, color: "#6E6E82", bg: "bg-white/[0.06]", label: "Locked" },
  recommended: { icon: Circle, color: "#FDCB6E", bg: "bg-[#FDCB6E]", label: "Recommended" },
};

export default function RoadmapNode({ step, isLast }: { step: RoadmapStep; isLast?: boolean }) {
  const c = cfg[step.status];
  const Icon = c.icon;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border-2", step.status === "locked" ? "bg-white/[0.04] border-white/[0.08]" : c.bg)} style={step.status !== "locked" ? { borderColor: c.color + "40" } : undefined}>
          <Icon className={cn("w-4 h-4", step.status === "locked" ? "text-white/20" : "text-white")} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-white/[0.06] min-h-[16px]" />}
      </div>
      <div className={cn("pb-5 flex-1", step.status === "locked" && "opacity-35")}>
        <div className="glass-card rounded-xl p-4 inline-block max-w-sm">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-[13px] text-white/90">{step.title}</h4>
            <span className="text-[9px] font-bold uppercase tracking-wider sans" style={{ color: c.color }}>{c.label}</span>
          </div>
          {step.description && <p className="text-[11px] text-white/30 sans">{step.description}</p>}
          {step.resource && <p className="text-[10px] text-[#5B8DEF] mt-1 sans">📄 {step.resource}</p>}
        </div>
      </div>
    </div>
  );
}
