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
    tag: "Learner",
    stat: "50K+",
    statLabel: "Active Learners",
  },
  {
    icon: Building2,
    title: "Industry",
    desc: "Post opportunities, find verified talent and access real-time skill analytics.",
    tag: "Hirer",
    stat: "500+",
    statLabel: "Partner Companies",
  },
  {
    icon: BookOpen,
    title: "Academician",
    desc: "Track student outcomes, publish verified courses and collaborate with industry.",
    tag: "Educator",
    stat: "200+",
    statLabel: "Institutions",
  },
  {
    icon: ShieldCheck,
    title: "Institution Admin",
    desc: "Manage placements, verify credentials and view institution-wide placement analytics.",
    tag: "Admin",
    stat: "95%",
    statLabel: "Placement Rate",
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
                className="group rounded-xl border border-white/[0.06] bg-[#0e0e14] p-4 flex flex-col gap-3 relative overflow-hidden"
              >
                {/* Top-right accent dot */}
                <div className="absolute top-3 right-3 w-1 h-1 rounded-full bg-[#22C55E] opacity-40" />

                <div className="w-9 h-9 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-[#22C55E]" strokeWidth={2} />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {role.title}
                    </h3>
                    <span className="text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">
                      {role.tag}
                    </span>
                  </div>
                  <p className="text-[10px] text-white/35 leading-relaxed line-clamp-3">
                    {role.desc}
                  </p>
                </div>

                <div className="mt-auto pt-2 border-t border-white/[0.04]">
                  <p className="text-lg font-bold text-[#22C55E] leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {role.stat}
                  </p>
                  <p className="text-[8px] text-white/25 mt-0.5">{role.statLabel}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ===== DESKTOP — asymmetric bento ===== */}
        <div className="hidden lg:grid grid-cols-12 gap-5">

          {/* ── Student — tall left ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-5 row-span-2 rounded-2xl border border-white/[0.06] bg-[#0e0e14] p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Subtle dot grid */}
            <div className="absolute inset-0 opacity-[0.025]" style={{
              backgroundImage: "radial-gradient(circle, rgba(34,197,94,0.6) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }} />
            {/* Bottom-right glow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-700" style={{ background: "radial-gradient(circle, #22C55E, transparent 70%)" }} />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-xl bg-[#22C55E]/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#22C55E]/15">
                <GraduationCap className="w-7 h-7 text-[#22C55E]" strokeWidth={1.8} />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Student
                </h3>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E]">
                  Learner
                </span>
              </div>

              <p className="text-sm text-white/35 leading-relaxed max-w-xs mb-8">
                {ROLES[0].desc}
              </p>
            </div>

            <div className="relative z-10">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <p className="text-4xl font-black tracking-tight leading-none text-[#22C55E]" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {ROLES[0].stat}
                  </p>
                  <p className="text-[11px] text-white/25 mt-1.5">{ROLES[0].statLabel}</p>
                </div>
                {/* Mini bar decoration */}
                <div className="flex items-end gap-1">
                  {[40, 65, 50, 80, 55, 70, 45].map((h, j) => (
                    <div key={j} className="w-1.5 rounded-full bg-[#22C55E]/15 group-hover:bg-[#22C55E]/25 transition-colors" style={{ height: `${h * 0.4}px` }} />
                  ))}
                </div>
              </div>
              <a href="/login" className="inline-flex items-center gap-2.5 text-xs font-bold text-[#22C55E] transition-all duration-300 group-hover:gap-4" style={{ fontFamily: "'Syne', sans-serif" }}>
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
            className="col-span-7 rounded-2xl border border-white/[0.06] bg-[#0e0e14] p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Subtle top-right glow */}
            <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700" style={{ background: "radial-gradient(circle, #22C55E, transparent 70%)" }} />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#22C55E]/15">
                  <Building2 className="w-6 h-6 text-[#22C55E]" strokeWidth={1.8} />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Industry
                  </h3>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#22C55E]/10 text-[#22C55E]">
                    Hirer
                  </span>
                </div>
                <p className="text-sm text-white/35 leading-relaxed max-w-sm">
                  {ROLES[1].desc}
                </p>
              </div>

              <div className="text-right shrink-0 ml-6">
                <p className="text-3xl font-black tracking-tight leading-none text-[#22C55E]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {ROLES[1].stat}
                </p>
                <p className="text-[10px] text-white/25 mt-1">{ROLES[1].statLabel}</p>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-5 border-t border-white/[0.04]">
              <a href="/login" className="inline-flex items-center gap-2.5 text-xs font-bold text-[#22C55E] transition-all duration-300 group-hover:gap-4" style={{ fontFamily: "'Syne', sans-serif" }}>
                Post opportunities
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* ── Academician — small bottom-left ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="col-span-3 rounded-2xl border border-white/[0.06] bg-[#0e0e14] p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Mini bar chart decoration */}
            <div className="absolute bottom-4 right-4 flex items-end gap-0.5 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity">
              {[16, 24, 12, 28, 20, 32, 18, 26, 14, 22].map((h, j) => (
                <div key={j} className="w-1 rounded-full bg-[#22C55E]" style={{ height: `${h}px` }} />
              ))}
            </div>

            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#22C55E]/15">
                <BookOpen className="w-5 h-5 text-[#22C55E]" strokeWidth={1.8} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Academician
                </h3>
                <span className="text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">
                  Educator
                </span>
              </div>
              <p className="text-[11px] text-white/35 leading-relaxed">
                {ROLES[2].desc}
              </p>
            </div>

            <div className="relative z-10 mt-4 pt-3 border-t border-white/[0.04]">
              <p className="text-xl font-black text-[#22C55E] leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                {ROLES[2].stat}
              </p>
              <p className="text-[9px] text-white/20 mt-1">{ROLES[2].statLabel}</p>
            </div>
          </motion.div>

          {/* ── Institution Admin — small bottom-right ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="col-span-4 rounded-2xl border border-white/[0.06] bg-[#0e0e14] p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Progress ring decoration */}
            <div className="absolute bottom-4 right-4 opacity-[0.08] group-hover:opacity-[0.14] transition-opacity">
              <svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="88" strokeDashoffset="4.4" strokeLinecap="round" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-[#22C55E]/15">
                <ShieldCheck className="w-5 h-5 text-[#22C55E]" strokeWidth={1.8} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Institution Admin
                </h3>
                <span className="text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E]">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-white/35 leading-relaxed">
                {ROLES[3].desc}
              </p>
            </div>

            <div className="relative z-10 mt-4 pt-3 border-t border-white/[0.04]">
              <p className="text-xl font-black text-[#22C55E] leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                {ROLES[3].stat}
              </p>
              <p className="text-[9px] text-white/20 mt-1">{ROLES[3].statLabel}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


