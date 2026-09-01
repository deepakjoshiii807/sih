import { useState } from "react";
import { ArrowBigUp, ArrowBigDown, Reply, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Comment } from "@/lib/types";

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <div className={cn(depth > 0 && "ml-5 border-l border-white/[0.06] pl-4")}>
      <div className="py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-full bg-white/[0.06] flex items-center justify-center text-[9px] font-bold text-white/40 sans">{comment.author[0].toUpperCase()}</div>
          <span className="text-[11px] font-semibold text-white/60 sans">u/{comment.author}</span>
          <span className="text-[10px] text-white/20 sans">{comment.createdAt}</span>
        </div>
        <p className="text-[13px] text-white/60 leading-relaxed mb-2">{comment.content}</p>
        <div className="flex items-center gap-3 text-[10px] text-white/25 sans">
          <button className="flex items-center gap-1 hover:text-[#7C6BF0] transition-colors"><ArrowBigUp className="w-4 h-4" /> {comment.upvotes}</button>
          <button className="hover:text-white/40 transition-colors"><ArrowBigDown className="w-4 h-4" /></button>
          <button onClick={() => setShowReply(!showReply)} className="flex items-center gap-1 hover:text-white/50 transition-colors"><Reply className="w-3 h-3" /> Reply</button>
          {comment.replies && comment.replies.length > 0 && (
            <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-1 hover:text-white/50 transition-colors">
              {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />} {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>
        {showReply && (
          <div className="mt-3 glass rounded-xl p-3">
            <textarea placeholder="Write a reply..." className="w-full bg-transparent text-[12px] text-white/60 placeholder:text-white/15 focus:outline-none resize-none" rows={2} />
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setShowReply(false)} className="px-3 py-1 text-[10px] text-white/30 hover:text-white/50 sans">Cancel</button>
              <button className="px-3 py-1 text-[10px] font-semibold text-white bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] rounded-lg">Reply</button>
            </div>
          </div>
        )}
      </div>
      {!collapsed && comment.replies?.map((r) => <CommentItem key={r.id} comment={r} depth={depth + 1} />)}
    </div>
  );
}

export default function CommentTree({ comments }: { comments: Comment[] }) {
  return <div className="divide-y divide-white/[0.04]">{comments.map((c) => <CommentItem key={c.id} comment={c} />)}</div>;
}
