import { motion } from "framer-motion";
import { Target, Shield, Users, Lightbulb, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MatchScore from "@/components/MatchScore";
import VerifiedBadge from "@/components/VerifiedBadge";
import StickyNote from "@/components/StickyNote";
import ThreadCard from "@/components/ThreadCard";
import Footer from "@/components/Footer";
import { opportunities, threadPreviews, trustedSources, quickSearchTags } from "@/lib/mockData";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6 },
};

const typeTag: Record<string, string> = {
  course: "tag-navy",
  scholarship: "tag-sage",
  internship: "tag-terracotta",
  job: "tag-indigo",
};
const typeLabel: Record<string, string> = {
  course: "Course",
  scholarship: "Scholarship",
  internship: "Internship",
  job: "Job",
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative paper-grain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left */}
            <motion.div {...fadeUp} className="lg:col-span-7 order-2 lg:order-1">
              <h1 className="heading-xl text-4xl sm:text-5xl lg:text-[3.8rem] text-[#1A1A1A] mb-6">
                Find the opportunity
                <br />
                worth your{" "}
                <span className="relative inline-block">
                  <span className="highlight">next step</span>
                  <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#B87654]" viewBox="0 0 200 12" fill="none">
                    <path d="M2 8 C40 2, 80 10, 120 4 S170 9, 198 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
                .
              </h1>

              <p className="body-lg text-base sm:text-lg text-[#7A7570] mb-8 max-w-xl">
                Discover courses, scholarships, internships and jobs tailored to your goals, skills and interests.
              </p>

              <div className="mb-5">
                <SearchBar size="large" />
              </div>

              <div className="flex flex-wrap gap-2">
                {quickSearchTags.map((tag) => (
                  <a
                    key={tag}
                    href={`/explore?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-[11px] font-semibold text-[#3D4F6F] bg-[#FAF8F2] ink-border-subtle hover:border-[#3D4F6F]/30 transition-colors sans-ui"
                  >
                    {tag}
                  </a>
                ))}
              </div>

              {/* Handwritten annotation */}
              <span className="handwritten text-sm text-[#B87654] mt-4 block">
                ← Try natural language. We'll do the heavy lifting.
              </span>
            </motion.div>

            {/* Right — Paper Collage */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 order-1 lg:order-2 relative"
            >
              <span className="handwritten text-sm text-[#7A8B6F] absolute -top-2 right-0 z-10 hidden lg:block">
                Personalized for you →
              </span>

              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {opportunities.slice(0, 4).map((opp, i) => {
                  const rotations = [-1.5, 1, 0.8, -0.5];
                  const tapes = ["tape", "tape tape-right", "tape", "tape tape-left"];
                  return (
                    <div
                      key={opp.id}
                      className="bg-[#FAF8F2] ink-border-subtle paper-shadow-lg p-4 relative"
                      style={{ transform: `rotate(${rotations[i]}deg)`, marginTop: i % 2 === 1 ? "24px" : "0" }}
                    >
                      <div className={tapes[i]} />
                      <span className={`tag ${typeTag[opp.type]} text-[8px] mb-2`}>
                        {typeLabel[opp.type]}
                      </span>
                      <h4 className="font-semibold text-[12px] text-[#1A1A1A] leading-snug mb-1.5 editorial">
                        {opp.title}
                      </h4>
                      <p className="text-[10px] text-[#8A8580] mb-2 sans-ui">{opp.provider}</p>
                      <div className="text-[10px] text-[#8A8580] mb-2 sans-ui">
                        <p>{opp.duration} · {opp.mode}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <MatchScore score={opp.matchPercentage} size="sm" />
                        {opp.verified && <VerifiedBadge variant="compact" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <span className="handwritten text-xs text-[#8A8580] mt-4 block text-center lg:text-right">
                Your next step →
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="bg-[#FAF8F2] paper-grain py-20 relative torn-top torn-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-14">
            <span className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.2em] mb-3 block sans-ui">Why Opportune</span>
            <h2 className="heading-lg text-3xl sm:text-4xl text-[#1A1A1A]">
              Built for how you <span className="highlight">actually</span> search
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Target, title: "Personalized", desc: "AI recommendations based on profile and goals.", color: "#3D4F6F" },
              { icon: Shield, title: "Trusted", desc: "Verified opportunities from reliable sources.", color: "#7A8B6F" },
              { icon: Lightbulb, title: "Relevant", desc: "Recommendations based on actual skills and eligibility.", color: "#B87654" },
              { icon: Users, title: "Community", desc: "Discuss opportunities and connect with people on the same journey.", color: "#5B6B8A" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#FAF8F2] ink-border-subtle paper-shadow p-6 text-center"
              >
                <div className="w-11 h-11 mx-auto mb-4 flex items-center justify-center ink-border" style={{ borderColor: f.color + "30" }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-[12px] font-bold text-[#1A1A1A] mb-2 uppercase tracking-[0.1em] sans-ui">{f.title}</h3>
                <p className="text-[13px] text-[#7A7570] leading-relaxed body-lg">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sticky note overlapping */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 hidden lg:block">
          <StickyNote color="yellow" rotation={-1.5} className="w-60">
            <p className="text-[11px] font-bold text-[#1A1A1A] mb-1.5 uppercase tracking-wider sans-ui">
              <span className="text-[#B87654]">Opportune</span> Tip
            </p>
            <p className="text-[11px] text-[#7A7570] mb-3 leading-relaxed body-sm">
              Complete your profile to get better matches. The more you tell us, the smarter we get.
            </p>
            <a href="/onboarding" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#3D4F6F] hover:text-[#1A1A1A] transition-colors sans-ui">
              Complete Now <ArrowRight className="w-3 h-3" />
            </a>
          </StickyNote>
        </div>
      </section>

      <div className="h-14 bg-[#F0EEE6]" />

      {/* ═══════ TRUSTED SOURCES ═══════ */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-8">
            <h2 className="heading-md text-xl text-[#1A1A1A]">Trusted sources & partners</h2>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedSources.map((s) => (
              <span key={s} className="text-lg font-bold text-[#1A1A1A]/[0.12] hover:text-[#1A1A1A]/[0.25] transition-colors cursor-default editorial tracking-tight">{s}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ COMMUNITY ═══════ */}
      <section className="bg-[#FAF8F2] paper-grain py-20 border-t border-[#D4CFC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <motion.div {...fadeUp} className="lg:col-span-2">
              <span className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.2em] mb-3 block sans-ui">Community</span>
              <h2 className="heading-lg text-3xl sm:text-4xl text-[#1A1A1A] mb-4">
                Don't explore alone.
              </h2>
              <p className="text-[13px] text-[#7A7570] leading-relaxed mb-6 max-w-sm body-lg">
                Join thousands of students navigating their careers together. Ask questions, share experiences, and grow.
              </p>
              <a href="/community" className="btn-paper btn-ink">
                Explore Community <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
            <div className="lg:col-span-3 space-y-3">
              {threadPreviews.map((t, i) => (
                <ThreadCard
                  key={i}
                  id={String(i + 1)}
                  title={t.title}
                  author={t.author}
                  upvotes={t.upvotes}
                  comments={t.comments}
                  tags={t.tags}
                  index={i}
                  pinned={i === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="bg-[#1A1A1A] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <h2 className="heading-lg text-3xl sm:text-4xl text-[#FAF8F2] mb-4">
              Your next opportunity is waiting.
            </h2>
            <p className="body-lg text-base text-[#FAF8F2]/50 mb-8 max-w-lg mx-auto">
              Join thousands of students who've found their path through Opportune.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/onboarding" className="btn-paper bg-[#FAF8F2] text-[#1A1A1A] hover:bg-white">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/explore" className="btn-paper border border-[#FAF8F2]/30 text-[#FAF8F2] hover:bg-[#FAF8F2]/10">
                Browse Opportunities
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
