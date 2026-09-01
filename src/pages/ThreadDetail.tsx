import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowBigUp, ArrowBigDown, Share2, Bookmark, Flag, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import PaperCard from "@/components/PaperCard";
import CommentTree from "@/components/CommentTree";
import StickyNote from "@/components/StickyNote";
import Footer from "@/components/Footer";
import { threads } from "@/lib/mockData";

export default function ThreadDetail() {
  const { id } = useParams();
  const thread = threads.find((t) => t.id === id) || threads[0];

  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/community" className="inline-flex items-center gap-1.5 text-[12px] text-[#7A7570] hover:text-[#1A1A1A] transition-colors mb-6 sans-ui">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Community
        </Link>

        {/* Post */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-[#FAF8F2] ink-border paper-shadow p-6 mb-6">
            <div className="flex gap-3">
              {/* Votes */}
              <div className="flex flex-col items-center gap-0.5 pt-1">
                <ArrowBigUp className="w-6 h-6 text-[#B87654]" />
                <span className="text-[13px] font-bold text-[#1A1A1A] sans-ui">{thread.upvotes}</span>
                <ArrowBigDown className="w-6 h-6 text-[#D4CFC4]" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-[#E8E4DA] flex items-center justify-center text-[10px] font-bold text-[#7A7570] sans-ui">
                    {thread.author[0].toUpperCase()}
                  </div>
                  <span className="text-[12px] font-semibold text-[#1A1A1A] sans-ui">u/{thread.author}</span>
                  <span className="text-[10px] text-[#8A8580] sans-ui">· {thread.createdAt}</span>
                </div>

                <h1 className="heading-lg text-xl text-[#1A1A1A] mb-3">{thread.title}</h1>

                <p className="body-lg text-[14px] text-[#3D3D3D] mb-4">{thread.preview}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {thread.tags.map((tag) => (
                    <span key={tag} className="tag tag-navy text-[8px]">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-[11px] text-[#8A8580] sans-ui">
                  <button className="flex items-center gap-1 hover:text-[#B87654] transition-colors"><Share2 className="w-3.5 h-3.5" /> Share</button>
                  <button className="flex items-center gap-1 hover:text-[#3D4F6F] transition-colors"><Bookmark className="w-3.5 h-3.5" /> Save</button>
                  <button className="flex items-center gap-1 hover:text-[#9B3B3B] transition-colors"><Flag className="w-3.5 h-3.5" /> Report</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Summary */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StickyNote color="blue" rotation={-0.5} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#3D4F6F]" />
              <p className="text-[11px] font-bold text-[#3D4F6F] uppercase tracking-wider sans-ui">AI Summary</p>
            </div>
            <p className="text-[12px] text-[#3D3D3D] leading-relaxed body-sm">
              This discussion covers various experiences with the MSR AI internship. Key points: the selection process takes ~2 weeks, prior research experience is helpful but not required, and mentors are supportive. Several students found it valuable for their career growth.
            </p>
          </StickyNote>
        </motion.div>

        {/* Unanswered questions */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-[#B87654] uppercase tracking-wider sans-ui">3 unanswered questions</p>
        </div>

        {/* Reply box */}
        <div className="bg-[#FAF8F2] ink-border-subtle p-4 mb-6">
          <textarea
            placeholder="Share your experience or ask a question..."
            className="w-full bg-transparent text-[13px] text-[#1A1A1A] placeholder:text-[#D4CFC4] focus:outline-none resize-none body-lg"
            rows={4}
          />
          <div className="flex justify-end mt-2">
            <button className="btn-paper btn-ink text-[11px]">Post Comment</button>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-[#FAF8F2] ink-border-subtle paper-shadow p-4">
          <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-[0.12em] mb-4 sans-ui">
            {thread.comments.length} Comments
          </h3>
          <CommentTree comments={thread.comments} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
