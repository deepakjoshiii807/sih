import { motion } from "framer-motion";
import { Link } from "react-router";
import { BookOpen, GraduationCap, Briefcase, Award, Clock, MapPin, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Opportunity } from "@/lib/types";
import MatchScore from "./MatchScore";
import VerifiedBadge from "./VerifiedBadge";

const typeConfig = {
  course: { icon: BookOpen, tag: "tag-navy", label: "Course" },
  scholarship: { icon: GraduationCap, tag: "tag-sage", label: "Scholarship" },
  internship: { icon: Briefcase, tag: "tag-terracotta", label: "Internship" },
  job: { icon: Award, tag: "tag-indigo", label: "Job" },
};

const rotations = [-0.5, 0.3, -0.8, 0.4, -0.2, 0.6];

interface OpportunityCardProps {
  opportunity: Opportunity;
  index?: number;
  compact?: boolean;
}

export default function OpportunityCard({ opportunity, index = 0, compact = false }: OpportunityCardProps) {
  const config = typeConfig[opportunity.type];
  const Icon = config.icon;
  const rotation = rotations[index % rotations.length];
  const tapeStyle = index % 3 === 0 ? "tape" : index % 3 === 1 ? "tape tape-right" : "";

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.05 }}
      >
        <Link to={`/opportunity/${opportunity.id}`} className="block group">
          <div className="bg-[#FAF8F2] ink-border-subtle paper-shadow p-4 transition-all duration-200 group-hover:paper-shadow-hover group-hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className={cn("tag", config.tag)}>
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
              </span>
              <MatchScore score={opportunity.matchPercentage} size="sm" />
            </div>
            <h3 className="font-semibold text-[14px] text-[#1A1A1A] mb-1 leading-snug group-hover:text-[#3D4F6F] transition-colors editorial">
              {opportunity.title}
            </h3>
            <p className="text-[12px] text-[#7A7570] mb-2 sans-ui">{opportunity.provider}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[#8A8580] sans-ui">
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/opportunity/${opportunity.id}`} className="block group">
        <div
          className={cn(
            "bg-[#FAF8F2] ink-border-subtle paper-shadow p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:paper-shadow-hover relative",
            tapeStyle,
            index % 4 === 0 && "paperclip"
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className={cn("tag", config.tag)}>
              <Icon className="w-3 h-3 mr-1" />
              {config.label}
            </span>
            <div className="flex items-center gap-2">
              <MatchScore score={opportunity.matchPercentage} />
              {opportunity.verified && <VerifiedBadge />}
            </div>
          </div>

          <h3 className="font-bold text-[16px] text-[#1A1A1A] mb-1 leading-snug group-hover:text-[#3D4F6F] transition-colors editorial">
            {opportunity.title}
          </h3>
          <p className="text-[13px] text-[#7A7570] mb-3 sans-ui">{opportunity.provider}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-[#8A8580] mb-3 sans-ui">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{opportunity.duration}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{opportunity.location}</span>
            <span className="flex items-center gap-1.5"><IndianRupee className="w-3.5 h-3.5" />{opportunity.cost}</span>
          </div>

          <p className="text-[12px] text-[#7A7570] italic mb-3 body-lg">
            "{opportunity.whyRecommended}"
          </p>

          <div className="flex flex-wrap gap-1.5">
            {opportunity.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-[#E8E4DA] text-[10px] text-[#3D3D3D] font-medium sans-ui">
                {skill}
              </span>
            ))}
            {opportunity.skills.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] text-[#8A8580] sans-ui">+{opportunity.skills.length - 3}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
