import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowBigUp, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreadCardProps { id: string; title: string; author: string; upvotes: number; comments: number; tags: string[]; preview?: string; index?: number; pinned?: boolean; }

export default function ThreadCard({ id, title, author, upvotes, comments, tags, preview, index = 0, pinned }: ThreadCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }}>
      <Link to={`/community/thread/${id}`} className="block group">
        <div className={cn("glass-card rounded-2xl p-4", pinned && "border-l-2 border-l-[#FDCB6E]")}>
          <div className="flex gap-3">
            <div className="flex flex-col items-center gap-0.5 pt-0.5">
              <ArrowBigUp className="w-5 h-5 text-white/20 group-hover:text-[#7C6BF0] transition-colors" />
              <span className="text-[11px] font-bold text-white/40 sans">{upvotes}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-[13px] text-white/85 leading-snug group-hover:text-white transition-colors">{title}</h3>
                {pinned && <span className="text-[9px] font-bold text-[#FDCB6E] uppercase tracking-wider sans shrink-0">Pinned</span>}
              </div>
              {preview && <p className="text-[10px] text-white/25 line-clamp-1 mt-0.5 sans">{preview}</p>}
              <div className="flex items-center gap-3 text-[10px] text-white/25 mt-2 sans">
                <span className="font-medium text-white/40">u/{author}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{comments}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((t) => <span key={t} className="badge badge-glass rounded-full text-[8px]">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
