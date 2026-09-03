import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import PaperCard from "@/components/PaperCard";
import RoadmapNode from "@/components/RoadmapNode";
import ProgressBar from "@/components/ProgressBar";
import StickyNote from "@/components/StickyNote";
import Footer from "@/components/Footer";
import { roadmapSteps, skillGaps, opportunities } from "@/lib/mockData";
import { Link } from "react-router";

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <span className="section-pixel mb-3 block">Career Roadmap</span>
          <h1 className="text-3xl font-extrabold text-ink mb-2 tracking-tight">Your path to <span className="text-forest">AI Engineer</span></h1>
          <p className="text-[13px] text-ink-muted mb-10 sans">A personalized learning path based on your current skills and goals.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaperCard>
              <h3 className="section-pixel mb-6">Learning Path</h3>
              {roadmapSteps.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}>
                  <RoadmapNode step={s} isLast={i === roadmapSteps.length - 1} />
                </motion.div>
              ))}
            </PaperCard>
          </div>
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="section-pixel mb-3">Current Skills</h3>
              <PaperCard className="space-y-3">{skillGaps.map((s) => <ProgressBar key={s.skill} label={s.skill} progress={s.progress} completed={s.completed} />)}</PaperCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="section-pixel mb-3">Recommended Resources</h3>
              <PaperCard className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <Link key={opp.id} to={`/opportunity/${opp.id}`} className="block pb-3 border-b-[2px] border-border last:border-0 last:pb-0 group">
                    <p className="text-[12px] font-bold text-ink group-hover:text-forest transition-colors">{opp.title}</p>
                    <p className="text-[10px] text-ink-muted sans">{opp.provider} · {opp.cost}</p>
                  </Link>
                ))}
              </PaperCard>
            </motion.div>
            <StickyNote color="yellow" rotation={-1}>
              <p className="pixel text-[8px] text-[#8A6A20] mb-1">💡 PRO TIP</p>
              <p className="text-[11px] text-ink leading-relaxed sans">Focus on completing the "in-progress" step before moving to the next one. Consistency beats speed.</p>
            </StickyNote>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
