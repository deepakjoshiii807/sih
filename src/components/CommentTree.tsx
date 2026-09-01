import { useState } from "react";
import { ArrowBigUp, ArrowBigDown, Reply, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Comment } from "@/lib/types";

interface CommentItemProps {
  comment: Comment;
  depth?: number;
}

function CommentItem({ comment, depth = 0 }: CommentItemProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <div className={cn(depth > 0 && "ml-5 border-l-2 border-[#E8E4DA] pl-4")}>
      <div className="py-3">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-[#E8E4DA] flex items-center justify-center text-[9px] font-bold text-[#7A7570] sans-ui">
            {comment.author[0].toUpperCase()}
          </div>
          <span className="text-[12px] font-semibold text-[#1A1A1A] sans-ui">u/{comment.author}</span>
          <span className="text-[10px] text-[#8A8580] sans-ui">{comment.createdAt}</span>
        </div>

        {/* Content */}
        <p className="text-[13px] text-[#3D3D3D] leading-relaxed mb-2 body-lg">{comment.content}</p>

        {/* Actions */}
        <div className="flex items-center gap-3 text-[11px] text-[#8A8580] sans-ui">
          <button className="flex items-center gap-1 hover:text-[#B87654] transition-colors">
            <ArrowBigUp className="w-4 h-4" /> {comment.upvotes}
          </button>
          <button className="hover:text-[#3D4F6F] transition-colors"><ArrowBigDown className="w-4 h-4" /></button>
          <button onClick={() => setShowReply(!showReply)} className="flex items-center gap-1 hover:text-[#3D4F6F] transition-colors">
            <Reply className="w-3.5 h-3.5" /> Reply
          </button>
          {comment.replies && comment.replies.length > 0 && (
            <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-1 hover:text-[#3D4F6F] transition-colors">
              {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>

        {/* Reply box */}
        {showReply && (
          <div className="mt-3 bg-[#FAF8F2] ink-border-subtle p-3">
            <textarea
              placeholder="Write a reply..."
              className="w-full bg-transparent text-[13px] text-[#1A1A1A] placeholder:text-[#8A8580] focus:outline-none resize-none body-lg"
              rows={3}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setShowReply(false)} className="btn-paper btn-ghost text-[11px]">Cancel</button>
              <button className="btn-paper btn-ink text-[11px]">Reply</button>
            </div>
          </div>
        )}
      </div>

      {/* Nested replies */}
      {!collapsed && comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentTree({ comments }: { comments: Comment[] }) {
  return (
    <div className="divide-y divide-[#E8E4DA]">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
