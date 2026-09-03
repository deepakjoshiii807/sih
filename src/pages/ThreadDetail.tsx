import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowBigUp, ArrowBigDown, Share2, Bookmark, Flag, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import CommentTree from "@/components/CommentTree";
import StickyNote from "@/components/StickyNote";
import Footer from "@/components/Footer";
import { threads } from "@/lib/mockData";

export default function ThreadDetail() {
  const { id } = useParams();
  const thread = threads.find((t) => t.id === id) || threads[0];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/community" className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted hover:text-ink transition-colors mb-6 sans"><ArrowLeft className="w-3.5 h-3.5" /> Back to Community</Link>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="pixel-card bg-card p-6 mb-6">
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-0.5 pt-1">
                <ArrowBigUp className="w-6 h-6 text-forest" />
                <span className="text-[13px] font-bold text-ink sans">{thread.upvotes}</span>
                <ArrowBigDown className="w-6 h-6 text-ink-muted/30" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 bg-cream-dark border-2 border-border flex items-center justify-center text-[10px] font-bold text-ink-light sans">{thread.author[0].toUpperCase()}</div>
                  <span className="text-[12px] font-bold text-ink-light sans">u/{thread.author}</span>
                  <span className="text-[10px] text-ink-muted sans">· {thread.createdAt}</span>
                </div>
                <h1 className="text-xl font-extrabold text-ink mb-3 tracking-tight">{thread.title}</h1>
                <p className="text-[13px] text-ink-light leading-relaxed mb-4">{thread.preview}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">{thread.tags.map((t) => <span key={t} className="tag-pixel text-[8px]">{t}</span>)}</div>
                <div className="flex items-center gap-4 text-[10px] text-ink-muted sans">
                  <button className="flex items-center gap-1 hover:text-forest transition-colors"><Share2 className="w-3.5 h-3.5" /> Share</button>
                  <button className="flex items-center gap-1 hover:text-ink transition-colors"><Bookmark className="w-3.5 h-3.5" /> Save</button>
                  <button className="flex items-center gap-1 hover:text-[#C75B4A] transition-colors"><Flag className="w-3.5 h-3.5" /> Report</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StickyNote color="blue" rotation={-0.5} className="mb-6">
            <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-blue" /><p className="pixel text-[7px] text-blue">AI SUMMARY</p></div>
            <p className="text-[12px] text-ink-light leading-relaxed sans">This discussion covers various experiences with the MSR AI internship. Key points: the selection process takes ~2 weeks, prior research experience is helpful but not required, and mentors are supportive.</p>
          </StickyNote>
        </motion.div>
        <p className="pixel text-[8px] text-yellow mb-4">⚠ 3 UNANSWERED QUESTIONS</p>
        <div className="pixel-card bg-card p-4 mb-6">
          <textarea placeholder="Share your experience or ask a question..." className="w-full bg-cream border-2 border-border rounded p-3 text-[12px] text-ink placeholder:text-ink-muted focus:outline-none focus:border-forest resize-none" rows={3} />
          <div className="flex justify-end mt-2"><button className="pixel-btn pixel-btn-primary text-[7px] py-1.5">Post Comment</button></div>
        </div>
        <div className="pixel-card bg-card p-4">
          <h3 className="section-pixel mb-4">{thread.comments.length} Comments</h3>
          <CommentTree comments={thread.comments} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
