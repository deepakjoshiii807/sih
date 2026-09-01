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
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="text-[10px] font-semibold text-white/25 uppercase tracking-[3px] mb-3 block sans">Community</span>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">Don't explore alone.</h1>
          <p className="text-[13px] text-white/30 sans">Ask questions, share experiences, and grow together.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-[10px] font-semibold text-white/25 uppercase tracking-wider mb-3 sans">Communities</h3>
            <div className="space-y-1">
              <button onClick={() => setActive(null)} className={cn("w-full text-left px-3 py-2.5 text-[12px] rounded-xl transition-all sans", !active ? "glass-strong text-white font-semibold" : "text-white/30 hover:text-white/50 hover:bg-white/[0.03]")}>
                <div className="flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5" /> All Discussions</div>
              </button>
              {communities.map((c) => (
                <button key={c.id} onClick={() => setActive(c.name)} className={cn("w-full text-left px-3 py-2.5 text-[12px] rounded-xl transition-all sans", active === c.name ? "glass-strong text-white font-semibold" : "text-white/30 hover:text-white/50 hover:bg-white/[0.03]")}>
                  <div className="flex items-center justify-between"><span className="truncate">{c.name}</span><span className="text-[10px] text-white/15 shrink-0 ml-2">{(c.memberCount / 1000).toFixed(1)}k</span></div>
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-white">{active || "All Discussions"}</h3>
              <button className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white text-[11px] font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all sans">New Thread</button>
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
