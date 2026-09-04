"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  GraduationCap,
  Building2,
  BookOpen,
  ShieldCheck,
  ArrowUpRight,
  Users,
  Briefcase,
  Award,
  BarChart3,
} from "lucide-react";

const ROLES = [
  {
    icon: GraduationCap,
    title: "Student",
    desc: "Discover courses, scholarships, internships and jobs matched to your skills and goals.",
    color: "#22C55E",
    tag: "Learner",
    stat: "50K+",
    statLabel: "Active Learners",
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.03) 50%, rgba(16,185,129,0.06) 100%)",
    borderGlow: "rgba(34,197,94,0.2)",
    iconBg: "rgba(34,197,94,0.12)",
    decorColor: "rgba(34,197,94,0.06)",
  },
  {
    icon: Building2,
    title: "Industry",
    desc: "Post opportunities, find verified talent and access real-time skill analytics.",
    color: "#3B82F6",
    tag: "Hirer",
    stat: "500+",
    statLabel: "Partner Companies",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.03) 50%, rgba(99,102,241,0.06) 100%)",
    borderGlow: "rgba(59,130,246,0.2)",
    iconBg: "rgba(59,130,246,0.12)",
    decorColor: "rgba(59,130,246,0.06)",
  },
  {
    icon: BookOpen,
    title: "Academician",
    desc: "Track student outcomes, publish verified courses and collaborate with industry.",
    color: "#F59E0B",
    tag: "Educator",
    stat: "200+",
    statLabel: "Institutions",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.03) 50%, rgba(251,191,36,0.06) 100%)",
    borderGlow: "rgba(245,158,11,0.2)",
    iconBg: "rgba(245,158,11,0.12)",
    decorColor: "rgba(245,158,11,0.06)",
  },
  {
    icon: ShieldCheck,
    title: "Institution Admin",
    desc: "Manage placements, verify credentials and view institution-wide placement analytics.",
    color: "#A855F7",
    tag: "Admin",
    stat: "95%",
    statLabel: "Placement Rate",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.03) 50%, rgba(139,92,246,0.06) 100%)",
    borderGlow: "rgba(168,85,247,0.2)",
    iconBg: "rgba(168,85,247,0.12)",
    decorColor: "rgba(168,85,247,0.06)",
  },
];

