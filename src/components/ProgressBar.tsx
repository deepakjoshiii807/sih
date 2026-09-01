import { cn } from "@/lib/utils";

interface ProgressBarProps { label: string; progress: number; completed?: boolean; className?: string; }

export default function ProgressBar({ label, progress, completed, className }: ProgressBarProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-[12px] text-white/60 w-28 shrink-0 sans">{label}</span>
      <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-500", completed ? "bg-[#00D2D3]" : progress >= 50 ? "bg-[#5B8DEF]" : "bg-[#FDCB6E]")} style={{ width: `${progress}%` }} />
      </div>
      <span className="text-[10px] text-white/30 w-8 text-right sans">{completed ? "✓" : `${progress}%`}</span>
    </div>
  );
}
