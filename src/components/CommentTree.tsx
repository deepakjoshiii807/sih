import { useState } from "react";
import { ArrowBigUp, ArrowBigDown, Reply, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Comment } from "@/lib/types";

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <div className={cn(depth > 0 && "ml-5 border-l-[2px] border-border pl-4")}>
      <div className="py-3">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 bg-cream-dark border-2 border-border flex items-center justify-center text-[8px] font-bold text-ink-light sans">{comment.author[0].toUpperCase()}</div>
          <span className="text-[11px] font-bold text-ink-light sans">u/{comment.author}</span>
          <span className="text-[10px] text-ink-muted sans">{comment.createdAt}</span>
        </div>
        <p className="text-[13px] text-ink-light leading-relaxed mb-2">{comment.content}</p>
        <div className="flex items-center gap-3 text-[10px] text-ink-muted sans">
          <button className="flex items-center gap-1 hover:text-forest transition-colors"><ArrowBigUp className="w-4 h-4" /> {comment.upvotes}</button>
          <button className="hover:text-ink-light transition-colors"><ArrowBigDown className="w-4 h-4" /></button>
          <button onClick={() => setShowReply(!showReply)} className="flex items-center gap-1 hover:text-ink-light transition-colors"><Reply className="w-3 h-3" /> Reply</button>
          {comment.replies && comment.replies.length > 0 && (
            <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-1 hover:text-ink-light transition-colors">
              {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />} {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>
        {showReply && (
          <div className="mt-3 pixel-card-sm bg-cream p-3">
            <textarea placeholder="Write a reply..." className="w-full bg-transparent text-[12px] text-ink placeholder:text-ink-muted focus:outline-none resize-none" rows={2} />
            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setShowReply(false)} className="text-[10px] text-ink-muted hover:text-ink-light sans">Cancel</button>
              <button className="pixel-btn pixel-btn-primary text-[6px] py-1 px-3">Reply</button>
            </div>
          </div>
        )}
      </div>
      {!collapsed && comment.replies?.map((r) => <CommentItem key={r.id} comment={r} depth={depth + 1} />)}
    </div>
  );
}

export default function CommentTree({ comments }: { comments: Comment[] }) {
  return <div className="divide-y-[2px] divide-border">{comments.map((c) => <CommentItem key={c.id} comment={c} />)}</div>;
}
