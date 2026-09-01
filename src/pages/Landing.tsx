import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  BookOpen,
  ChevronRight,
  Zap,
  Star,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MatchBadge from "@/components/MatchBadge";
import VerifiedStamp from "@/components/VerifiedStamp";
import StickyNote from "@/components/StickyNote";
import ThreadCard from "@/components/ThreadCard";
import Footer from "@/components/Footer";
import { opportunities, threadPreviews, trustedSources, quickSearchTags } from "@/lib/mockData";

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Staggered word reveal ─── */
function HeroWords() {
  const words = ["Find", "the", "opportunity", "worth", "your", "next", "step."];
  return (
    <span className="block">
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-block mr-[0.3em]"
        >
          {w === "step." ? (
            <span className="gradient-text">{w}</span>
          ) : (
            w
          )}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Floating opportunity card ─── */
function FloatingCard({
  title,
  badge,
  badgeClass,
  detail,
  match,
  delay,
  x,
  y,
}: {
  title: string;
  badge: string;
  badgeClass: string;
  detail: string;
  match: number;
  delay: number;
  x: number;
  y: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute hidden lg:block"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="glass-card rounded-2xl p-4 w-56 cursor-default select-none">
          <div className="flex items-center gap-2 mb-2">
            <span className={`badge-glass rounded-full text-[9px] ${badgeClass}`}>{badge}</span>
            <VerifiedStamp />
          </div>
          <h4 className="font-semibold text-[12px] text-white/90 leading-snug mb-1">{title}</h4>
          <p className="text-[10px] text-white/30 mb-2">{detail}</p>
          <MatchBadge percentage={match} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Typing placeholder ─── */
function TypingPlaceholder() {
  const phrases = [
    "Find me a free AI course with certification",
    "Scholarships for BCA students in India",
    "Remote ML internships with stipend",
    "Best cybersecurity courses under ₹5,000",
  ];
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[idx];
    const timer = setTimeout(
      () => {
        if (!deleting) {
          setCharIdx((c) => c + 1);
          if (charIdx === phrase.length) {
            setTimeout(() => setDeleting(true), 2000);
          }
        } else {
          setCharIdx((c) => c - 1);
          if (charIdx === 0) {
            setDeleting(false);
            setIdx((i) => (i + 1) % phrases.length);
          }
        }
      },
      deleting ? 30 : 55
    );
    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx]);

  return (
    <span className="text-white/20">
      {phrases[idx].slice(0, charIdx)}
      <span className="animate-pulse text-white/40">|</span>
    </span>
  );
}

/* ─── Main Landing ─── */
export default function Landing() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="ambient-glow" />

      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center">
        {/* Floating background orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] w-72 h-72 rounded-full bg-[#6C5CE7]/[0.04] blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-[10%] w-96 h-96 rounded-full bg-[#5B8DEF]/[0.03] blur-3xl pointer-events-none"
        />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left content — takes 7 cols */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-xs text-white/40 font-medium mb-6"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#6C5CE7]" />
                  AI-powered career discovery — built for India
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white leading-[1.08] tracking-tight mb-6">
                  <HeroWords />
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-base sm:text-lg text-white/35 leading-relaxed mb-10 max-w-xl"
                >
                  Stop scrolling through hundreds of tabs. Opportune scans courses, scholarships, internships and jobs — then hands you the ones that actually fit.
                </motion.p>

                {/* Search */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="mb-4"
                >
                  <SearchBar size="large" />
                </motion.div>

                {/* Quick tags */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {quickSearchTags.map((tag) => (
                    <a
                      key={tag}
                      href={`/explore?q=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-[11px] font-medium text-white/30 glass rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
                    >
                      {tag}
                    </a>
                  ))}
                </motion.div>

                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="flex items-center gap-4 text-[11px] text-white/25"
                >
                  <div className="flex -space-x-2">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-[#0A0A0F] flex items-center justify-center text-[8px] font-bold"
                        style={{
                          background: ["#6C5CE7", "#5B8DEF", "#00D2D3", "#FDCB6E"][i],
                          color: "#fff",
                        }}
                      >
                        {["P", "R", "A", "V"][i]}
                      </div>
                    ))}
                  </div>
                  <span>2,400+ students already exploring</span>
                </motion.div>
              </div>

              {/* Right floating cards — takes 5 cols */}
              <div className="lg:col-span-5 relative h-[420px] hidden lg:block">
                <FloatingCard
                  title="Google Data Analytics Certificate"
                  badge="Course"
                  badgeClass="badge-blue"
                  detail="6 Months · Online · Free"
                  match={95}
                  delay={1.2}
                  x={10}
                  y={0}
                />
                <FloatingCard
                  title="Tata Trusts UG Scholarship"
                  badge="Scholarship"
                  badgeClass="badge-teal"
                  detail="Up to ₹2,00,000"
                  match={92}
                  delay={1.5}
                  x={55}
                  y={80}
                />
                <FloatingCard
                  title="AI / ML Internship — MSR"
                  badge="Internship"
                  badgeClass="badge-orange"
                  detail="Remote · 2 Months"
                  match={90}
                  delay={1.8}
                  x={5}
                  y={220}
                />
                <FloatingCard
                  title="Junior Dev — Infosys"
                  badge="Job"
                  badgeClass="badge-purple"
                  detail="₹4–7 LPA · Bangalore"
                  match={88}
                  delay={2.1}
                  x={50}
                  y={280}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative z-10 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { value: 12000, suffix: "+", label: "Opportunities indexed" },
              { value: 8500, suffix: "+", label: "Students on Opportune" },
              { value: 340, suffix: "+", label: "Verified providers" },
              { value: 94, suffix: "%", label: "Match accuracy" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="py-8 px-6 text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[11px] text-white/30 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[3px] mb-3 block">
              How it works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Three steps. Zero noise.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Tell us about yourself",
                desc: "Your skills, goals, and what matters to you. One profile unlocks everything.",
                icon: Users,
                color: "#6C5CE7",
              },
              {
                step: "02",
                title: "We find the matches",
                desc: "Our AI scans 12,000+ opportunities and ranks the ones that actually fit you.",
                icon: Zap,
                color: "#5B8DEF",
              },
              {
                step: "03",
                title: "Apply with confidence",
                desc: "Get the 'why this matches' breakdown, deadlines, and direct links — no guesswork.",
                icon: TrendingUp,
                color: "#00D2D3",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card rounded-2xl p-7 relative group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: item.color + "18", border: `1px solid ${item.color}30` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <span className="text-[11px] font-mono text-white/20">{item.step}</span>
                </div>
                <h3 className="font-semibold text-[15px] text-white mb-2">{item.title}</h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{item.desc}</p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.color}40, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED OPPORTUNITIES ═══════════════ */}
      <section className="relative z-10 py-20 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10"
          >
            <div>
              <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[3px] mb-3 block">
                Trending now
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Opportunities people are applying to
              </h2>
            </div>
            <a
              href="/explore"
              className="text-xs font-medium text-[#6C5CE7] hover:text-[#A8C8FF] transition-colors flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {opportunities.slice(0, 4).map((opp, i) => (
              <motion.a
                key={opp.id}
                href={`/opportunity/${opp.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-5 block group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`badge-glass rounded-full text-[9px] ${
                    opp.type === "course" ? "badge-blue" :
                    opp.type === "scholarship" ? "badge-teal" :
                    opp.type === "internship" ? "badge-orange" : "badge-purple"
                  }`}>
                    {opp.type}
                  </span>
                  <MatchBadge percentage={opp.matchPercentage} />
                </div>
                <h3 className="font-semibold text-[14px] text-white/90 leading-snug mb-1 group-hover:text-white transition-colors">
                  {opp.title}
                </h3>
                <p className="text-[12px] text-white/30 mb-3">{opp.provider}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/25">{opp.duration}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/15 group-hover:text-[#6C5CE7] transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY OPPORTUNE ═══════════════ */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[3px] mb-3 block">
                Why Opportune
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-5">
                Not another job board.<br />
                <span className="gradient-text">An opportunity engine.</span>
              </h2>
              <p className="text-sm text-white/35 leading-relaxed mb-8 max-w-md">
                Most platforms dump a list of links on you. Opportune understands your profile, filters the noise, and shows you only what you're eligible for and interested in.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Sparkles, text: "Natural language search — ask in plain English", color: "#6C5CE7" },
                  { icon: Star, text: "Match scores based on your actual skills", color: "#FDCB6E" },
                  { icon: BookOpen, text: "Every opportunity verified by our team", color: "#00D2D3" },
                ].map((f, i) => (
                  <motion.div
                    key={f.text}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: f.color + "15", border: `1px solid ${f.color}25` }}
                    >
                      <f.icon className="w-4 h-4" style={{ color: f.color }} />
                    </div>
                    <span className="text-sm text-white/50">{f.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: stacked glass cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="glass rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/[0.06] to-[#5B8DEF]/[0.03]" />
                <div className="relative z-10 space-y-3">
                  {opportunities.slice(0, 3).map((opp, i) => (
                    <div
                      key={opp.id}
                      className="glass-card rounded-xl p-4 flex items-center gap-3"
                      style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                        {opp.type === "course" ? <BookOpen className="w-5 h-5 text-[#5B8DEF]" /> :
                         opp.type === "scholarship" ? <Star className="w-5 h-5 text-[#00D2D3]" /> :
                         <Zap className="w-5 h-5 text-[#FDCB6E]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-white/80 truncate">{opp.title}</p>
                        <p className="text-[11px] text-white/30">{opp.provider}</p>
                      </div>
                      <MatchBadge percentage={opp.matchPercentage} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ COMMUNITY ═══════════════ */}
      <section className="relative z-10 py-20 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[3px] mb-3 block">
                Community
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Don't explore alone.
              </h2>
              <p className="text-sm text-white/35 leading-relaxed mb-6 max-w-sm">
                8,500+ students sharing tips, asking questions, and helping each other land opportunities. Jump in.
              </p>
              <a
                href="/community"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
              >
                Explore Community <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <div className="lg:col-span-3 space-y-3">
              {threadPreviews.map((thread, i) => (
                <ThreadCard
                  key={i}
                  id={String(i + 1)}
                  title={thread.title}
                  author={thread.author}
                  upvotes={thread.upvotes}
                  comments={thread.comments}
                  tags={thread.tags}
                  index={i}
                  pinned={i === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="relative z-10 py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#6C5CE7]/10 via-transparent to-[#5B8DEF]/5 pointer-events-none" />
            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6C5CE7] to-[#5B8DEF] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20"
              >
                <Zap className="w-7 h-7 text-white" />
              </motion.div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
                Stop searching.<br />Start finding.
              </h2>
              <p className="text-sm text-white/35 mb-8 max-w-md mx-auto">
                Your profile is free. Your matches are instant. Your next opportunity is one search away.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/auth?returnTo=/dashboard"
                  className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                >
                  Get Started — It's Free <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3 glass text-white/60 font-medium text-sm rounded-xl hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  Browse first <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TRUSTED SOURCES ═══════════════ */}
      <section className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider-glass mb-10" />
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {trustedSources.map((source) => (
              <span
                key={source}
                className="text-base font-bold text-white/[0.07] hover:text-white/[0.15] transition-colors cursor-default select-none"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
