import { cn } from "@/lib/utils";

interface ProgressBarProps { label: string; progress: number; completed?: boolean; className?: string; }

export default function ProgressBar({ label, progress, completed, className }: ProgressBarProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-[12px] text-ink-light font-semibold w-28 shrink-0 sans">{label}</span>
      <div className="flex-1 pixel-progress">
        <div className={cn("pixel-progress-fill", completed ? "green" : progress >= 50 ? "blue" : "yellow")} style={{ width: `${progress}%` }} />
      </div>
      <span className="text-[10px] text-ink-muted font-bold w-10 text-right pixel">{completed ? "✓ DONE" : `${progress}%`}</span>
    </div>
  );
}
