import { motion } from "framer-motion";
import { Link } from "react-router";
import { BookOpen, GraduationCap, Briefcase, Award, Clock, MapPin, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Opportunity } from "@/lib/types";
import MatchScore from "./MatchScore";
import VerifiedBadge from "./VerifiedBadge";

const typeConfig = {
  course: { icon: BookOpen, badge: "badge-blue", label: "Course" },
  scholarship: { icon: GraduationCap, badge: "badge-teal", label: "Scholarship" },
  internship: { icon: Briefcase, badge: "badge-orange", label: "Internship" },
  job: { icon: Award, badge: "badge-purple", label: "Job" },
};

interface OpportunityCardProps { opportunity: Opportunity; index?: number; compact?: boolean; }

export default function OpportunityCard({ opportunity, index = 0, compact }: OpportunityCardProps) {
  const cfg = typeConfig[opportunity.type];
  const Icon = cfg.icon;

  if (compact) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }}>
        <Link to={`/opportunity/${opportunity.id}`} className="block group">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className={`badge ${cfg.badge} rounded-full text-[9px]`}><Icon className="w-3 h-3" /> {cfg.label}</span>
              <MatchScore score={opportunity.matchPercentage} size="sm" />
            </div>
            <h3 className="font-semibold text-[13px] text-white/90 mb-1 leading-snug group-hover:text-[#A8C8FF] transition-colors">{opportunity.title}</h3>
            <p className="text-[11px] text-white/35 mb-2 sans">{opportunity.provider}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-white/25 sans">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opportunity.duration}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opportunity.location}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }}>
      <Link to={`/opportunity/${opportunity.id}`} className="block group">
        <div className="glass-card rounded-2xl p-5 h-full">
          <div className="flex items-start justify-between gap-2 mb-3">
            <span className={`badge ${cfg.badge} rounded-full`}><Icon className="w-3 h-3" /> {cfg.label}</span>
            <div className="flex items-center gap-2">
              <MatchScore score={opportunity.matchPercentage} />
              {opportunity.verified && <VerifiedBadge />}
            </div>
          </div>
          <h3 className="font-semibold text-[14px] text-white/90 mb-1 leading-snug group-hover:text-white transition-colors">{opportunity.title}</h3>
          <p className="text-[12px] text-white/35 mb-3 sans">{opportunity.provider}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-white/25 mb-3 sans">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opportunity.duration}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opportunity.location}</span>
            <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{opportunity.cost}</span>
          </div>
          <p className="text-[11px] text-white/25 italic mb-3">"{opportunity.whyRecommended}"</p>
          <div className="flex flex-wrap gap-1.5">
            {opportunity.skills.slice(0, 3).map((s) => (
              <span key={s} className="px-2 py-0.5 bg-white/[0.05] border border-white/[0.06] rounded-full text-[9px] text-white/40 sans">{s}</span>
            ))}
            {opportunity.skills.length > 3 && <span className="text-[9px] text-white/20 sans">+{opportunity.skills.length - 3}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
