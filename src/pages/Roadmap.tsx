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
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.2em] mb-3 block sans-ui">Career Roadmap</span>
          <h1 className="heading-lg text-3xl text-[#1A1A1A] mb-2">Your path to <span className="highlight">AI Engineer</span></h1>
          <p className="body-lg text-[14px] text-[#7A7570] mb-10">A personalized learning path based on your current skills and goals.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Roadmap path */}
          <div className="lg:col-span-2">
            <PaperCard className="relative">
              <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-[0.12em] mb-6 sans-ui">Learning Path</h3>
              <div className="space-y-0">
                {roadmapSteps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                  >
                    <RoadmapNode step={step} isLast={i === roadmapSteps.length - 1} />
                  </motion.div>
                ))}
              </div>
            </PaperCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current skills */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-[0.12em] mb-3 sans-ui">Current Skills</h3>
              <PaperCard className="space-y-3">
                {skillGaps.map((s) => (
                  <ProgressBar key={s.skill} label={s.skill} progress={s.progress} completed={s.completed} />
                ))}
              </PaperCard>
            </motion.div>

            {/* Recommended */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-[0.12em] mb-3 sans-ui">Recommended Resources</h3>
              <PaperCard variant="warm" className="space-y-3">
                {opportunities.slice(0, 3).map((opp) => (
                  <Link key={opp.id} to={`/opportunity/${opp.id}`} className="block pb-3 border-b border-[#E8E4DA] last:border-0 last:pb-0 group">
                    <p className="text-[12px] font-semibold text-[#1A1A1A] group-hover:text-[#3D4F6F] transition-colors editorial">{opp.title}</p>
                    <p className="text-[10px] text-[#8A8580] sans-ui">{opp.provider} · {opp.cost}</p>
                  </Link>
                ))}
              </PaperCard>
            </motion.div>

            {/* Sticky note */}
            <div className="sticky top-20">
              <div className="sticky-yellow p-4 paper-shadow-md" style={{ transform: "rotate(-1deg)" }}>
                <p className="text-[11px] font-bold text-[#1A1A1A] mb-1 uppercase tracking-wider sans-ui">Pro Tip</p>
                <p className="text-[11px] text-[#7A7570] leading-relaxed body-sm">
                  Focus on completing the "in-progress" step before moving to the next one. Consistency beats speed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
