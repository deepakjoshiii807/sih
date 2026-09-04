"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Inline SVG illustrations ─── */

function MatchingIllustration() {
  return (
    <div className="w-full aspect-[4/3] rounded-xl bg-[#0e0e14] border border-white/[0.06] overflow-hidden relative flex items-center justify-center">
      {/* Grid dots */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, #22C55E 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }} />
      <svg viewBox="0 0 200 150" className="w-4/5 h-4/5 relative z-10">
        {/* Radar rings */}
        {[30, 50, 70].map((r) => (
          <circle key={r} cx="100" cy="75" r={r} fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth="1" />
        ))}
        {/* Cross lines */}
        <line x1="100" y1="5" x2="100" y2="145" stroke="rgba(34,197,94,0.08)" strokeWidth="1" />
        <line x1="30" y1="75" x2="170" y2="75" stroke="rgba(34,197,94,0.08)" strokeWidth="1" />
        {/* Skill polygon */}
        <polygon
          points="100,30 130,55 145,90 110,110 70,105 55,70 75,40"
          fill="rgba(34,197,94,0.15)"
          stroke="#22C55E"
          strokeWidth="1.5"
        />
        {/* Data points */}
        {[
          [100, 30], [130, 55], [145, 90], [110, 110], [70, 105], [55, 70], [75, 40],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#22C55E" stroke="#0e0e14" strokeWidth="2" />
        ))}
        {/* Center dot */}
        <circle cx="100" cy="75" r="2" fill="#22C55E" opacity="0.5" />
        {/* Pulsing ring */}
        <circle cx="100" cy="75" r="12" fill="none" stroke="#22C55E" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function ProfileIllustration() {
  return (
    <div className="w-full aspect-[4/3] rounded-xl bg-[#0e0e14] border border-white/[0.06] overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, #22C55E 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }} />
      <svg viewBox="0 0 200 150" className="w-4/5 h-4/5 relative z-10">
        {/* Shield */}
        <path
          d="M100 20 L140 40 L140 80 Q140 115 100 135 Q60 115 60 80 L60 40 Z"
          fill="none"
          stroke="rgba(34,197,94,0.3)"
          strokeWidth="2"
        />
        <path
          d="M100 28 L135 45 L135 78 Q135 108 100 126 Q65 108 65 78 L65 45 Z"
          fill="rgba(34,197,94,0.08)"
          stroke="rgba(34,197,94,0.15)"
          strokeWidth="1"
        />
        {/* Checkmark */}
        <polyline
          points="82,75 95,90 120,60"
          fill="none"
          stroke="#22C55E"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Floating badges */}
        <rect x="30" y="95" width="35" height="14" rx="7" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.5" />
        <text x="47" y="105" textAnchor="middle" fill="#22C55E" fontSize="6" fontWeight="bold">VERIFIED</text>

        <rect x="140" y="40" width="28" height="14" rx="7" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.2)" strokeWidth="0.5" />
        <text x="154" y="50" textAnchor="middle" fill="#22C55E" fontSize="5" fontWeight="bold">DL</text>

        <rect x="25" y="55" width="28" height="14" rx="7" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
        <text x="39" y="65" textAnchor="middle" fill="#3B82F6" fontSize="5" fontWeight="bold">SKILL</text>

        {/* Connecting dots */}
        {[[45, 80], [55, 85], [150, 65], [145, 72]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#22C55E" opacity="0.3" />
        ))}
      </svg>
    </div>
  );
}

function DiscoveryIllustration() {
  return (
    <div className="w-full aspect-[4/3] rounded-xl bg-[#0e0e14] border border-white/[0.06] overflow-hidden relative flex items-center justify-center">
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "radial-gradient(circle, #22C55E 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }} />
      <svg viewBox="0 0 200 150" className="w-4/5 h-4/5 relative z-10">
        {/* Magnifying glass */}
        <circle cx="85" cy="70" r="35" fill="none" stroke="rgba(34,197,94,0.25)" strokeWidth="2" />
        <circle cx="85" cy="70" r="35" fill="rgba(34,197,94,0.04)" />
        <line x1="112" y1="95" x2="140" y2="125" stroke="rgba(34,197,94,0.3)" strokeWidth="3" strokeLinecap="round" />

        {/* Opportunity cards inside lens */}
        <rect x="65" y="52" width="40" height="10" rx="3" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.15)" strokeWidth="0.5" />
        <rect x="68" y="54" width="15" height="3" rx="1.5" fill="rgba(34,197,94,0.3)" />
        <rect x="68" y="58" width="25" height="2" rx="1" fill="rgba(255,255,255,0.08)" />

        <rect x="65" y="66" width="40" height="10" rx="3" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" />
        <rect x="68" y="68" width="12" height="3" rx="1.5" fill="rgba(59,130,246,0.3)" />
        <rect x="68" y="72" width="20" height="2" rx="1" fill="rgba(255,255,255,0.08)" />

        <rect x="65" y="80" width="40" height="10" rx="3" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.15)" strokeWidth="0.5" />
        <rect x="68" y="82" width="18" height="3" rx="1.5" fill="rgba(245,158,11,0.3)" />
        <rect x="68" y="86" width="22" height="2" rx="1" fill="rgba(255,255,255,0.08)" />

        {/* Floating items outside */}
        <rect x="145" y="35" width="30" height="8" rx="4" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.15)" strokeWidth="0.5" />
        <text x="160" y="41" textAnchor="middle" fill="#22C55E" fontSize="4" fontWeight="bold">SCHOLARSHIP</text>

        <rect x="148" y="50" width="28" height="8" rx="4" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" />
        <text x="162" y="56" textAnchor="middle" fill="#3B82F6" fontSize="4" fontWeight="bold">INTERNSHIP</text>

        <rect x="150" y="65" width="26" height="8" rx="4" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.15)" strokeWidth="0.5" />
        <text x="163" y="71" textAnchor="middle" fill="#A855F7" fontSize="4" fontWeight="bold">COURSE</text>

        {/* Sparkle */}
        <circle cx="155" cy="90" r="1.5" fill="#22C55E" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="165" cy="82" r="1" fill="#22C55E" opacity="0.3">
          <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

const FEATURES = [
  {
    illustration: MatchingIllustration,
    title: "Smart Matching",
    desc: "AI-powered skill matching connects you with courses, scholarships and opportunities tailored to your profile and goals.",
  },
  {
    illustration: ProfileIllustration,
    title: "Verified Profiles",
    desc: "Build a trusted profile with DigiLocker-verified credentials, skill badges and a comprehensive learning portfolio.",
  },
  {
    illustration: DiscoveryIllustration,
    title: "Opportunity Discovery",
    desc: "Explore hundreds of curated opportunities across medical, Ayush and healthcare domains — all in one place.",
  },
];

export default function FeatureSections() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="w-full py-8 sm:py-16 px-4 sm:px-6" ref={ref}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        .feature-poppins * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <div className="feature-poppins max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-12"
        >
          <h1 className="text-xl sm:text-3xl font-semibold text-[#E1E0CC]">
            Powerful Features
          </h1>
          <p className="text-xs sm:text-sm text-white/40 mt-1 sm:mt-2">
            Everything you need to discover, track, and land the right opportunities — securely and efficiently.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {FEATURES.map((feature, i) => {
            const Illustration = feature.illustration;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="hover:-translate-y-0.5 transition duration-300"
              >
                <Illustration />
                <h3 className="text-base font-semibold text-[#E1E0CC] mt-4">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/40 mt-1">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
