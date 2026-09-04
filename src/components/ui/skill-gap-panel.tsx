"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { TrendingUp, Target, Zap, ArrowUpRight } from "lucide-react";

/* ─── Skill data (mock) ─── */
interface SkillPoint {
  label: string;
  your: number;   // 0-100
  demand: number; // 0-100
}

const SKILLS: SkillPoint[] = [
  { label: "Python",     your: 78, demand: 95 },
  { label: "Data Sci",   your: 62, demand: 88 },
  { label: "AI / ML",    your: 45, demand: 92 },
  { label: "Cloud",      your: 35, demand: 80 },
  { label: "DevOps",     your: 28, demand: 75 },
  { label: "React",      your: 70, demand: 85 },
  { label: "SQL",        your: 65, demand: 78 },
  { label: "Java",       your: 55, demand: 70 },
];

/* ─── Radar geometry helpers ─── */
const CX = 160, CY = 160, R = 120;
const N = SKILLS.length;
const angleStep = (2 * Math.PI) / N;

function polarToCartesian(value: number, index: number): [number, number] {
  const angle = index * angleStep - Math.PI / 2;
  const r = (value / 100) * R;
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

function buildPath(values: number[]): string {
  return values
    .map((v, i) => {
      const [x, y] = polarToCartesian(v, i);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ") + " Z";
}

/* ─── Radar Chart ─── */
function RadarChart({ animated }: { animated: boolean }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const gridLevels = [20, 40, 60, 80, 100];

  const yourPath = useMemo(() => buildPath(SKILLS.map((s) => s.your)), []);
  const demandPath = useMemo(() => buildPath(SKILLS.map((s) => s.demand)), []);

  return (
    <div className="relative w-full max-w-[340px] mx-auto aspect-square">
      <svg viewBox="0 0 320 320" className="w-full h-full">
        {/* Grid rings */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={Array.from({ length: N }, (_, i) => {
              const [x, y] = polarToCartesian(level, i);
              return `${x},${y}`;
            }).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {SKILLS.map((_, i) => {
          const [x, y] = polarToCartesian(100, i);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth={1}
            />
          );
        })}

        {/* Market Demand area */}
        <motion.path
          d={demandPath}
          fill="rgba(59,130,246,0.10)"
          stroke="#3B82F6"
          strokeWidth={2}
          initial={animated ? { opacity: 0, scale: 0.5 } : false}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Your Skills area */}
        <motion.path
          d={yourPath}
          fill="rgba(34,197,94,0.12)"
          stroke="#22C55E"
          strokeWidth={2}
          initial={animated ? { opacity: 0, scale: 0.5 } : false}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Data points — Your Skills */}
        {SKILLS.map((skill, i) => {
          const [x, y] = polarToCartesian(skill.your, i);
          const isHovered = hoveredIdx === i;
          return (
            <g
              key={`your-${i}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <circle cx={x} cy={y} r={isHovered ? 8 : 14} fill="transparent" />
              <motion.circle
                cx={x}
                cy={y}
                r={isHovered ? 5 : 4}
                fill="#22C55E"
                stroke="#0A0A0F"
                strokeWidth={2}
                initial={animated ? { r: 0 } : false}
                whileInView={{ r: isHovered ? 5 : 4 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
                viewport={{ once: true }}
              />
            </g>
          );
        })}

        {/* Data points — Demand */}
        {SKILLS.map((skill, i) => {
          const [x, y] = polarToCartesian(skill.demand, i);
          return (
            <motion.circle
              key={`demand-${i}`}
              cx={x}
              cy={y}
              r={3}
              fill="#3B82F6"
              stroke="#0A0A0F"
              strokeWidth={2}
              initial={animated ? { r: 0 } : false}
              whileInView={{ r: 3 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.05 }}
              viewport={{ once: true }}
            />
          );
        })}

        {/* Axis labels */}
        {SKILLS.map((skill, i) => {
          const [x, y] = polarToCartesian(115, i);
          const isHovered = hoveredIdx === i;
          return (
            <text
              key={`label-${i}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              className="text-[10px] font-medium select-none pointer-events-none"
              style={{
                fill: isHovered ? "#E1E0CC" : "rgba(225,224,204,0.5)",
                fontFamily: "'Syne', sans-serif",
                transition: "fill 0.2s",
              }}
            >
              {skill.label}
            </text>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hoveredIdx !== null && (
        <div className="absolute top-4 left-4 rounded-xl bg-[#111118] border border-white/10 px-4 py-3 text-xs z-10">
          <p className="font-bold text-[#E1E0CC] mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
            {SKILLS[hoveredIdx].label}
          </p>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-white/60">Your Level:</span>
            <span className="text-[#22C55E] font-bold">{SKILLS[hoveredIdx].your}%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span className="text-white/60">Market Demand:</span>
            <span className="text-[#3B82F6] font-bold">{SKILLS[hoveredIdx].demand}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Gap item ─── */
function GapItem({ skill, delay }: { skill: SkillPoint; delay: number }) {
  const gap = skill.demand - skill.your;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className="flex items-center gap-3 group"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-[#E1E0CC]" style={{ fontFamily: "'Syne', sans-serif" }}>
            {skill.label}
          </span>
          <span className="text-[10px] text-[#22C55E] font-bold">+{gap}% gap</span>
        </div>
        <div className="relative h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-[#22C55E]/40"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.your}%` }}
            transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          />
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-[#3B82F6]/60"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.demand}%` }}
            transition={{ duration: 0.8, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Panel ─── */
export default function SkillGapPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const avgGap = Math.round(
    SKILLS.reduce((acc, s) => acc + (s.demand - s.your), 0) / SKILLS.length
  );

  return (
    <section className="py-20 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-[#22C55E]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#22C55E]">
              Skill Intelligence
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E1E0CC] tracking-tight leading-[1.1]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            See where you stand.
            <br />
            <span className="text-[#22C55E]">Close the gap.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Radar chart — large panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl border border-white/[0.06] bg-[#0e0e14] p-6 sm:p-8 relative overflow-hidden"
          >
            {/* Decorative grid dots */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-white/40 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Interactive Skill Map
                  </p>
                  <p className="text-sm text-[#E1E0CC] font-medium" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Hover over a point to explore
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-white/40">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E]" /> Your Skills
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#3B82F6]" /> Market Demand
                  </span>
                </div>
              </div>

              <RadarChart animated={isInView} />
            </div>
          </motion.div>

          {/* Right column — stat cards + gap list */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Top stats row */}
            <div className="grid grid-cols-2 gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl border border-white/[0.06] bg-[#0e0e14] p-5 flex flex-col justify-between"
              >
                <Zap className="w-5 h-5 text-[#F59E0B] mb-3" />
                <div>
                  <p className="text-3xl font-bold text-[#E1E0CC] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {avgGap}%
                  </p>
                  <p className="text-[11px] text-white/40 mt-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Avg. Skill Gap
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-2xl border border-white/[0.06] bg-[#0e0e14] p-5 flex flex-col justify-between"
              >
                <TrendingUp className="w-5 h-5 text-[#22C55E] mb-3" />
                <div>
                  <p className="text-3xl font-bold text-[#E1E0CC] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {SKILLS.filter((s) => s.your >= s.demand * 0.8).length}
                  </p>
                  <p className="text-[11px] text-white/40 mt-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Skills Near Market
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Gap breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 rounded-2xl border border-white/[0.06] bg-[#0e0e14] p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs text-white/40" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Gap Analysis
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] font-bold">
                  {SKILLS.length} skills tracked
                </span>
              </div>

              <div className="space-y-4">
                {SKILLS.sort((a, b) => (b.demand - b.your) - (a.demand - a.your)).map((skill, i) => (
                  <GapItem key={skill.label} skill={skill} delay={0.3 + i * 0.06} />
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href="/login"
                className="group flex items-center justify-between rounded-2xl bg-[#22C55E] px-6 py-4 text-[#0A0A0F] transition-all hover:bg-[#16a34a]"
              >
                <span className="text-sm font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Get your personalized skill report
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
