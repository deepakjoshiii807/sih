import { cn } from "@/lib/utils";
import { Check, Lock, Circle, Play } from "lucide-react";
import type { RoadmapStep } from "@/lib/types";

interface RoadmapNodeProps {
  step: RoadmapStep;
  isLast?: boolean;
}

const statusConfig = {
  completed: { icon: Check, color: "text-[#7A8B6F]", bg: "bg-[#7A8B6F]", border: "border-[#7A8B6F]", label: "Completed" },
  "in-progress": { icon: Play, color: "text-[#3D4F6F]", bg: "bg-[#3D4F6F]", border: "border-[#3D4F6F]", label: "In Progress" },
  locked: { icon: Lock, color: "text-[#D4CFC4]", bg: "bg-[#E8E4DA]", border: "border-[#D4CFC4]", label: "Locked" },
  recommended: { icon: Circle, color: "text-[#B87654]", bg: "bg-[#B87654]", border: "border-[#B87654]", label: "Recommended" },
};

export default function RoadmapNode({ step, isLast = false }: RoadmapNodeProps) {
  const config = statusConfig[step.status];
  const Icon = config.icon;

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center border-2", config.bg, config.border, step.status === "locked" ? "bg-[#E8E4DA]" : "")}>
          <Icon className={cn("w-4 h-4", step.status === "locked" ? "text-[#D4CFC4]" : "text-[#FAF8F2]")} />
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-[#D4CFC4] min-h-[20px]" />}
      </div>

      {/* Content */}
      <div className={cn("pb-6 flex-1", step.status === "locked" && "opacity-40")}>
        <div className="bg-[#FAF8F2] ink-border-subtle paper-shadow p-4 inline-block max-w-sm">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-[14px] text-[#1A1A1A] editorial">{step.title}</h4>
            <span className={cn("text-[9px] font-bold uppercase tracking-wider sans-ui", config.color)}>{config.label}</span>
          </div>
          {step.description && (
            <p className="text-[12px] text-[#7A7570] sans-ui">{step.description}</p>
          )}
          {step.resource && (
            <p className="text-[11px] text-[#3D4F6F] mt-1 sans-ui">📄 {step.resource}</p>
          )}
        </div>
      </div>
    </div>
  );
}
