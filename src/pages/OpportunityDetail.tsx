import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, IndianRupee, Calendar, Users, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import MatchScore from "@/components/MatchScore";
import VerifiedBadge from "@/components/VerifiedBadge";
import PaperCard from "@/components/PaperCard";
import Footer from "@/components/Footer";
import { opportunities } from "@/lib/mockData";

const typeLabel: Record<string, string> = { course: "Course", scholarship: "Scholarship", internship: "Internship", job: "Job" };
const typeBadge: Record<string, string> = { course: "badge-blue", scholarship: "badge-teal", internship: "badge-orange", job: "badge-purple" };

export default function OpportunityDetail() {
  const { id } = useParams();
  const opp = opportunities.find((o) => o.id === id) || opportunities[0];

  return (
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-[12px] text-white/30 hover:text-white/60 transition-colors mb-6 sans"><ArrowLeft className="w-3.5 h-3.5" /> Back to Explore</Link>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7C6BF0]/[0.03] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge ${typeBadge[opp.type]} rounded-full`}>{typeLabel[opp.type]}</span>
                    {opp.verified && <VerifiedBadge />}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">{opp.title}</h1>
                  <p className="text-[13px] text-white/35 sans">{opp.provider}</p>
                </div>
                <MatchScore score={opp.matchPercentage} size="lg" showBar />
              </div>
              <div className="divider mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Clock, label: "Duration", value: opp.duration },
                  { icon: MapPin, label: "Location", value: opp.location },
                  { icon: IndianRupee, label: "Cost", value: opp.cost },
                  { icon: Calendar, label: "Deadline", value: opp.deadline },
                  { icon: Users, label: "Eligibility", value: opp.eligibility },
                  { icon: BookOpen, label: "Mode", value: opp.mode.charAt(0).toUpperCase() + opp.mode.slice(1) },
                ].map((d) => (
                  <div key={d.label} className="glass rounded-xl p-3">
                    <p className="text-[9px] font-semibold text-white/25 uppercase tracking-wider mb-1 sans flex items-center gap-1"><d.icon className="w-3 h-3" /> {d.label}</p>
                    <p className="text-[12px] text-white/70 font-medium sans">{d.value}</p>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-2 sans">About</h3>
                <p className="text-[13px] text-white/50 leading-relaxed">{opp.description}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-2 sans">Skills Gained</h3>
                <div className="flex flex-wrap gap-1.5">{opp.skills.map((s) => <span key={s} className="px-2.5 py-1 bg-white/[0.05] border border-white/[0.06] rounded-full text-[11px] text-white/50 sans">{s}</span>)}</div>
              </div>
              <div className="mb-8">
                <h3 className="text-[11px] font-semibold text-white/30 uppercase tracking-wider mb-2 sans">Why This Matches You</h3>
                <div className="glass rounded-xl p-4"><p className="text-[12px] text-white/45 italic">"{opp.whyRecommended}"</p></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white text-[13px] font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all sans">Apply Now <ArrowRight className="w-4 h-4" /></button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 glass text-white/50 text-[13px] font-medium rounded-xl hover:text-white hover:bg-white/[0.06] transition-all sans">Save Opportunity</button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 glass text-white/50 text-[13px] font-medium rounded-xl hover:text-white hover:bg-white/[0.06] transition-all sans">Discuss</button>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="mt-6">
          <PaperCard>
            <div className="flex items-center justify-between">
              <div><p className="text-[13px] font-semibold text-white/80">23 people are discussing this opportunity</p><p className="text-[11px] text-white/25 sans mt-0.5">Get answers from students who've applied</p></div>
              <a href="/community" className="inline-flex items-center gap-1.5 px-4 py-1.5 glass text-[11px] font-medium text-white/50 rounded-xl hover:text-white hover:bg-white/[0.06] transition-all sans">Join Discussion</a>
            </div>
          </PaperCard>
        </div>
      </div>
      <Footer />
    </div>
  );
}
