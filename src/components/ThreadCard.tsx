import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowBigUp, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreadCardProps { id: string; title: string; author: string; upvotes: number; comments: number; tags: string[]; preview?: string; index?: number; pinned?: boolean; }

export default function ThreadCard({ id, title, author, upvotes, comments, tags, preview, index = 0, pinned }: ThreadCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }}>
      <Link to={`/community/thread/${id}`} className="block group">
        <div className={cn("pixel-card-sm bg-card p-4", pinned && "border-l-[4px] border-l-[#D4A843]")}>
          <div className="flex gap-3">
            <div className="flex flex-col items-center gap-0.5 pt-0.5">
              <ArrowBigUp className="w-5 h-5 text-ink-muted group-hover:text-forest transition-colors" />
              <span className="text-[11px] font-bold text-ink-light sans">{upvotes}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-[13px] text-ink leading-snug group-hover:text-forest transition-colors">{title}</h3>
                {pinned && <span className="text-[7px] font-bold text-[#D4A843] uppercase tracking-wider pixel shrink-0">📌 PINNED</span>}
              </div>
              {preview && <p className="text-[10px] text-ink-muted line-clamp-1 mt-0.5 sans">{preview}</p>}
              <div className="flex items-center gap-3 text-[10px] text-ink-muted mt-2 sans">
                <span className="font-semibold text-ink-light">u/{author}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{comments}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((t) => <span key={t} className="tag-pixel text-[8px]">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
