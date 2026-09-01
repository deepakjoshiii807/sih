import { motion } from "framer-motion";
import { BookOpen, Award, Target, Bookmark, MessageSquare, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import PaperCard from "@/components/PaperCard";
import ProgressBar from "@/components/ProgressBar";
import MatchScore from "@/components/MatchScore";
import Footer from "@/components/Footer";
import { skillGaps, opportunities } from "@/lib/mockData";
import { Link } from "react-router";

const profile = {
  name: "Shubham Kumar",
  email: "shubham@example.com",
  education: "BCA — 3rd Year, Delhi University",
  goal: "ML Engineer",
  interests: ["AI & ML", "Data Science", "Cloud Computing"],
  reputation: 245,
};

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Profile card */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <PaperCard className="text-center relative">
                <div className="tape" />
                <div className="mt-3">
                  <div className="w-20 h-20 rounded-full bg-[#E8E4DA] flex items-center justify-center text-2xl font-bold text-[#7A7570] editorial mx-auto mb-3">
                    {profile.name[0]}
                  </div>
                  <h1 className="heading-lg text-xl text-[#1A1A1A] mb-1">{profile.name}</h1>
                  <p className="text-[12px] text-[#8A8580] sans-ui mb-3">{profile.email}</p>

                  <div className="stamp stamp-verified mx-auto mb-4">
                    <Star className="w-3 h-3" /> {profile.reputation} rep
                  </div>

                  <div className="rule mb-4" />

                  <div className="text-left space-y-2">
                    <div>
                      <p className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.12em] sans-ui">Education</p>
                      <p className="text-[12px] text-[#1A1A1A] font-medium sans-ui">{profile.education}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.12em] sans-ui">Career Goal</p>
                      <p className="text-[12px] text-[#1A1A1A] font-medium sans-ui">{profile.goal}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.12em] sans-ui">Interests</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {profile.interests.map((i) => (
                          <span key={i} className="tag tag-navy text-[8px]">{i}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </PaperCard>
            </motion.div>
          </div>

          {/* Right — Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="heading-md text-lg text-[#1A1A1A] mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#3D4F6F]" /> Skills
              </h2>
              <PaperCard className="space-y-3">
                {skillGaps.map((s) => (
                  <ProgressBar key={s.skill} label={s.skill} progress={s.progress} completed={s.completed} />
                ))}
              </PaperCard>
            </motion.div>

            {/* Certifications */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="heading-md text-lg text-[#1A1A1A] mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#7A8B6F]" /> Certifications
              </h2>
              <PaperCard>
                <div className="space-y-3">
                  {["Python for Data Science — IBM", "SQL Fundamentals — HackerRank", "Git & GitHub — Coursera"].map((cert) => (
                    <div key={cert} className="flex items-center gap-3 pb-3 border-b border-[#E8E4DA] last:border-0 last:pb-0">
                      <div className="stamp stamp-verified text-[7px] py-0">✓</div>
                      <p className="text-[12px] text-[#1A1A1A] sans-ui">{cert}</p>
                    </div>
                  ))}
                </div>
              </PaperCard>
            </motion.div>

            {/* Saved */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="heading-md text-lg text-[#1A1A1A] mb-3 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#B87654]" /> Saved Opportunities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {opportunities.slice(0, 4).map((opp, i) => (
                  <Link key={opp.id} to={`/opportunity/${opp.id}`} className="bg-[#FAF8F2] ink-border-subtle paper-shadow p-4 hover:-translate-y-0.5 hover:paper-shadow-hover transition-all group">
                    <p className="text-[13px] font-semibold text-[#1A1A1A] group-hover:text-[#3D4F6F] transition-colors editorial mb-1">{opp.title}</p>
                    <p className="text-[11px] text-[#8A8580] sans-ui mb-2">{opp.provider}</p>
                    <MatchScore score={opp.matchPercentage} size="sm" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Community */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="heading-md text-lg text-[#1A1A1A] mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#5B6B8A]" /> Community Activity
              </h2>
              <PaperCard>
                <p className="text-[13px] text-[#7A7570] body-lg">12 posts · 48 comments · 3 questions answered</p>
              </PaperCard>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
