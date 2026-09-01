import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PaperCard from "@/components/PaperCard";
import RoadmapNode from "@/components/RoadmapNode";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";
import { roadmapSteps, skillGaps, opportunities } from "@/lib/mockData";
import { Link } from "react-router";

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] font-semibold text-white/25 uppercase tracking-[3px] mb-3 block sans">Career Roadmap</span>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Your path to <span className="gradient-text">AI Engineer</span></h1>
          <p className="text-[13px] text-white/30 mb-10 sans">A personalized learning path based on your current skills and goals.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaperCard>
              <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-6 sans">Learning Path</h3>
              {roadmapSteps.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}>
                  <RoadmapNode step={s} isLast={i === roadmapSteps.length - 1} />
                </motion.div>
              ))}
            </PaperCard>
          </div>
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3 sans">Current Skills</h3>
              <PaperCard className="space-y-3">{skillGaps.map((s) => <ProgressBar key={s.skill} label={s.skill} progress={s.progress} completed={s.completed} />)}</PaperCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-3 sans">Recommended Resources</h3>
              <PaperCard className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <Link key={opp.id} to={`/opportunity/${opp.id}`} className="block pb-3 border-b border-white/[0.04] last:border-0 last:pb-0 group">
                    <p className="text-[12px] font-semibold text-white/70 group-hover:text-white transition-colors">{opp.title}</p>
                    <p className="text-[10px] text-white/25 sans">{opp.provider} · {opp.cost}</p>
                  </Link>
                ))}
              </PaperCard>
            </motion.div>
            <div className="sticky-yellow p-4 rounded-2xl" style={{ background: "rgba(253,203,110,0.06)", border: "1px solid rgba(253,203,110,0.15)" }}>
              <p className="text-[11px] font-bold text-[#FDE68A] mb-1 uppercase tracking-wider sans">Pro Tip</p>
              <p className="text-[11px] text-white/30 leading-relaxed sans">Focus on completing the "in-progress" step before moving to the next one. Consistency beats speed.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
