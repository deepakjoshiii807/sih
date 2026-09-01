import { useState } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import PaperCard from "@/components/PaperCard";
import ThreadCard from "@/components/ThreadCard";
import Footer from "@/components/Footer";
import { threads, communities } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function Community() {
  const [activeCommunity, setActiveCommunity] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <span className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.2em] mb-3 block sans-ui">Community</span>
          <h1 className="heading-lg text-3xl text-[#1A1A1A] mb-1">Don't explore alone.</h1>
          <p className="body-lg text-[14px] text-[#7A7570]">Ask questions, share experiences, and grow together.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar — Communities */}
          <div className="lg:col-span-1">
            <h3 className="text-[11px] font-bold text-[#8A8580] uppercase tracking-[0.15em] mb-3 sans-ui">Communities</h3>
            <div className="space-y-2">
              <button
                onClick={() => setActiveCommunity(null)}
                className={cn(
                  "w-full text-left px-3 py-2.5 text-[13px] sans-ui transition-all",
                  !activeCommunity ? "bg-[#FAF8F2] ink-border paper-shadow font-semibold text-[#1A1A1A]" : "text-[#7A7570] hover:bg-[#E8E4DA]/60"
                )}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" /> All Discussions
                </div>
              </button>
              {communities.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCommunity(c.name)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 text-[13px] sans-ui transition-all",
                    activeCommunity === c.name ? "bg-[#FAF8F2] ink-border paper-shadow font-semibold text-[#1A1A1A]" : "text-[#7A7570] hover:bg-[#E8E4DA]/60"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{c.name}</span>
                    <span className="text-[10px] text-[#8A8580] shrink-0 ml-2">{(c.memberCount / 1000).toFixed(1)}k</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Threads */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h3 className="heading-md text-[15px] text-[#1A1A1A]">
                {activeCommunity || "All Discussions"}
              </h3>
              <button className="btn-paper btn-ink text-[11px]">New Thread</button>
            </div>

            <div className="space-y-3">
              {threads
                .filter((t) => !activeCommunity || t.community === activeCommunity)
                .map((thread, i) => (
                  <ThreadCard
                    key={thread.id}
                    id={thread.id}
                    title={thread.title}
                    author={thread.author}
                    upvotes={thread.upvotes}
                    comments={thread.comments.length}
                    tags={thread.tags}
                    preview={thread.preview}
                    index={i}
                    pinned={i === 0}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
