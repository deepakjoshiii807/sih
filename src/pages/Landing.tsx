import { motion } from "framer-motion";
import { Search, Target, Shield, Users, Lightbulb, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import OpportunityCard from "@/components/OpportunityCard";
import MatchBadge from "@/components/MatchBadge";
import VerifiedStamp from "@/components/VerifiedStamp";
import StickyNote from "@/components/StickyNote";
import ThreadCard from "@/components/ThreadCard";
import Footer from "@/components/Footer";
import { opportunities, threadPreviews, trustedSources, quickSearchTags } from "@/lib/mockData";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Text & Search */}
            <motion.div {...fadeUp} className="order-2 lg:order-1">
              <h1 className="editorial-heading text-4xl sm:text-5xl lg:text-[3.5rem] text-[#1a1a1a] mb-6">
                Find the opportunity{" "}
                <br className="hidden sm:block" />
                worth your{" "}
                <span className="relative inline-block">
                  next step
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#B87654]" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8 C40 2, 80 10, 120 4 S170 9, 198 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-[#6B6560] leading-relaxed mb-8 max-w-lg font-serif italic">
                Discover courses, scholarships, internships and jobs tailored to your goals, skills and interests.
              </p>

              {/* Search Form */}
              <div className="relative mb-6">
                <SearchBar size="large" />
                <span className="handwritten text-sm text-[#B87654] mt-3 block ml-2">
                  ← Try natural language. We'll do the heavy lifting.
                </span>
              </div>

              {/* Quick Search Tags */}
              <div className="flex flex-wrap gap-2">
                {quickSearchTags.map((tag) => (
                  <a
                    key={tag}
                    href={`/explore?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs font-medium text-[#3D4F6F] bg-[#FAF8F2] border border-[#D4CFC4] hover:border-[#3D4F6F]/40 transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Paper Collage */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
              {/* Handwritten annotation */}
              <span className="handwritten text-sm text-[#7A8B6F] absolute -top-2 right-4 z-10 hidden lg:block">
                Personalized for you →
              </span>

              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {/* Course Card */}
                <div className="relative" style={{ transform: "rotate(-1.5deg)" }}>
                  <div className="bg-[#FAF8F2] border border-[#D4CFC4] p-4 paper-shadow-lg relative">
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-[rgba(255,248,220,0.65)] border border-[rgba(200,190,160,0.4)]" style={{ transform: "rotate(-2deg)" }} />
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold tracking-wide border bg-[#3D4F6F]/8 text-[#3D4F6F] border-[#3D4F6F]/15 uppercase mb-2">
                      Course
                    </span>
                    <h4 className="font-serif font-bold text-xs text-[#1a1a1a] leading-snug mb-1.5">
                      Google Data Analytics Professional Certificate
                    </h4>
                    <div className="text-[10px] text-[#8A8580] space-y-0.5 mb-2">
                      <p>6 Months · Beginner Friendly</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MatchBadge percentage={95} />
                      <VerifiedStamp />
                    </div>
                  </div>
                </div>

                {/* Scholarship Card */}
                <div className="relative mt-6" style={{ transform: "rotate(1deg)" }}>
                  <div className="bg-[#FAF8F2] border border-[#D4CFC4] p-4 paper-shadow-lg relative">
                    <div className="absolute top-2 -right-2 w-5 h-8 border-2 border-[#C0C0C0] rounded-[6px_6px_0_0] border-b-none" />
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold tracking-wide border bg-[#7A8B6F]/8 text-[#7A8B6F] border-[#7A8B6F]/15 uppercase mb-2">
                      Scholarship
                    </span>
                    <h4 className="font-serif font-bold text-xs text-[#1a1a1a] leading-snug mb-1.5">
                      Undergraduate Scholarship
                    </h4>
                    <div className="text-[10px] text-[#8A8580] mb-2">
                      <p>Up to ₹2,00,000</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MatchBadge percentage={92} />
                      <VerifiedStamp />
                    </div>
                  </div>
                </div>

                {/* Internship Card */}
                <div className="relative -mt-2" style={{ transform: "rotate(0.8deg)" }}>
                  <div className="bg-[#FAF8F2] border border-[#D4CFC4] p-4 paper-shadow-lg relative">
                    <div className="absolute -top-2.5 left-8 w-14 h-5 bg-[rgba(255,248,220,0.65)] border border-[rgba(200,190,160,0.4)]" style={{ transform: "rotate(3deg)" }} />
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold tracking-wide border bg-[#B87654]/8 text-[#B87654] border-[#B87654]/15 uppercase mb-2">
                      Internship
                    </span>
                    <h4 className="font-serif font-bold text-xs text-[#1a1a1a] leading-snug mb-1.5">
                      AI / ML Internship
                    </h4>
                    <div className="text-[10px] text-[#8A8580] mb-2">
                      <p>2 Months · Remote</p>
                    </div>
                    <MatchBadge percentage={90} />
                  </div>
                </div>

                {/* Job Card */}
                <div className="relative mt-4" style={{ transform: "rotate(-0.5deg)" }}>
                  <div className="bg-[#FAF8F2] border border-[#D4CFC4] p-4 paper-shadow-lg relative">
                    <div className="absolute top-1 -right-2 w-5 h-8 border-2 border-[#C0C0C0] rounded-[6px_6px_0_0] border-b-none" />
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-semibold tracking-wide border bg-[#5B6B8A]/8 text-[#5B6B8A] border-[#5B6B8A]/15 uppercase mb-2">
                      Job
                    </span>
                    <h4 className="font-serif font-bold text-xs text-[#1a1a1a] leading-snug mb-1.5">
                      Junior Software Developer
                    </h4>
                    <div className="text-[10px] text-[#8A8580] mb-2">
                      <p>₹4–7 LPA · Bangalore / Hybrid</p>
                    </div>
                    <MatchBadge percentage={88} />
                  </div>
                </div>
              </div>

              {/* Handwritten note */}
              <span className="handwritten text-xs text-[#8A8580] mt-4 block text-center lg:text-right">
                More opportunities await! ✓
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TORN PAPER DIVIDER ===== */}
      <div className="relative h-5 bg-[#F0EEE6] torn-bottom" />

      {/* ===== TRUST / FEATURES SECTION ===== */}
      <section className="bg-[#FAF8F2] paper-texture py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-[11px] font-semibold text-[#8A8580] uppercase tracking-[3px] mb-3 block">Why Opportune</span>
            <h2 className="editorial-heading text-3xl sm:text-4xl text-[#1a1a1a]">
              Built for how you <span className="highlight-marker">actually</span> search
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "Personalized",
                desc: "AI recommendations based on profile and goals.",
                color: "#3D4F6F",
              },
              {
                icon: Shield,
                title: "Trusted",
                desc: "Verified opportunities from reliable sources.",
                color: "#2C6B4F",
              },
              {
                icon: Lightbulb,
                title: "Relevant",
                desc: "Recommendations based on actual skills and eligibility.",
                color: "#B87654",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Discuss opportunities and connect with people on the same journey.",
                color: "#5B6B8A",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                {...stagger}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative bg-[#FAF8F2] border border-[#D4CFC4] p-6 paper-shadow text-center group hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border-2"
                  style={{ borderColor: feature.color + "30" }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="font-serif font-bold text-base text-[#1a1a1a] mb-2 uppercase tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B6560] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sticky Note Tip - overlapping */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
          <StickyNote color="yellow" rotation={-2} className="w-64">
            <p className="text-xs font-bold text-[#1a1a1a] mb-1.5 font-serif uppercase tracking-wider">Opportune Tip</p>
            <p className="text-xs text-[#6B6560] mb-3 leading-relaxed">
              Complete your profile to get better matches. The more you tell us, the smarter we get.
            </p>
            <a href="/auth?returnTo=/dashboard" className="inline-flex items-center gap-1 text-xs font-semibold text-[#3D4F6F] hover:text-[#1a1a1a] transition-colors">
              Complete Now <ArrowRight className="w-3 h-3" />
            </a>
          </StickyNote>
        </div>
      </section>

      {/* ===== SPACER FOR OVERLAPPING STICKY NOTE ===== */}
      <div className="h-16 bg-[#F0EEE6]" />

      {/* ===== TRUSTED SOURCES ===== */}
      <section className="bg-[#F0EEE6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="text-[11px] font-semibold text-[#8A8580] uppercase tracking-[3px] mb-3 block">Partners</span>
            <h2 className="editorial-heading text-2xl sm:text-3xl text-[#1a1a1a]">
              Trusted sources & partners
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          >
            {trustedSources.map((source) => (
              <span
                key={source}
                className="text-lg sm:text-xl font-serif font-bold text-[#1a1a1a]/20 hover:text-[#1a1a1a]/40 transition-colors cursor-default select-none tracking-tight"
              >
                {source}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== COMMUNITY PREVIEW ===== */}
      <section className="bg-[#FAF8F2] paper-texture py-20 border-t border-[#D4CFC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left heading */}
            <motion.div {...fadeUp} className="lg:col-span-2">
              <span className="text-[11px] font-semibold text-[#8A8580] uppercase tracking-[3px] mb-3 block">Community</span>
              <h2 className="editorial-heading text-3xl sm:text-4xl text-[#1a1a1a] mb-4">
                Don't explore alone.
              </h2>
              <p className="text-sm text-[#6B6560] leading-relaxed mb-6 max-w-sm">
                Join thousands of students navigating their careers together. Ask questions, share experiences, and grow.
              </p>
              <a
                href="/community"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C2C2C] text-[#FAF8F2] text-sm font-medium hover:bg-[#1a1a1a] transition-colors"
              >
                Explore Community <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Right: Thread cards */}
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

      {/* ===== CTA SECTION ===== */}
      <section className="bg-[#2C2C2C] py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeUp}>
            <h2 className="editorial-heading text-3xl sm:text-4xl text-[#FAF8F2] mb-4">
              Your next opportunity is waiting.
            </h2>
            <p className="text-base text-[#FAF8F2]/60 mb-8 font-serif italic max-w-lg mx-auto">
              Join thousands of students who've found their path through Opportune.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/auth?returnTo=/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FAF8F2] text-[#2C2C2C] font-medium text-sm hover:bg-white transition-colors"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#FAF8F2]/30 text-[#FAF8F2] font-medium text-sm hover:bg-[#FAF8F2]/10 transition-colors"
              >
                Browse Opportunities
              </a>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 left-8 w-32 h-1 bg-[#FAF8F2]/5 rotate-3" />
        <div className="absolute bottom-6 right-12 w-24 h-1 bg-[#FAF8F2]/5 -rotate-2" />
      </section>

      <Footer />
    </div>
  );
}
