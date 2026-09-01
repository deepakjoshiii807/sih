import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock, MessageSquare, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import PaperCard from "@/components/PaperCard";
import OpportunityCard from "@/components/OpportunityCard";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";
import { opportunities, skillGaps, roadmapSteps } from "@/lib/mockData";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="heading-lg text-3xl text-[#1A1A1A] mb-1">
            Good morning, <span className="highlight">Shubham</span>.
          </h1>
          <p className="body-lg text-[15px] text-[#7A7570]">What are you looking for today?</p>
        </motion.div>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
          <SearchBar size="large" placeholder="Ask anything — courses, scholarships, jobs..." />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommended */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="heading-md text-lg text-[#1A1A1A]">Recommended for You</h2>
                <a href="/explore" className="text-[11px] font-semibold text-[#3D4F6F] hover:text-[#1A1A1A] transition-colors sans-ui flex items-center gap-1">
                  View all <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.slice(0, 4).map((opp, i) => (
                  <OpportunityCard key={opp.id} opportunity={opp} index={i} compact />
                ))}
              </div>
            </motion.div>

            {/* Skill Progress */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="heading-md text-lg text-[#1A1A1A] mb-4">Your Skill Progress</h2>
              <PaperCard className="space-y-3">
                {skillGaps.map((s) => (
                  <ProgressBar key={s.skill} label={s.skill} progress={s.progress} completed={s.completed} />
                ))}
              </PaperCard>
            </motion.div>

            {/* Career Roadmap Preview */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="heading-md text-lg text-[#1A1A1A]">Career Roadmap</h2>
                <a href="/roadmap" className="text-[11px] font-semibold text-[#3D4F6F] hover:text-[#1A1A1A] transition-colors sans-ui flex items-center gap-1">
                  Full roadmap <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <PaperCard>
                <div className="flex items-center gap-3 flex-wrap">
                  {roadmapSteps.slice(0, 5).map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2">
                      <span className={`text-[12px] font-medium sans-ui px-2 py-1 ${
                        s.status === "completed" ? "bg-[#7A8B6F]/10 text-[#7A8B6F] border border-[#7A8B6F]/20" :
                        s.status === "in-progress" ? "bg-[#3D4F6F]/10 text-[#3D4F6F] border border-[#3D4F6F]/20" :
                        "bg-[#E8E4DA] text-[#8A8580] border border-[#D4CFC4]"
                      }`}>
                        {s.status === "completed" && "✓ "}{s.title}
                      </span>
                      {i < 4 && <span className="text-[#D4CFC4]">→</span>}
                    </div>
                  ))}
                </div>
              </PaperCard>
            </motion.div>
          </div>

          {/* Sidebar — 1 col */}
          <div className="space-y-6">
            {/* Saved */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="heading-md text-[15px] text-[#1A1A1A] mb-3 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#B87654]" /> Saved Opportunities
              </h3>
              <PaperCard variant="warm" className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <div key={opp.id} className="flex items-center gap-3 pb-3 border-b border-[#E8E4DA] last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-[#E8E4DA] flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-[#7A7570] sans-ui">{opp.type[0].toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[12px] font-semibold text-[#1A1A1A] truncate editorial">{opp.title}</p>
                      <p className="text-[10px] text-[#8A8580] sans-ui">{opp.provider}</p>
                    </div>
                  </div>
                ))}
              </PaperCard>
            </motion.div>

            {/* Deadlines */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h3 className="heading-md text-[15px] text-[#1A1A1A] mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B87654]" /> Upcoming Deadlines
              </h3>
              <PaperCard variant="warm" className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <div key={opp.id} className="pb-3 border-b border-[#E8E4DA] last:border-0 last:pb-0">
                    <p className="text-[12px] font-semibold text-[#1A1A1A] editorial">{opp.title}</p>
                    <p className="text-[10px] text-[#B87654] font-semibold sans-ui mt-0.5">Deadline: {opp.deadline}</p>
                  </div>
                ))}
              </PaperCard>
            </motion.div>

            {/* Community */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="heading-md text-[15px] text-[#1A1A1A] mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#3D4F6F]" /> Community Activity
              </h3>
              <PaperCard variant="warm">
                <p className="text-[12px] text-[#7A7570] body-lg mb-3">3 new threads in your communities</p>
                <a href="/community" className="text-[11px] font-semibold text-[#3D4F6F] hover:text-[#1A1A1A] transition-colors sans-ui flex items-center gap-1">
                  View discussions <ArrowRight className="w-3 h-3" />
                </a>
              </PaperCard>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
