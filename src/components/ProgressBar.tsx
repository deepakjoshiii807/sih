import { cn } from "@/lib/utils";

interface ProgressBarProps {
  label: string;
  progress: number;
  completed?: boolean;
  className?: string;
}

export default function ProgressBar({ label, progress, completed = false, className }: ProgressBarProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-[13px] text-[#1A1A1A] w-32 shrink-0 sans-ui">{label}</span>
      <div className="flex-1 h-2 bg-[#E8E4DA] overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500", completed ? "bg-[#7A8B6F]" : progress >= 50 ? "bg-[#3D4F6F]" : "bg-[#B87654]")}
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-[11px] text-[#8A8580] w-10 text-right sans-ui">
        {completed ? "✓" : `${progress}%`}
      </span>
    </div>
  );
}