export default function RolesPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#22C55E]">
              Who It's For
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E1E0CC] tracking-tight leading-[1.08]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Built for every
            <br />
            <span className="text-[#22C55E]">role in education.</span>
          </h2>
        </motion.div>

        {/* ===== MOBILE ===== */}
        <div className="lg:hidden grid grid-cols-2 gap-3">
          {ROLES.map((role, i) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="group rounded-xl border p-4 flex flex-col gap-3 relative overflow-hidden"
                style={{ background: role.gradient, borderColor: `${role.color}18` }}
              >
                {/* Decorative blob */}
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-[0.08]" style={{ background: role.color }} />

                <div className="relative z-10">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: role.iconBg }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: role.color }} strokeWidth={2} />
                  </div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {role.title}
                    </h3>
                    <span className="text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ color: role.color, background: `${role.color}15` }}>
                      {role.tag}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/40 leading-relaxed line-clamp-3">
                    {role.desc}
                  </p>
                </div>

                {/* Stat */}
                <div className="relative z-10 mt-auto pt-2 border-t" style={{ borderColor: `${role.color}12` }}>
                  <p className="text-lg font-bold leading-none" style={{ color: role.color, fontFamily: "'Syne', sans-serif" }}>
                    {role.stat}
                  </p>
                  <p className="text-[8px] text-white/30 mt-0.5">{role.statLabel}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ===== DESKTOP — asymmetric bento ===== */}
        <div className="hidden lg:grid grid-cols-12 gap-5">

          {/* ── Student — tall left column ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-5 row-span-2 rounded-2xl border p-8 flex flex-col justify-between relative overflow-hidden group"
            style={{ background: ROLES[0].gradient, borderColor: `${ROLES[0].color}18` }}
          >
            {/* Decorative: dot grid */}
            <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-500" style={{
              backgroundImage: `radial-gradient(circle, ${ROLES[0].color} 1px, transparent 1px)`,
              backgroundSize: "18px 18px",
            }} />
            {/* Decorative: large circle */}
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-[0.04] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-700" style={{ background: `radial-gradient(circle, ${ROLES[0].color}, transparent 70%)` }} />
            {/* Decorative: diagonal line */}
            <div className="absolute top-0 right-0 w-px h-full opacity-[0.06] origin-top rotate-12 translate-x-16" style={{ background: `linear-gradient(to bottom, transparent, ${ROLES[0].color}, transparent)` }} />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ background: ROLES[0].iconBg }}>
                <GraduationCap className="w-7 h-7" style={{ color: ROLES[0].color }} strokeWidth={1.8} />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Student
                </h3>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ color: ROLES[0].color, background: `${ROLES[0].color}12` }}>
                  Learner
                </span>
              </div>

              <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-8">
                {ROLES[0].desc}
              </p>
            </div>

            {/* Bottom: stat + CTA */}
            <div className="relative z-10">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-4xl font-black tracking-tight leading-none" style={{ color: ROLES[0].color, fontFamily: "'Syne', sans-serif" }}>
                    {ROLES[0].stat}
                  </p>
                  <p className="text-[11px] text-white/30 mt-1.5">{ROLES[0].statLabel}</p>
                </div>
                <div className="flex gap-1">
                  {[40, 65, 50, 80, 55, 70, 45].map((h, j) => (
                    <div key={j} className="w-1.5 rounded-full opacity-20 group-hover:opacity-40 transition-opacity" style={{ height: `${h * 0.4}px`, background: ROLES[0].color }} />
                  ))}
                </div>
              </div>
              <a href="/login" className="inline-flex items-center gap-2.5 text-xs font-bold transition-all duration-300 group-hover:gap-4" style={{ color: ROLES[0].color, fontFamily: "'Syne', sans-serif" }}>
                Get started as Student
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* ── Industry — wide top-right ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-7 rounded-2xl border p-8 flex flex-col justify-between relative overflow-hidden group"
            style={{ background: ROLES[1].gradient, borderColor: `${ROLES[1].color}18` }}
          >
            {/* Decorative circle */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-[0.04] group-hover:opacity-[0.07] transition-all duration-700" style={{ background: `radial-gradient(circle, ${ROLES[1].color}, transparent 70%)` }} />
            {/* Decorative: horizontal line */}
            <div className="absolute bottom-0 left-0 h-px w-full opacity-[0.06]" style={{ background: `linear-gradient(to right, transparent, ${ROLES[1].color}, transparent)` }} />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: ROLES[1].iconBg }}>
                  <Building2 className="w-6 h-6" style={{ color: ROLES[1].color }} strokeWidth={1.8} />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Industry
                  </h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ color: ROLES[1].color, background: `${ROLES[1].color}12` }}>
                    Hirer
                  </span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                  {ROLES[1].desc}
                </p>
              </div>

              {/* Stat block */}
              <div className="text-right shrink-0 ml-6">
                <p className="text-3xl font-black tracking-tight leading-none" style={{ color: ROLES[1].color, fontFamily: "'Syne', sans-serif" }}>
                  {ROLES[1].stat}
                </p>
                <p className="text-[10px] text-white/30 mt-1">{ROLES[1].statLabel}</p>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t" style={{ borderColor: `${ROLES[1].color}10` }}>
              <a href="/login" className="inline-flex items-center gap-2.5 text-xs font-bold transition-all duration-300 group-hover:gap-4" style={{ color: ROLES[1].color, fontFamily: "'Syne', sans-serif" }}>
                Post opportunities
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* ── Academician — bottom-left ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="col-span-3 rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden group"
            style={{ background: ROLES[2].gradient, borderColor: `${ROLES[2].color}18` }}
          >
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-[0.05] group-hover:opacity-[0.08] transition-all duration-700" style={{ background: `radial-gradient(circle, ${ROLES[2].color}, transparent 70%)` }} />
            {/* Mini bar chart decoration */}
            <div className="absolute bottom-4 right-4 flex items-end gap-0.5 opacity-[0.10] group-hover:opacity-[0.18] transition-opacity">
              {[16, 24, 12, 28, 20, 32, 18, 26, 14, 22].map((h, j) => (
                <div key={j} className="w-1 rounded-full" style={{ height: `${h}px`, background: ROLES[2].color }} />
              ))}
            </div>

            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ background: ROLES[2].iconBg }}>
                <BookOpen className="w-5 h-5" style={{ color: ROLES[2].color }} strokeWidth={1.8} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Academician
                </h3>
                <span className="text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ color: ROLES[2].color, background: `${ROLES[2].color}12` }}>
                  Educator
                </span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">
                {ROLES[2].desc}
              </p>
            </div>

            <div className="relative z-10 mt-4 pt-3 border-t" style={{ borderColor: `${ROLES[2].color}10` }}>
              <p className="text-xl font-black leading-none" style={{ color: ROLES[2].color, fontFamily: "'Syne', sans-serif" }}>
                {ROLES[2].stat}
              </p>
              <p className="text-[9px] text-white/25 mt-1">{ROLES[2].statLabel}</p>
            </div>
          </motion.div>

          {/* ── Institution Admin — bottom-right ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="col-span-4 rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden group"
            style={{ background: ROLES[3].gradient, borderColor: `${ROLES[3].color}18` }}
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full opacity-[0.04] group-hover:opacity-[0.07] transition-all duration-700" style={{ background: `radial-gradient(circle, ${ROLES[3].color}, transparent 70%)` }} />
            {/* Decorative shield outline */}
            <div className="absolute bottom-3 right-3 opacity-[0.05] group-hover:opacity-[0.10] transition-opacity">
              <ShieldCheck className="w-20 h-20" style={{ color: ROLES[3].color }} strokeWidth={0.8} />
            </div>

            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110" style={{ background: ROLES[3].iconBg }}>
                <ShieldCheck className="w-5 h-5" style={{ color: ROLES[3].color }} strokeWidth={1.8} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Institution Admin
                </h3>
                <span className="text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={{ color: ROLES[3].color, background: `${ROLES[3].color}12` }}>
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">
                {ROLES[3].desc}
              </p>
            </div>

            <div className="relative z-10 mt-4 pt-3 border-t" style={{ borderColor: `${ROLES[3].color}10` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-black leading-none" style={{ color: ROLES[3].color, fontFamily: "'Syne', sans-serif" }}>
                    {ROLES[3].stat}
                  </p>
                  <p className="text-[9px] text-white/25 mt-1">{ROLES[3].statLabel}</p>
                </div>
                {/* Mini progress ring */}
                <div className="relative w-10 h-10">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke={`${ROLES[3].color}15`} strokeWidth="3" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke={ROLES[3].color} strokeWidth="3" strokeDasharray="88" strokeDashoffset="4.4" strokeLinecap="round" className="opacity-30 group-hover:opacity-60 transition-opacity" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
