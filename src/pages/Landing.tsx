import { motion } from "framer-motion";
import { Target, Shield, Users, Lightbulb, ArrowRight, Zap, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MatchBadge from "@/components/MatchBadge";
import VerifiedStamp from "@/components/VerifiedStamp";
import StickyNote from "@/components/StickyNote";
import ThreadCard from "@/components/ThreadCard";
import Footer from "@/components/Footer";
import { opportunities, threadPreviews, trustedSources, quickSearchTags } from "@/lib/mockData";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const typeBadges: Record<string, string> = {
  course: "badge-blue",
  scholarship: "badge-teal",
  internship: "badge-orange",
  job: "badge-purple",
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="ambient-glow" />

      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Text & Search */}
            <motion.div {...fadeUp} className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-xs text-white/40 font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2D3] animate-pulse" />
                AI-Powered Discovery
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight mb-6">
                Find the opportunity{" "}
                <br className="hidden sm:block" />
                worth your{" "}
                <span className="gradient-text">
                  next step
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-white/40 leading-relaxed mb-8 max-w-lg">
                Discover courses, scholarships, internships and jobs tailored to your goals, skills and interests.
              </p>

              {/* Search */}
              <div className="mb-5">
                <SearchBar size="large" />
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-2">
                {quickSearchTags.map((tag) => (
                  <a
                    key={tag}
                    href={`/explore?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs font-medium text-white/40 glass rounded-full hover:text-white hover:bg-white/[0.08] transition-all"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Glass Card Collage */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
              {/* Floating label */}
              <div className="absolute -top-3 right-2 z-10 hidden lg:block">
                <span className="text-xs text-white/20 font-medium">
                  Personalized for you →
                </span>
              </div>

              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {/* Course Card */}
                <div className="glass-card rounded-2xl p-4" style={{ transform: "rotate(-1.5deg)" }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="badge-glass badge-blue rounded-full text-[9px]">Course</span>
                  </div>
                  <h4 className="font-semibold text-xs text-white/90 leading-snug mb-1.5">
                    Google Data Analytics Professional Certificate
                  </h4>
                  <p className="text-[10px] text-white/30 mb-2">6 Months · Beginner Friendly</p>
                  <div className="flex items-center gap-2">
                    <MatchBadge percentage={95} />
                    <VerifiedStamp />
                  </div>
                </div>

                {/* Scholarship Card */}
                <div className="glass-card rounded-2xl p-4 mt-6" style={{ transform: "rotate(1deg)" }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="badge-glass badge-teal rounded-full text-[9px]">Scholarship</span>
                  </div>
                  <h4 className="font-semibold text-xs text-white/90 leading-snug mb-1.5">
                    Undergraduate Scholarship
                  </h4>
                  <p className="text-[10px] text-white/30 mb-2">Up to ₹2,00,000</p>
                  <div className="flex items-center gap-2">
                    <MatchBadge percentage={92} />
                    <VerifiedStamp />
                  </div>
                </div>

                {/* Internship Card */}
                <div className="glass-card rounded-2xl p-4 -mt-2" style={{ transform: "rotate(0.8deg)" }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="badge-glass badge-orange rounded-full text-[9px]">Internship</span>
                  </div>
                  <h4 className="font-semibold text-xs text-white/90 leading-snug mb-1.5">
                    AI / ML Internship
                  </h4>
                  <p className="text-[10px] text-white/30 mb-2">2 Months · Remote</p>
                  <MatchBadge percentage={90} />
                </div>

                {/* Job Card */}
                <div className="glass-card rounded-2xl p-4 mt-4" style={{ transform: "rotate(-0.5deg)" }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="badge-glass badge-purple rounded-full text-[9px]">Job</span>
                  </div>
                  <h4 className="font-semibold text-xs text-white/90 leading-snug mb-1.5">
                    Junior Software Developer
                  </h4>
                  <p className="text-[10px] text-white/30 mb-2">₹4–7 LPA · Bangalore</p>
                  <MatchBadge percentage={88} />
                </div>
              </div>

              <span className="text-[11px] text-white/15 mt-4 block text-center lg:text-right">
                More opportunities await ✓
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="divider-glass max-w-7xl mx-auto" />

      {/* ===== FEATURES ===== */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[3px] mb-3 block">Why Opportune</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Built for how you{" "}
              <span className="gradient-text">actually</span>{" "}
              search
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Target, title: "Personalized", desc: "AI recommendations based on profile and goals.", color: "#6C5CE7" },
              { icon: Shield, title: "Trusted", desc: "Verified opportunities from reliable sources.", color: "#00D2D3" },
              { icon: Lightbulb, title: "Relevant", desc: "Recommendations based on actual skills and eligibility.", color: "#FDCB6E" },
              { icon: Users, title: "Community", desc: "Discuss opportunities and connect with people on the same journey.", color: "#5B8DEF" },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                {...stagger}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ background: feature.color + "15", border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <h3 className="font-semibold text-sm text-white mb-2 uppercase tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-white/35 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating Sticky Note */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
          <StickyNote color="yellow" rotation={-1.5} className="w-64">
            <p className="text-xs font-bold text-white mb-1.5 uppercase tracking-wider">
              <span className="text-[#FDCB6E]">Opportune</span> Tip
            </p>
            <p className="text-[11px] text-white/40 mb-3 leading-relaxed">
              Complete your profile to get better matches. The more you tell us, the smarter we get.
            </p>
            <a href="/auth?returnTo=/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C5CE7] hover:text-[#A8C8FF] transition-colors">
              Complete Now <ArrowRight className="w-3 h-3" />
            </a>
          </StickyNote>
        </div>
      </section>

      {/* Spacer for overlapping note */}
      <div className="h-16" />

      {/* ===== TRUSTED SOURCES ===== */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[3px] mb-3 block">Partners</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Trusted sources & partners
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5"
          >
            {trustedSources.map((source) => (
              <span
                key={source}
                className="text-lg sm:text-xl font-bold text-white/[0.08] hover:text-white/[0.2] transition-colors cursor-default select-none tracking-tight"
              >
                {source}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== COMMUNITY PREVIEW ===== */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <motion.div {...fadeUp} className="lg:col-span-2">
              <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[3px] mb-3 block">Community</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                Don't explore alone.
              </h2>
              <p className="text-sm text-white/35 leading-relaxed mb-6 max-w-sm">
                Join thousands of students navigating their careers together. Ask questions, share experiences, and grow.
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

      {/* ===== CTA ===== */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp}>
            <div className="glass rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#6C5CE7]/10 via-transparent to-[#5B8DEF]/5 pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
                  Your next opportunity is waiting.
                </h2>
                <p className="text-base text-white/35 mb-8 max-w-lg mx-auto">
                  Join thousands of students who've found their path through Opportune.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="/auth?returnTo=/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] text-white font-semibold text-sm rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                  >
                    Get Started Free <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/explore"
                    className="inline-flex items-center gap-2 px-6 py-3 glass text-white font-medium text-sm rounded-xl hover:bg-white/[0.08] transition-all"
                  >
                    Browse Opportunities <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
