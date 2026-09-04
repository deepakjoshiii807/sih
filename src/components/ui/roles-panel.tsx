"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  Building2,
  BookOpen,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const ROLES = [
  {
    icon: GraduationCap,
    title: "Student",
    desc: "Discover courses, scholarships, internships and jobs matched to your skills and goals.",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.15)",
    tag: "Learner",
  },
  {
    icon: Building2,
    title: "Industry",
    desc: "Post opportunities, find verified talent and access real-time skill analytics.",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.15)",
    tag: "Hirer",
  },
  {
    icon: BookOpen,
    title: "Academician",
    desc: "Track student outcomes, publish verified courses and collaborate with industry.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.15)",
    tag: "Educator",
  },
  {
    icon: ShieldCheck,
    title: "Institution Admin",
    desc: "Manage placements, verify credentials and view institution-wide placement analytics.",
    color: "#A855F7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.15)",
    tag: "Admin",
  },
];

export default function RolesPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-10 sm:py-20 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-14"
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#22C55E]">
              Who It's For
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#E1E0CC] tracking-tight leading-[1.1]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Built for every
            <br />
            <span className="text-[#22C55E]">role in education.</span>
          </h2>
        </motion.div>

        {/* ===== MOBILE — compact 2×2 grid ===== */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mb-5">
          {ROLES.map((role, i) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="rounded-xl border p-4 flex flex-col gap-3 relative overflow-hidden"
                style={{ background: role.bg, borderColor: role.border }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${role.color}18` }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: role.color }} strokeWidth={2} />
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {role.title}
                    </h3>
                    <span
                      className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                      style={{ color: role.color, background: `${role.color}15` }}
                    >
                      {role.tag}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed line-clamp-3">
                    {role.desc}
                  </p>
                </div>

                {/* Decorative corner dot */}
                <div
                  className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-40"
                  style={{ background: role.color }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ===== DESKTOP — asymmetric bento ===== */}
        <div className="hidden lg:grid grid-cols-12 gap-5">
          {/* Student — large */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-5 row-span-2 rounded-2xl border p-8 flex flex-col justify-between relative overflow-hidden"
            style={{ background: ROLES[0].bg, borderColor: ROLES[0].border }}
          >
            {/* Decorative grid dots */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `radial-gradient(circle, ${ROLES[0].color} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }} />

            <div className="relative z-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ background: `${ROLES[0].color}15` }}
              >
                <GraduationCap className="w-6 h-6" style={{ color: ROLES[0].color }} strokeWidth={1.8} />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Student
                </h3>
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ color: ROLES[0].color, background: `${ROLES[0].color}15` }}
                >
                  Learner
                </span>
              </div>

              <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                {ROLES[0].desc}
              </p>
            </div>

            <div className="relative z-10 mt-8">
              <a
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-bold transition-all hover:gap-3"
                style={{ color: ROLES[0].color, fontFamily: "'Syne', sans-serif" }}
              >
                Get started as Student
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Industry — medium */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-7 rounded-2xl border p-8 flex flex-col justify-between relative overflow-hidden"
            style={{ background: ROLES[1].bg, borderColor: ROLES[1].border }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${ROLES[1].color}15` }}
                >
                  <Building2 className="w-5 h-5" style={{ color: ROLES[1].color }} strokeWidth={1.8} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Industry
                  </h3>
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ color: ROLES[1].color, background: `${ROLES[1].color}15` }}
                  >
                    Hirer
                  </span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                  {ROLES[1].desc}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-bold transition-all hover:gap-3"
                style={{ color: ROLES[1].color, fontFamily: "'Syne', sans-serif" }}
              >
                Post opportunities
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Academician — small */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="col-span-3 rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden"
            style={{ background: ROLES[2].bg, borderColor: ROLES[2].border }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${ROLES[2].color}15` }}
            >
              <BookOpen className="w-4.5 h-4.5" style={{ color: ROLES[2].color }} strokeWidth={1.8} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                Academician
              </h3>
              <span
                className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                style={{ color: ROLES[2].color, background: `${ROLES[2].color}15` }}
              >
                Educator
              </span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed">
              {ROLES[2].desc}
            </p>
          </motion.div>

          {/* Institution Admin — small */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="col-span-4 rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden"
            style={{ background: ROLES[3].bg, borderColor: ROLES[3].border }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
              style={{ background: `${ROLES[3].color}15` }}
            >
              <ShieldCheck className="w-4.5 h-4.5" style={{ color: ROLES[3].color }} strokeWidth={1.8} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                Institution Admin
              </h3>
              <span
                className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                style={{ color: ROLES[3].color, background: `${ROLES[3].color}15` }}
              >
                Admin
              </span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed">
              {ROLES[3].desc}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
