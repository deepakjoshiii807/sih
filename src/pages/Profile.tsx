import { motion } from "framer-motion";
import { BookOpen, Award, Bookmark, MessageSquare, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import PaperCard from "@/components/PaperCard";
import ProgressBar from "@/components/ProgressBar";
import MatchScore from "@/components/MatchScore";
import Footer from "@/components/Footer";
import { skillGaps, opportunities } from "@/lib/mockData";
import { Link } from "react-router";

const profile = { name: "Shubham Kumar", email: "shubham@example.com", education: "BCA — 3rd Year, Delhi University", goal: "ML Engineer", interests: ["AI & ML", "Data Science", "Cloud Computing"], reputation: 245 };

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <PaperCard className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C6BF0] to-[#5B8DEF] flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3 shadow-lg shadow-purple-500/20">{profile.name[0]}</div>
                <h1 className="text-xl font-bold text-white mb-1 tracking-tight">{profile.name}</h1>
                <p className="text-[11px] text-white/25 sans mb-3">{profile.email}</p>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FDCB6E]/10 border border-[#FDCB6E]/20 rounded-full text-[10px] font-bold text-[#FDE68A] sans mb-4"><Star className="w-3 h-3" /> {profile.reputation} rep</div>
                <div className="divider mb-4" />
                <div className="text-left space-y-3">
                  <div><p className="text-[9px] font-semibold text-white/25 uppercase tracking-wider sans">Education</p><p className="text-[12px] text-white/60 sans">{profile.education}</p></div>
                  <div><p className="text-[9px] font-semibold text-white/25 uppercase tracking-wider sans">Career Goal</p><p className="text-[12px] text-white/60 sans">{profile.goal}</p></div>
                  <div><p className="text-[9px] font-semibold text-white/25 uppercase tracking-wider sans">Interests</p><div className="flex flex-wrap gap-1.5 mt-1">{profile.interests.map((i) => <span key={i} className="badge badge-glass rounded-full text-[8px]">{i}</span>)}</div></div>
                </div>
              </PaperCard>
            </motion.div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-[15px] font-bold text-white mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-[#5B8DEF]" /> Skills</h2>
              <PaperCard className="space-y-3">{skillGaps.map((s) => <ProgressBar key={s.skill} label={s.skill} progress={s.progress} completed={s.completed} />)}</PaperCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="text-[15px] font-bold text-white mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-[#00D2D3]" /> Certifications</h2>
              <PaperCard>
                <div className="space-y-3">
                  {["Python for Data Science — IBM", "SQL Fundamentals — HackerRank", "Git & GitHub — Coursera"].map((c) => (
                    <div key={c} className="flex items-center gap-3 pb-3 border-b border-white/[0.04] last:border-0 last:pb-0">
                      <span className="verified rounded-full text-[7px] py-0">✓</span>
                      <p className="text-[12px] text-white/60 sans">{c}</p>
                    </div>
                  ))}
                </div>
              </PaperCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-[15px] font-bold text-white mb-3 flex items-center gap-2"><Bookmark className="w-4 h-4 text-[#FDCB6E]" /> Saved Opportunities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {opportunities.slice(0, 4).map((opp) => (
                  <Link key={opp.id} to={`/opportunity/${opp.id}`} className="glass-card rounded-2xl p-4 group">
                    <p className="text-[12px] font-semibold text-white/75 group-hover:text-white transition-colors mb-1">{opp.title}</p>
                    <p className="text-[10px] text-white/25 sans mb-2">{opp.provider}</p>
                    <MatchScore score={opp.matchPercentage} size="sm" />
                  </Link>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="text-[15px] font-bold text-white mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-[#7C6BF0]" /> Community Activity</h2>
              <PaperCard><p className="text-[12px] text-white/35 sans">12 posts · 48 comments · 3 questions answered</p></PaperCard>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
