import { useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, IndianRupee, Calendar, Users, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import MatchScore from "@/components/MatchScore";
import VerifiedBadge from "@/components/VerifiedBadge";
import PaperCard from "@/components/PaperCard";
import Footer from "@/components/Footer";
import { opportunities } from "@/lib/mockData";
import { Link } from "react-router";

const typeLabel: Record<string, string> = { course: "Course", scholarship: "Scholarship", internship: "Internship", job: "Job" };
const tagClass: Record<string, string> = { course: "tag-navy", scholarship: "tag-sage", internship: "tag-terracotta", job: "tag-indigo" };

export default function OpportunityDetail() {
  const { id } = useParams();
  const opp = opportunities.find((o) => o.id === id) || opportunities[0];

  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-[12px] text-[#7A7570] hover:text-[#1A1A1A] transition-colors mb-6 sans-ui">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
        </Link>

        {/* Document */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-[#FAF8F2] ink-border paper-shadow-lg p-6 sm:p-8 relative">
            {/* Tape */}
            <div className="tape" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 mt-2">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`tag ${tagClass[opp.type]}`}>{typeLabel[opp.type]}</span>
                  {opp.verified && <VerifiedBadge />}
                </div>
                <h1 className="heading-lg text-2xl sm:text-3xl text-[#1A1A1A] mb-1">{opp.title}</h1>
                <p className="text-[14px] text-[#7A7570] sans-ui">{opp.provider}</p>
              </div>
              <MatchScore score={opp.matchPercentage} size="lg" showBar />
            </div>

            <div className="rule mb-6" />

            {/* Details grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: Clock, label: "Duration", value: opp.duration },
                { icon: MapPin, label: "Location", value: opp.location },
                { icon: IndianRupee, label: "Cost", value: opp.cost },
                { icon: Calendar, label: "Deadline", value: opp.deadline },
                { icon: Users, label: "Eligibility", value: opp.eligibility },
                { icon: BookOpen, label: "Mode", value: opp.mode.charAt(0).toUpperCase() + opp.mode.slice(1) },
              ].map((d) => (
                <div key={d.label} className="p-3 bg-[#F0EEE6]">
                  <p className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.12em] mb-1 sans-ui flex items-center gap-1">
                    <d.icon className="w-3 h-3" /> {d.label}
                  </p>
                  <p className="text-[13px] text-[#1A1A1A] font-medium sans-ui">{d.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-[0.12em] mb-2 sans-ui">About</h3>
              <p className="body-lg text-[14px] text-[#3D3D3D] leading-relaxed">{opp.description}</p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-[0.12em] mb-2 sans-ui">Skills Gained</h3>
              <div className="flex flex-wrap gap-2">
                {opp.skills.map((s) => (
                  <span key={s} className="px-3 py-1 bg-[#E8E4DA] text-[12px] text-[#3D3D3D] font-medium sans-ui">{s}</span>
                ))}
              </div>
            </div>

            {/* Why this matches */}
            <div className="mb-8">
              <h3 className="text-[12px] font-bold text-[#1A1A1A] uppercase tracking-[0.12em] mb-2 sans-ui">Why This Matches You</h3>
              <div className="bg-[#F5F0E4] p-4 ink-border-subtle">
                <p className="body-lg text-[13px] text-[#3D3D3D] italic">"{opp.whyRecommended}"</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="btn-paper btn-ink flex-1 justify-center">Apply Now <ArrowRight className="w-4 h-4" /></button>
              <button className="btn-paper btn-outline flex-1 justify-center">Save Opportunity</button>
              <button className="btn-paper btn-ghost flex-1 justify-center">Discuss</button>
            </div>
          </div>
        </motion.div>

        {/* Community preview */}
        <div className="mt-8">
          <PaperCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-semibold text-[#1A1A1A] editorial">23 people are discussing this opportunity</p>
                <p className="text-[11px] text-[#8A8580] sans-ui mt-0.5">Get answers from students who've applied</p>
              </div>
              <a href="/community" className="btn-paper btn-outline text-[11px]">Join Discussion</a>
            </div>
          </PaperCard>
        </div>
      </div>

      <Footer />
    </div>
  );
}
