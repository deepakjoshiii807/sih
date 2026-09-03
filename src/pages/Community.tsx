import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import ThreadCard from "@/components/ThreadCard";
import Footer from "@/components/Footer";
import { threads, communities } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function Community() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="section-pixel mb-3 block">Community</span>
          <h1 className="text-3xl font-extrabold text-ink mb-1 tracking-tight">Don't explore alone.</h1>
          <p className="text-[13px] text-ink-muted sans">Ask questions, share experiences, and grow together.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h3 className="section-pixel mb-3">Communities</h3>
            <div className="space-y-1">
              <button onClick={() => setActive(null)} className={cn("w-full text-left px-3 py-2.5 text-[12px] font-semibold rounded border-2 transition-all sans", !active ? "bg-forest text-white border-[#2A4A35] shadow-[2px_2px_0px_#2A4A35]" : "bg-card border-border text-ink-muted hover:text-ink hover:border-ink-muted")}>
                <div className="flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5" /> All Discussions</div>
              </button>
              {communities.map((c) => (
                <button key={c.id} onClick={() => setActive(c.name)} className={cn("w-full text-left px-3 py-2.5 text-[12px] rounded border-2 transition-all sans", active === c.name ? "bg-forest text-white border-[#2A4A35] shadow-[2px_2px_0px_#2A4A35] font-bold" : "bg-card border-border text-ink-muted hover:text-ink hover:border-ink-muted")}>
                  <div className="flex items-center justify-between"><span className="truncate">{c.name}</span><span className="text-[10px] shrink-0 ml-2 pixel">{(c.memberCount / 1000).toFixed(1)}k</span></div>
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-extrabold text-ink">{active || "All Discussions"}</h3>
              <button className="pixel-btn pixel-btn-primary text-[7px] py-1.5">+ New Thread</button>
            </div>
            <div className="space-y-3">
              {threads.filter((t) => !active || t.community === active).map((t, i) => (
                <ThreadCard key={t.id} id={t.id} title={t.title} author={t.author} upvotes={t.upvotes} comments={t.comments.length} tags={t.tags} preview={t.preview} index={i} pinned={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
