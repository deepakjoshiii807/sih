import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowBigUp, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreadCardProps {
  id: string;
  title: string;
  author: string;
  upvotes: number;
  comments: number;
  tags: string[];
  preview?: string;
  index?: number;
  pinned?: boolean;
}

export default function ThreadCard({ id, title, author, upvotes, comments, tags, preview, index = 0, pinned }: ThreadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/community/thread/${id}`} className="block group">
        <div className={cn(
          "bg-[#FAF8F2] ink-border-subtle paper-shadow p-4 transition-all duration-200 group-hover:paper-shadow-hover",
          pinned && "border-l-[3px] border-l-[#B87654]"
        )}>
          <div className="flex gap-3">
            {/* Vote */}
            <div className="flex flex-col items-center gap-0.5 pt-0.5">
              <ArrowBigUp className="w-5 h-5 text-[#D4CFC4] group-hover:text-[#B87654] transition-colors" />
              <span className="text-[11px] font-bold text-[#7A7570] sans-ui">{upvotes}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-[14px] text-[#1A1A1A] leading-snug group-hover:text-[#3D4F6F] transition-colors editorial">
                  {title}
                </h3>
                {pinned && (
                  <span className="text-[9px] font-bold text-[#B87654] uppercase tracking-wider sans-ui shrink-0">Pinned</span>
                )}
              </div>
              {preview && <p className="text-[11px] text-[#8A8580] line-clamp-1 mt-0.5 sans-ui">{preview}</p>}

              <div className="flex items-center gap-3 text-[11px] text-[#8A8580] mt-2 sans-ui">
                <span className="font-medium text-[#7A7570]">u/{author}</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {comments}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {tags.map((tag) => (
                  <span key={tag} className="tag tag-navy text-[8px] py-0">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
