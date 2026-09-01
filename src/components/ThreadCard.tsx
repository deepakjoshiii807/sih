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

export default function ThreadCard({
  id,
  title,
  author,
  upvotes,
  comments,
  tags,
  preview,
  index = 0,
  pinned = false,
}: ThreadCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link to={`/community/thread/${id}`} className="block group">
        <div
          className={cn(
            "glass-card rounded-2xl p-4",
            pinned && "border-l-2 border-l-[#FDCB6E]"
          )}
        >
          <div className="flex gap-3">
            {/* Vote column */}
            <div className="flex flex-col items-center gap-0.5 pt-1">
              <ArrowBigUp className="w-5 h-5 text-white/25 group-hover:text-[#6C5CE7] transition-colors" />
              <span className="text-xs font-semibold text-white/50">{upvotes}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm text-white/90 leading-snug group-hover:text-white transition-colors">
                  {title}
                </h3>
                {pinned && (
                  <span className="text-[9px] font-semibold text-[#FDCB6E] uppercase tracking-wider shrink-0">
                    Pinned
                  </span>
                )}
              </div>

              {preview && (
                <p className="text-[11px] text-white/30 line-clamp-1 mt-0.5">{preview}</p>
              )}

              <div className="flex items-center gap-3 text-[11px] text-white/30 mt-2">
                <span className="font-medium text-white/50">u/{author}</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {comments}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/[0.06] border border-white/[0.08] rounded-full text-[9px] text-white/40 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
