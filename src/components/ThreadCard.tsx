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
  const rotations = ["rotate-[-0.3deg]", "rotate-[0.2deg]", "rotate-[-0.5deg]", "rotate-[0.3deg]"];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
    >
      <Link
        to={`/community/thread/${id}`}
        className="block group"
      >
        <div
          className={cn(
            "relative bg-[#FAF8F2] border border-[#D4CFC4] p-4 paper-shadow transition-all duration-200 group-hover:shadow-md group-hover:-translate-y-0.5",
            rotation,
            pinned && "border-l-2 border-l-[#B87654]"
          )}
        >
          {pinned && (
            <span className="absolute top-2 right-3 text-[9px] font-semibold text-[#B87654] uppercase tracking-wider">
              Pinned
            </span>
          )}

          <div className="flex gap-3">
            {/* Vote column */}
            <div className="flex flex-col items-center gap-0.5 pt-1">
              <ArrowBigUp className="w-5 h-5 text-[#8A8580] group-hover:text-[#B87654] transition-colors" />
              <span className="text-xs font-semibold text-[#3D3D3D]">{upvotes}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-semibold text-sm text-[#1a1a1a] leading-snug mb-1 group-hover:text-[#3D4F6F] transition-colors">
                {title}
              </h3>
              {preview && (
                <p className="text-[11px] text-[#8A8580] line-clamp-1 mb-2">{preview}</p>
              )}

              <div className="flex items-center gap-3 text-[11px] text-[#8A8580]">
                <span className="font-medium text-[#6B6560]">u/{author}</span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {comments}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 bg-[#E8E4DA] text-[9px] text-[#6B6560] font-medium uppercase tracking-wider"
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
