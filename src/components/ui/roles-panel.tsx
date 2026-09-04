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
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.12)",
    glow: "rgba(34,197,94,0.25)",
    tag: "Learner",
  },
  {
    icon: Building2,
    title: "Industry",
    desc: "Post opportunities, find verified talent and access real-time skill analytics.",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.12)",
    glow: "rgba(59,130,246,0.25)",
    tag: "Hirer",
  },
  {
    icon: BookOpen,
    title: "Academician",
    desc: "Track student outcomes, publish verified courses and collaborate with industry.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.12)",
    glow: "rgba(245,158,11,0.25)",
    tag: "Educator",
  },
  {
    icon: ShieldCheck,
    title: "Institution Admin",
    desc: "Manage placements, verify credentials and view institution-wide placement analytics.",
    color: "#A855F7",
    bg: "rgba(168,85,247,0.06)",
    border: "rgba(168,85,247,0.12)",
    glow: "rgba(168,85,247,0.25)",
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
                className="group rounded-xl border p-4 flex flex-col gap-3 relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: role.bg,
                  borderColor: role.border,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 30% 20%, ${role.glow}, transparent 70%)`,
                  }}
                />

                {/* Decorative corner */}
                <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-[0.07] transition-opacity group-hover:opacity-[0.12]" style={{ background: role.color }} />

                {/* Icon */}
                <div className="relative z-10">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${role.color}18` }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: role.color }} strokeWidth={2} />
                  </div>
                </div>

                {/* Text */}
                <div className="relative z-10">
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

                {/* Top-right dot */}
                <div
                  className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{ background: role.color }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ===== DESKTOP — asymmetric bento ===== */}
        <div className="hidden lg:grid grid-cols-12 gap-5">
          {/* Student — large, left spanning full height */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="col-span-5 row-span-2 rounded-2xl border p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-500"
            style={{ background: ROLES[0].bg, borderColor: ROLES[0].border }}
          >
            {/* Background glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse at 20% 80%, ${ROLES[0].glow}, transparent 60%)`,
              }}
            />

            {/* Decorative grid dots */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500" style={{
              backgroundImage: `radial-gradient(circle, ${ROLES[0].color} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }} />

            {/* Large decorative circle */}
            <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full opacity-[0.04] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700" style={{ background: ROLES[0].color }} />

            <div className="relative z-10">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ background: `${ROLES[0].color}15`, boxShadow: `0 0 0 0 ${ROLES[0].glow}` }}
              >
                <GraduationCap className="w-7 h-7" style={{ color: ROLES[0].color }} strokeWidth={1.8} />
              </div>

              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Student
                </h3>
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ color: ROLES[0].color, background: `${ROLES[0].color}12` }}
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
                className="inline-flex items-center gap-2.5 text-xs font-bold transition-all duration-300 group-hover:gap-4 group-hover:translate-x-1"
                style={{ color: ROLES[0].color, fontFamily: "'Syne', sans-serif" }}
              >
                Get started as Student
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Industry — wide top-right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-7 rounded-2xl border p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-500"
            style={{ background: ROLES[1].bg, borderColor: ROLES[1].border }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse at 80% 20%, ${ROLES[1].glow}, transparent 60%)`,
              }}
            />

            {/* Decorative circle */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-[0.04] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-700" style={{ background: ROLES[1].color }} />

            <div className="relative z-10">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${ROLES[1].color}15` }}
              >
                <Building2 className="w-5 h-5" style={{ color: ROLES[1].color }} strokeWidth={1.8} />
              </div>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Industry
                </h3>
                <span
                  className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ color: ROLES[1].color, background: `${ROLES[1].color}12` }}
                >
                  Hirer
                </span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                {ROLES[1].desc}
              </p>
            </div>
            <div className="relative z-10 mt-6">
              <a
                href="/login"
                className="inline-flex items-center gap-2.5 text-xs font-bold transition-all duration-300 group-hover:gap-4 group-hover:translate-x-1"
                style={{ color: ROLES[1].color, fontFamily: "'Syne', sans-serif" }}
              >
                Post opportunities
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>

          {/* Academician — small bottom-left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="col-span-3 rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-500"
            style={{ background: ROLES[2].bg, borderColor: ROLES[2].border }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse at 50% 80%, ${ROLES[2].glow}, transparent 60%)`,
              }}
            />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-700" style={{ background: ROLES[2].color }} />

            <div className="relative z-10">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${ROLES[2].color}15` }}
              >
                <BookOpen className="w-5 h-5" style={{ color: ROLES[2].color }} strokeWidth={1.8} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Academician
                </h3>
                <span
                  className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                  style={{ color: ROLES[2].color, background: `${ROLES[2].color}12` }}
                >
                  Educator
                </span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">
                {ROLES[2].desc}
              </p>
            </div>
          </motion.div>

          {/* Institution Admin — small bottom-center */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="col-span-4 rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-500"
            style={{ background: ROLES[3].bg, borderColor: ROLES[3].border }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `radial-gradient(ellipse at 50% 80%, ${ROLES[3].glow}, transparent 60%)`,
              }}
            />
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.04] group-hover:opacity-[0.08] transition-all duration-700" style={{ background: ROLES[3].color }} />

            <div className="relative z-10">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${ROLES[3].color}15` }}
              >
                <ShieldCheck className="w-5 h-5" style={{ color: ROLES[3].color }} strokeWidth={1.8} />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-bold text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Institution Admin
                </h3>
                <span
                  className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                  style={{ color: ROLES[3].color, background: `${ROLES[3].color}12` }}
                >
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-white/40 leading-relaxed">
                {ROLES[3].desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
