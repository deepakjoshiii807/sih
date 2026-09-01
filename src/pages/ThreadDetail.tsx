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
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/community" className="inline-flex items-center gap-1.5 text-[12px] text-white/25 hover:text-white/50 transition-colors mb-6 sans"><ArrowLeft className="w-3.5 h-3.5" /> Back to Community</Link>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass rounded-2xl p-6 mb-6">
            <div className="flex gap-3">
              <div className="flex flex-col items-center gap-0.5 pt-1">
                <ArrowBigUp className="w-6 h-6 text-[#7C6BF0]" />
                <span className="text-[13px] font-bold text-white/60 sans">{thread.upvotes}</span>
                <ArrowBigDown className="w-6 h-6 text-white/15" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-[10px] font-bold text-white/40 sans">{thread.author[0].toUpperCase()}</div>
                  <span className="text-[12px] font-semibold text-white/60 sans">u/{thread.author}</span>
                  <span className="text-[10px] text-white/20 sans">· {thread.createdAt}</span>
                </div>
                <h1 className="text-xl font-bold text-white mb-3 tracking-tight">{thread.title}</h1>
                <p className="text-[13px] text-white/45 leading-relaxed mb-4">{thread.preview}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">{thread.tags.map((t) => <span key={t} className="badge badge-glass rounded-full text-[8px]">{t}</span>)}</div>
                <div className="flex items-center gap-4 text-[10px] text-white/20 sans">
                  <button className="flex items-center gap-1 hover:text-[#7C6BF0] transition-colors"><Share2 className="w-3.5 h-3.5" /> Share</button>
                  <button className="flex items-center gap-1 hover:text-white/40 transition-colors"><Bookmark className="w-3.5 h-3.5" /> Save</button>
                  <button className="flex items-center gap-1 hover:text-[#FF6B6B] transition-colors"><Flag className="w-3.5 h-3.5" /> Report</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StickyNote color="blue" rotation={-0.5} className="mb-6">
            <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-[#5B8DEF]" /><p className="text-[10px] font-bold text-[#A8C8FF] uppercase tracking-wider sans">AI Summary</p></div>
            <p className="text-[12px] text-white/40 leading-relaxed sans">This discussion covers various experiences with the MSR AI internship. Key points: the selection process takes ~2 weeks, prior research experience is helpful but not required, and mentors are supportive.</p>
          </StickyNote>
        </motion.div>
        <p className="text-[10px] font-bold text-[#FDCB6E] uppercase tracking-wider mb-4 sans">3 unanswered questions</p>
        <div className="glass rounded-2xl p-4 mb-6">
          <textarea placeholder="Share your experience or ask a question..." className="w-full bg-transparent text-[12px] text-white/50 placeholder:text-white/10 focus:outline-none resize-none" rows={3} />
          <div className="flex justify-end mt-2"><button className="px-4 py-1.5 bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white text-[11px] font-semibold rounded-xl">Post Comment</button></div>
        </div>
        <div className="glass rounded-2xl p-4">
          <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-4 sans">{thread.comments.length} Comments</h3>
          <CommentTree comments={thread.comments} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
