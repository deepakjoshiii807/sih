import { motion } from "framer-motion";
import { ArrowRight, Users, Zap, Sparkles, Target, Shield, Lightbulb } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MatchScore from "@/components/MatchScore";
import VerifiedBadge from "@/components/VerifiedBadge";
import StickyNote from "@/components/StickyNote";
import ThreadCard from "@/components/ThreadCard";
import Footer from "@/components/Footer";
import { PixelGraduation, PixelBriefcase, PixelDocument, PixelBuilding, PixelTarget, PixelRocket, PixelGraph, PixelStar, PixelChip } from "@/components/PixelIcons";
import { opportunities, threadPreviews, trustedSources, quickSearchTags } from "@/lib/mockData";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const, transition: { duration: 0.5 } };
const typeBadge: Record<string, string> = { course: "badge-pixel-blue", scholarship: "badge-pixel-green", internship: "badge-pixel-peach", job: "badge-pixel-purple" };
const typeLabel: Record<string, string> = { course: "Course", scholarship: "Scholarship", internship: "Internship", job: "Job" };
const typeIcon: Record<string, typeof PixelGraduation> = { course: PixelDocument, scholarship: PixelGraduation, internship: PixelBriefcase, job: PixelBuilding };

export default function Landing() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Pixel background decoration */}
        <div className="absolute inset-0 pixel-dots opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-sage-bg opacity-50 pointer-events-none" style={{ borderRadius: "0 0 0 100%" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-lavender-bg opacity-40 pointer-events-none" style={{ borderRadius: "0 100% 0 0" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div {...fade} className="lg:col-span-7 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-bg border-2 border-sage text-forest text-[7px] pixel mb-6 shadow-[2px_2px_0px_var(--sage)]">
                <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pixel-blink" /> SIH26044 · ACADEMIA–INDUSTRY PORTAL
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-ink leading-[1.08] tracking-tight mb-6">
                Find the opportunity <br className="hidden sm:block" /> worth your{" "}
                <span className="relative inline-block">
                  next step
                  <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6C30 2 70 2 100 4C130 6 170 3 198 2" stroke="#3B6B4A" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>.
              </h1>
              <p className="text-[15px] text-ink-light leading-relaxed mb-8 max-w-xl sans">
                Discover courses, scholarships, internships and jobs tailored to your goals, skills and interests.
              </p>
              <SearchBar size="large" />
              <div className="flex flex-wrap gap-2 mt-4 mb-6">
                {quickSearchTags.map((t) => (
                  <a key={t} href={`/explore?q=${encodeURIComponent(t)}`} className="tag-pixel hover:border-ink-muted hover:text-ink transition-all">{t}</a>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-ink-muted sans">
                <div className="flex -space-x-2">{["#3B6B4A","#6B5B8A","#4A7B8A","#D4A843"].map((c,i) => <div key={i} className="w-7 h-7 border-2 border-cream flex items-center justify-center text-[8px] font-bold text-white pixel" style={{background:c}}>{["S","R","A","V"][i]}</div>)}</div>
                <span className="font-semibold">2,400+ students already exploring</span>
              </div>
            </motion.div>

            {/* Right — pixel collage */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative h-[420px] hidden lg:block">
              {opportunities.slice(0, 4).map((opp, i) => {
                const Icon = typeIcon[opp.type];
                return (
                  <motion.div key={opp.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }} className="absolute" style={{ left: `${(i % 2) * 55 + 2}%`, top: `${Math.floor(i / 2) * 52 + 3}%` }}>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}>
                      <div className="pixel-card bg-card p-4 w-56 cursor-default">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`badge-pixel ${typeBadge[opp.type]} text-[6px]`}><Icon className="w-3 h-3" /> {typeLabel[opp.type]}</span>
                          {opp.verified && <VerifiedBadge variant="compact" />}
                        </div>
                        <h4 className="font-bold text-[11px] text-ink leading-snug mb-1">{opp.title}</h4>
                        <p className="text-[9px] text-ink-muted mb-2 sans">{opp.duration} · {opp.mode}</p>
                        <MatchScore score={opp.matchPercentage} size="sm" />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
              {/* Pixel decorations */}
              <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-2 right-8">
                <PixelStar className="text-yellow" size={20} />
              </motion.div>
              <motion.div animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-8 -left-2">
                <PixelRocket className="text-purple" size={20} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 border-t-[3px] border-ink bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade} className="text-center mb-14">
            <span className="section-pixel mb-3 block">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">Three steps. Zero noise.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, pixelIcon: PixelGraduation, title: "Tell us about yourself", desc: "Your skills, goals, and what matters to you. One profile unlocks everything.", color: "forest", num: "01" },
              { icon: Zap, pixelIcon: PixelRocket, title: "We find the matches", desc: "Our AI scans 12,000+ opportunities and ranks the ones that actually fit you.", color: "blue", num: "02" },
              { icon: Sparkles, pixelIcon: PixelTarget, title: "Apply with confidence", desc: "Get the 'why this matches' breakdown, deadlines, and direct links — no guesswork.", color: "purple", num: "03" },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="pixel-card bg-card p-6 text-center relative group">
                <div className="absolute top-3 right-3 pixel text-[8px] text-ink-muted">{f.num}</div>
                <div className="w-12 h-12 mx-auto mb-4 bg-cream-dark border-2 border-ink shadow-[2px_2px_0px_var(--ink)] flex items-center justify-center">
                  <f.pixelIcon className="text-ink" size={24} />
                </div>
                <h3 className="pixel text-[8px] text-ink mb-3 tracking-wider">{f.title}</h3>
                <p className="text-[12px] text-ink-muted leading-relaxed sans">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY SKILLBRIDGE ═══ */}
      <section className="py-20 border-t-[3px] border-ink bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fade}>
              <span className="section-pixel mb-3 block">Why SkillBridge</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-5">Not another job board. <br /><span className="text-forest">An opportunity engine.</span></h2>
              <p className="text-[13px] text-ink-muted leading-relaxed mb-8 max-w-md sans">Most platforms dump a list of links on you. SkillBridge understands your profile, filters the noise, and shows you only what fits.</p>
              <div className="space-y-4">
                {[
                  { pixelIcon: PixelMagnifier, text: "Natural language search — ask in plain English", color: "var(--forest)" },
                  { pixelIcon: PixelTarget, text: "Match scores based on your actual skills", color: "var(--yellow)" },
                  { pixelIcon: PixelStar, text: "Every opportunity verified by our team", color: "var(--blue)" },
                ].map((f, i) => (
                  <motion.div key={f.text} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} className="flex items-center gap-3">
                    <div className="w-9 h-9 border-2 border-ink bg-card shadow-[2px_2px_0px_var(--ink)] flex items-center justify-center shrink-0"><f.pixelIcon className="text-ink" size={18} /></div>
                    <span className="text-[13px] text-ink-light font-medium sans">{f.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
              <div className="pixel-card bg-card p-8 relative overflow-hidden">
                <div className="absolute inset-0 pixel-dots opacity-20 pointer-events-none" />
                <div className="relative z-10 space-y-3">
                  {opportunities.slice(0, 3).map((opp, i) => (
                    <div key={opp.id} className="pixel-card-sm bg-cream p-4 flex items-center gap-3" style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}>
                      <div className="w-10 h-10 border-2 border-ink bg-cream-dark flex items-center justify-center shrink-0 shadow-[2px_2px_0px_var(--ink)]">
                        {opp.type === "course" ? <PixelDocument className="text-blue" size={18} /> : opp.type === "scholarship" ? <PixelGraduation className="text-forest" size={18} /> : <PixelBriefcase className="text-peach" size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-ink truncate">{opp.title}</p>
                        <p className="text-[10px] text-ink-muted sans">{opp.provider}</p>
                      </div>
                      <MatchScore score={opp.matchPercentage} size="sm" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="py-20 border-t-[3px] border-ink bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade} className="text-center mb-12">
            <span className="section-pixel mb-3 block">Built for India</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">Everything you need, nothing you don't.</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { pixelIcon: PixelTarget, title: "Personalized", desc: "AI recs based on your goals", color: "var(--forest)" },
              { pixelIcon: PixelStar, title: "Trusted", desc: "Verified from reliable sources", color: "var(--blue)" },
              { pixelIcon: PixelGraph, title: "Relevant", desc: "Based on skills & eligibility", color: "var(--yellow)" },
              { pixelIcon: PixelRocket, title: "Community", desc: "Discuss & connect with peers", color: "var(--purple)" },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.08 }} className="pixel-card bg-card p-5 text-center">
                <div className="w-10 h-10 mx-auto mb-3 bg-cream-dark border-2 border-ink shadow-[2px_2px_0px_var(--ink)] flex items-center justify-center">
                  <f.pixelIcon className="text-ink" size={20} />
                </div>
                <h3 className="pixel text-[7px] text-ink mb-2 tracking-wider">{f.title}</h3>
                <p className="text-[11px] text-ink-muted sans">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STICKY NOTE TIP ═══ */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade} className="max-w-md mx-auto">
            <StickyNote color="yellow" rotation={-1.5}>
              <p className="pixel text-[8px] text-[#8A6A20] mb-2">💡 OPPORTUNE TIP</p>
              <p className="text-[13px] text-ink leading-relaxed mb-3">Complete your profile to get better matches. Students with full profiles see 3x more relevant opportunities.</p>
              <a href="/onboarding" className="pixel-btn pixel-btn-primary text-[7px] py-1.5">Complete Now →</a>
            </StickyNote>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUSTED SOURCES ═══ */}
      <section className="py-16 border-t-[3px] border-ink bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade} className="text-center mb-8">
            <span className="section-pixel mb-2 block">Trusted Sources</span>
            <p className="text-[12px] text-ink-muted sans">Opportunities from verified, reliable organizations</p>
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {trustedSources.map((s) => <span key={s} className="pixel text-[10px] text-ink-muted/40 hover:text-ink-muted/70 transition-colors cursor-default">{s}</span>)}
          </div>
        </div>
      </section>

      {/* ═══ COMMUNITY ═══ */}
      <section className="py-20 border-t-[3px] border-ink bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <motion.div {...fade} className="lg:col-span-2">
              <span className="section-pixel mb-3 block">Community</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">Don't explore alone.</h2>
              <p className="text-[13px] text-ink-muted leading-relaxed mb-6 max-w-sm sans">8,500+ students sharing tips, asking questions, and helping each other land opportunities.</p>
              <a href="/community" className="pixel-btn pixel-btn-primary">
                Explore Community <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
            <div className="lg:col-span-3 space-y-3">
              {threadPreviews.map((t, i) => (
                <ThreadCard key={i} id={String(i + 1)} title={t.title} author={t.author} upvotes={t.upvotes} comments={t.comments} tags={t.tags} index={i} pinned={i === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 border-t-[3px] border-ink bg-ink">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade}>
            <div className="bg-cream border-[3px] border-ink shadow-[6px_6px_0px_var(--ink)] p-10 sm:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 pixel-dots opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-16 h-16 bg-forest border-[3px] border-[#2A4A35] shadow-[4px_4px_0px_#2A4A35] flex items-center justify-center mx-auto mb-6">
                  <PixelChip className="text-cream" size={28} />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3 tracking-tight">Stop searching.<br />Start finding.</h2>
                <p className="text-[13px] text-ink-muted mb-8 max-w-md mx-auto sans">Your profile is free. Your matches are instant. Your next opportunity is one search away.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="/onboarding" className="pixel-btn pixel-btn-primary text-[8px]">Get Started — It's Free <ArrowRight className="w-3.5 h-3.5" /></a>
                  <a href="/explore" className="pixel-btn pixel-btn-secondary text-[8px]">Browse first</a>
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

function PixelMagnifier({ className, size }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="3" y="2" width="2" height="2" fill="currentColor" />
      <rect x="5" y="1" width="2" height="2" fill="currentColor" />
      <rect x="7" y="1" width="2" height="2" fill="currentColor" />
      <rect x="9" y="2" width="2" height="2" fill="currentColor" />
      <rect x="1" y="4" width="2" height="2" fill="currentColor" />
      <rect x="11" y="4" width="2" height="2" fill="currentColor" />
      <rect x="1" y="6" width="2" height="2" fill="currentColor" />
      <rect x="11" y="6" width="2" height="2" fill="currentColor" />
      <rect x="3" y="8" width="2" height="2" fill="currentColor" />
      <rect x="9" y="8" width="2" height="2" fill="currentColor" />
      <rect x="5" y="9" width="2" height="2" fill="currentColor" />
      <rect x="7" y="10" width="2" height="2" fill="currentColor" />
      <rect x="9" y="11" width="2" height="2" fill="currentColor" />
      <rect x="11" y="12" width="2" height="2" fill="currentColor" />
    </svg>
  );
}
