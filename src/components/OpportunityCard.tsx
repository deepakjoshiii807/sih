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

const typeColors = {
  course: "bg-[#3D4F6F]/8 text-[#3D4F6F] border-[#3D4F6F]/15",
  scholarship: "bg-[#7A8B6F]/8 text-[#7A8B6F] border-[#7A8B6F]/15",
  internship: "bg-[#B87654]/8 text-[#B87654] border-[#B87654]/15",
  job: "bg-[#5B6B8A]/8 text-[#5B6B8A] border-[#5B6B8A]/15",
};

const paperRotations = ["rotate-[-0.5deg]", "rotate-[0.3deg]", "rotate-[-0.8deg]", "rotate-[0.6deg]", "rotate-[-0.2deg]", "rotate-[0.4deg]"];

interface OpportunityCardProps {
  opportunity: Opportunity;
  index?: number;
  compact?: boolean;
}

export default function OpportunityCard({ opportunity, index = 0, compact = false }: OpportunityCardProps) {
  const Icon = typeIcons[opportunity.type];
  const rotation = paperRotations[index % paperRotations.length];
  const tapeAngle = index % 2 === 0 ? "-2deg" : "3deg";

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link
          to={`/opportunity/${opportunity.id}`}
          className="block group"
        >
          <div
            className={cn(
              "relative bg-[#FAF8F2] border border-[#D4CFC4] p-4 paper-shadow transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5",
              rotation
            )}
          >
            {/* Tape */}
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[rgba(255,248,220,0.65)] border border-[rgba(200,190,160,0.4)]"
              style={{ transform: `translateX(-50%) rotate(${tapeAngle})` }}
            />

            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wide border uppercase", typeColors[opportunity.type])}>
                  <Icon className="w-3 h-3" />
                  {opportunity.type}
                </span>
                {opportunity.verified && <VerifiedStamp />}
              </div>
              <MatchBadge percentage={opportunity.matchPercentage} />
            </div>

            <h3 className="font-serif font-bold text-[15px] text-[#1a1a1a] mb-1 leading-snug group-hover:text-[#3D4F6F] transition-colors">
              {opportunity.title}
            </h3>
            <p className="text-[12px] text-[#6B6560] mb-2">{opportunity.provider}</p>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#8A8580]">
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
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link
        to={`/opportunity/${opportunity.id}`}
        className="block group"
      >
        <div
          className={cn(
            "relative bg-[#FAF8F2] border border-[#D4CFC4] p-5 paper-shadow-lg transition-shadow duration-200 group-hover:shadow-xl",
            rotation,
            index % 3 === 0 ? "paper-clip" : "tape"
          )}
        >
          {/* Tape / clip decoration handled by class */}

          <div className="flex items-start justify-between gap-3 mb-3">
            <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold tracking-wide border uppercase", typeColors[opportunity.type])}>
              <Icon className="w-3.5 h-3.5" />
              {opportunity.type}
            </span>
            <div className="flex items-center gap-2">
              <MatchBadge percentage={opportunity.matchPercentage} />
              {opportunity.verified && <VerifiedStamp />}
            </div>
          </div>

          <h3 className="font-serif font-bold text-lg text-[#1a1a1a] mb-1 leading-snug group-hover:text-[#3D4F6F] transition-colors">
            {opportunity.title}
          </h3>
          <p className="text-sm text-[#6B6560] mb-3">{opportunity.provider}</p>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#8A8580] mb-3">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{opportunity.duration}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{opportunity.location}</span>
            <span className="flex items-center gap-1.5"><IndianRupee className="w-3.5 h-3.5" />{opportunity.cost}</span>
          </div>

          <p className="text-xs text-[#6B6560] italic mb-3">
            "{opportunity.whyRecommended}"
          </p>

          <div className="flex flex-wrap gap-1.5">
            {opportunity.skills.slice(0, 3).map((skill) => (
              <span key={skill} className="px-2 py-0.5 bg-[#E8E4DA] text-[10px] text-[#3D3D3D] font-medium">
                {skill}
              </span>
            ))}
            {opportunity.skills.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] text-[#8A8580]">
                +{opportunity.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
