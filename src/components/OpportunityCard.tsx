import { motion } from "framer-motion";
import { Link } from "react-router";
import { BookOpen, GraduationCap, Briefcase, Award, Clock, MapPin, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Opportunity } from "@/lib/types";
import MatchBadge from "./MatchBadge";
import VerifiedStamp from "./VerifiedStamp";

const typeIcons = {
  course: BookOpen,
  scholarship: GraduationCap,
  internship: Briefcase,
  job: Award,
};

const typeBadges = {
  course: "badge-blue",
  scholarship: "badge-teal",
  internship: "badge-orange",
  job: "badge-purple",
};

interface OpportunityCardProps {
  opportunity: Opportunity;
  index?: number;
  compact?: boolean;
}

export default function OpportunityCard({ opportunity, index = 0, compact = false }: OpportunityCardProps) {
  const Icon = typeIcons[opportunity.type];
  const badge = typeBadges[opportunity.type];

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.05 }}
      >
        <Link to={`/opportunity/${opportunity.id}`} className="block group">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className={cn("badge-glass rounded-full inline-flex items-center gap-1", badge)}>
                <Icon className="w-3 h-3" />
                {opportunity.type}
              </span>
              <MatchBadge percentage={opportunity.matchPercentage} />
            </div>
            <h3 className="font-semibold text-[14px] text-white mb-1 leading-snug group-hover:text-[#A8C8FF] transition-colors">
              {opportunity.title}
            </h3>
            <p className="text-[12px] text-white/40 mb-2">{opportunity.provider}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/30">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{opportunity.duration}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{opportunity.location}</span>
              <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{opportunity.cost}</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <Link to={`/opportunity/${opportunity.id}`} className="block group">
        <div className="glass-card rounded-2xl p-5 h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className={cn("badge-glass rounded-full inline-flex items-center gap-1.5", badge)}>
              <Icon className="w-3.5 h-3.5" />
              {opportunity.type}
            </span>
            <div className="flex items-center gap-2">
              <MatchBadge percentage={opportunity.matchPercentage} />
              {opportunity.verified && <VerifiedStamp />}
            </div>
          </div>

          <h3 className="font-semibold text-[15px] text-white mb-1 leading-snug group-hover:text-[#A8C8FF] transition-colors">
            {opportunity.title}
          </h3>
          <p className="text-[13px] text-white/40 mb-3">{opportunity.provider}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-white/30 mb-3">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{opportunity.duration}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{opportunity.location}</span>
            <span className="flex items-center gap-1.5"><IndianRupee className="w-3.5 h-3.5" />{opportunity.cost}</span>
          </div>

          <p className="text-[12px] text-white/30 italic mb-3">
            "{opportunity.whyRecommended}"
          </p>

          <div className="flex flex-wrap gap-1.5">
            {opportunity.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-white/[0.06] border border-white/[0.08] rounded-full text-[10px] text-white/50 font-medium">
                {skill}
              </span>
            ))}
            {opportunity.skills.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] text-white/25">
                +{opportunity.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
