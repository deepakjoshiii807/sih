import { motion } from "framer-motion";
import { BookOpen, Award, Bookmark, MessageSquare, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import PaperCard from "@/components/PaperCard";
import ProgressBar from "@/components/ProgressBar";
import MatchScore from "@/components/MatchScore";
import Footer from "@/components/Footer";
import { PixelGraduation, PixelDocument, PixelChip, PixelStar } from "@/components/PixelIcons";
import { skillGaps, opportunities } from "@/lib/mockData";
import { Link } from "react-router";

const profile = { name: "Shubham", email: "shubham@example.com", education: "BCA — 3rd Year, Delhi University", goal: "ML Engineer", interests: ["AI & ML", "Data Science", "Cloud Computing"], reputation: 245 };

export default function Profile() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <PaperCard className="text-center">
                <div className="w-20 h-20 bg-forest border-[3px] border-[#2A4A35] shadow-[4px_4px_0px_#2A4A35] flex items-center justify-center text-2xl font-bold text-cream mx-auto mb-3 pixel">{profile.name[0]}</div>
                <h1 className="text-xl font-extrabold text-ink mb-1 tracking-tight">{profile.name}</h1>
                <p className="text-[11px] text-ink-muted sans mb-3">{profile.email}</p>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#D4A843]/10 border-2 border-[#D4A843] text-[8px] font-bold text-[#8A6A20] pixel mb-4"><PixelStar className="text-[#D4A843]" size={12} /> {profile.reputation} REP</div>
                <div className="pixel-divider my-4" />
                <div className="text-left space-y-3">
                  <div><p className="section-pixel mb-1">Education</p><p className="text-[12px] text-ink font-semibold sans">{profile.education}</p></div>
                  <div><p className="section-pixel mb-1">Career Goal</p><p className="text-[12px] text-ink font-semibold sans">{profile.goal}</p></div>
                  <div><p className="section-pixel mb-1">Interests</p><div className="flex flex-wrap gap-1.5 mt-1">{profile.interests.map((i) => <span key={i} className="tag-pixel text-[8px]">{i}</span>)}</div></div>
                </div>
              </PaperCard>
            </motion.div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-[15px] font-extrabold text-ink mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue" /> Skills</h2>
              <PaperCard className="space-y-3">{skillGaps.map((s) => <ProgressBar key={s.skill} label={s.skill} progress={s.progress} completed={s.completed} />)}</PaperCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="text-[15px] font-extrabold text-ink mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-forest" /> Certifications</h2>
              <PaperCard>
                <div className="space-y-3">
                  {["Python for Data Science — IBM", "SQL Fundamentals — HackerRank", "Git & GitHub — Coursera"].map((c) => (
                    <div key={c} className="flex items-center gap-3 pb-3 border-b-[2px] border-border last:border-0 last:pb-0">
                      <span className="pixel-verified text-[5px] py-0">✓</span>
                      <p className="text-[12px] text-ink font-semibold sans">{c}</p>
                    </div>
                  ))}
                </div>
              </PaperCard>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-[15px] font-extrabold text-ink mb-3 flex items-center gap-2"><Bookmark className="w-4 h-4 text-yellow" /> Saved Opportunities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {opportunities.slice(0, 4).map((opp) => (
                  <Link key={opp.id} to={`/opportunity/${opp.id}`} className="pixel-card-sm bg-card p-4 group">
                    <p className="text-[12px] font-bold text-ink group-hover:text-forest transition-colors mb-1">{opp.title}</p>
                    <p className="text-[10px] text-ink-muted sans mb-2">{opp.provider}</p>
                    <MatchScore score={opp.matchPercentage} size="sm" />
                  </Link>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="text-[15px] font-extrabold text-ink mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-purple" /> Community Activity</h2>
              <PaperCard><p className="text-[12px] text-ink-muted sans">12 posts · 48 comments · 3 questions answered</p></PaperCard>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
