import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin, IndianRupee, Calendar, Users, BookOpen, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import MatchScore from "@/components/MatchScore";
import VerifiedBadge from "@/components/VerifiedBadge";
import PaperCard from "@/components/PaperCard";
import Footer from "@/components/Footer";
import { PixelDocument, PixelGraduation, PixelBriefcase, PixelBuilding } from "@/components/PixelIcons";
import { opportunities } from "@/lib/mockData";

const typeLabel: Record<string, string> = { course: "Course", scholarship: "Scholarship", internship: "Internship", job: "Job" };
const typeBadge: Record<string, string> = { course: "badge-pixel-blue", scholarship: "badge-pixel-green", internship: "badge-pixel-peach", job: "badge-pixel-purple" };
const typeIcon: Record<string, typeof PixelDocument> = { course: PixelDocument, scholarship: PixelGraduation, internship: PixelBriefcase, job: PixelBuilding };

export default function OpportunityDetail() {
  const { id } = useParams();
  const opp = opportunities.find((o) => o.id === id) || opportunities[0];
  const Icon = typeIcon[opp.type];

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-[12px] text-ink-muted hover:text-ink transition-colors mb-6 sans"><ArrowLeft className="w-3.5 h-3.5" /> Back to Explore</Link>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="pixel-card bg-card p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-0 pixel-dots opacity-10 pointer-events-none" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge-pixel ${typeBadge[opp.type]}`}><Icon className="w-3 h-3" /> {typeLabel[opp.type]}</span>
                    {opp.verified && <VerifiedBadge />}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-ink mb-1 tracking-tight">{opp.title}</h1>
                  <p className="text-[13px] text-ink-muted sans">{opp.provider}</p>
                </div>
                <MatchScore score={opp.matchPercentage} size="lg" showBar />
              </div>
              <div className="pixel-divider mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Clock, label: "Duration", value: opp.duration },
                  { icon: MapPin, label: "Location", value: opp.location },
                  { icon: IndianRupee, label: "Cost", value: opp.cost },
                  { icon: Calendar, label: "Deadline", value: opp.deadline },
                  { icon: Users, label: "Eligibility", value: opp.eligibility },
                  { icon: BookOpen, label: "Mode", value: opp.mode.charAt(0).toUpperCase() + opp.mode.slice(1) },
                ].map((d) => (
                  <div key={d.label} className="pixel-card-sm bg-cream p-3">
                    <p className="pixel text-[7px] text-ink-muted mb-1 flex items-center gap-1"><d.icon className="w-3 h-3" /> {d.label}</p>
                    <p className="text-[12px] text-ink font-semibold sans">{d.value}</p>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <h3 className="section-pixel mb-2">About</h3>
                <p className="text-[13px] text-ink-light leading-relaxed">{opp.description}</p>
              </div>
              <div className="mb-6">
                <h3 className="section-pixel mb-2">Skills Gained</h3>
                <div className="flex flex-wrap gap-1.5">{opp.skills.map((s) => <span key={s} className="tag-pixel text-[10px]">{s}</span>)}</div>
              </div>
              <div className="mb-8">
                <h3 className="section-pixel mb-2">Why This Matches You</h3>
                <div className="pixel-sticky bg-cream p-4 shadow-[3px_3px_0px_var(--border)] border-2 border-border"><p className="text-[12px] text-ink-light italic">"{opp.whyRecommended}"</p></div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 pixel-btn pixel-btn-primary justify-center">Apply Now <ArrowRight className="w-3.5 h-3.5" /></button>
                <button className="flex-1 pixel-btn pixel-btn-secondary justify-center">Save Opportunity</button>
                <button className="flex-1 pixel-btn pixel-btn-secondary justify-center">Discuss</button>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="mt-6">
          <PaperCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-bold text-ink">23 people are discussing this opportunity</p>
                <p className="text-[11px] text-ink-muted sans mt-0.5">Get answers from students who've applied</p>
              </div>
              <a href="/community" className="pixel-btn pixel-btn-accent text-[7px] py-1.5">Join Discussion</a>
            </div>
          </PaperCard>
        </div>
      </div>
      <Footer />
    </div>
  );
}
