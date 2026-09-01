import { motion } from "framer-motion";
import { Target, Shield, Users, Lightbulb, ArrowRight, Zap, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MatchScore from "@/components/MatchScore";
import VerifiedBadge from "@/components/VerifiedBadge";
import StickyNote from "@/components/StickyNote";
import ThreadCard from "@/components/ThreadCard";
import Footer from "@/components/Footer";
import { opportunities, threadPreviews, trustedSources, quickSearchTags } from "@/lib/mockData";

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } as const, transition: { duration: 0.6 } };
const typeBadge: Record<string, string> = { course: "badge-blue", scholarship: "badge-teal", internship: "badge-orange", job: "badge-purple" };
const typeLabel: Record<string, string> = { course: "Course", scholarship: "Scholarship", internship: "Internship", job: "Job" };

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B0B11] relative overflow-hidden">
      <div className="ambient" />
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div {...fade} className="lg:col-span-7 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 glass rounded-full text-[11px] text-white/35 font-medium mb-6 sans">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2D3] animate-pulse" /> AI-Powered Discovery
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.8rem] font-bold text-white leading-[1.08] tracking-tight mb-6">
                Find the opportunity <br className="hidden sm:block" /> worth your <span className="gradient-text">next step</span>.
              </h1>
              <p className="text-[15px] text-white/35 leading-relaxed mb-8 max-w-xl sans">
                Discover courses, scholarships, internships and jobs tailored to your goals, skills and interests.
              </p>
              <SearchBar size="large" />
              <div className="flex flex-wrap gap-2 mt-4 mb-6">
                {quickSearchTags.map((t) => (
                  <a key={t} href={`/explore?q=${encodeURIComponent(t)}`} className="px-3 py-1 text-[11px] font-medium text-white/30 glass rounded-full hover:text-white/60 hover:bg-white/[0.06] transition-all sans">{t}</a>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[11px] text-white/20 sans">
                <div className="flex -space-x-2">{["#7C6BF0","#5B8DEF","#00D2D3","#FDCB6E"].map((c,i) => <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0B0B11] flex items-center justify-center text-[8px] font-bold text-white" style={{background:c}}>{["P","R","A","V"][i]}</div>)}</div>
                <span>2,400+ students already exploring</span>
              </div>
            </motion.div>

            {/* Right floating cards */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative h-[400px] hidden lg:block">
              {opportunities.slice(0, 4).map((opp, i) => (
                <motion.div key={opp.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1 + i * 0.2 }} className="absolute" style={{ left: `${(i % 2) * 50 + 5}%`, top: `${Math.floor(i / 2) * 50 + 5}%` }}>
                  <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}>
                    <div className="glass-card rounded-2xl p-4 w-52 cursor-default">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className={`badge ${typeBadge[opp.type]} rounded-full text-[8px]`}>{typeLabel[opp.type]}</span>
                        {opp.verified && <VerifiedBadge variant="compact" />}
                      </div>
                      <h4 className="font-semibold text-[11px] text-white/85 leading-snug mb-1">{opp.title}</h4>
                      <p className="text-[9px] text-white/25 mb-2 sans">{opp.duration} · {opp.mode}</p>
                      <MatchScore score={opp.matchPercentage} size="sm" />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="relative z-10 py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade} className="text-center mb-14">
            <span className="text-[10px] font-semibold text-white/25 uppercase tracking-[3px] mb-3 block sans">How it works</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Three steps. Zero noise.</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Users, title: "Tell us about yourself", desc: "Your skills, goals, and what matters to you. One profile unlocks everything.", color: "#7C6BF0" },
              { icon: Zap, title: "We find the matches", desc: "Our AI scans 12,000+ opportunities and ranks the ones that actually fit you.", color: "#5B8DEF" },
              { icon: Sparkles, title: "Apply with confidence", desc: "Get the 'why this matches' breakdown, deadlines, and direct links — no guesswork.", color: "#00D2D3" },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="glass-card rounded-2xl p-6 text-center relative group">
                <div className="w-11 h-11 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: f.color + "12", border: `1px solid ${f.color}25` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="font-semibold text-[13px] text-white/80 mb-2 uppercase tracking-wider sans">{f.title}</h3>
                <p className="text-[12px] text-white/30 leading-relaxed sans">{f.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${f.color}30, transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY OPPORTUNE ═══ */}
      <section className="relative z-10 py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fade}>
              <span className="text-[10px] font-semibold text-white/25 uppercase tracking-[3px] mb-3 block sans">Why Opportune</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-5">Not another job board. <br /><span className="gradient-text">An opportunity engine.</span></h2>
              <p className="text-[13px] text-white/30 leading-relaxed mb-8 max-w-md sans">Most platforms dump a list of links on you. Opportune understands your profile, filters the noise, and shows you only what fits.</p>
              <div className="space-y-4">
                {[
                  { icon: Sparkles, text: "Natural language search — ask in plain English", color: "#7C6BF0" },
                  { icon: Target, text: "Match scores based on your actual skills", color: "#FDCB6E" },
                  { icon: Shield, text: "Every opportunity verified by our team", color: "#00D2D3" },
                ].map((f, i) => (
                  <motion.div key={f.text} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: f.color + "12", border: `1px solid ${f.color}20` }}><f.icon className="w-4 h-4" style={{ color: f.color }} /></div>
                    <span className="text-[13px] text-white/45 sans">{f.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
              <div className="glass rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C6BF0]/[0.04] to-[#5B8DEF]/[0.02]" />
                <div className="relative z-10 space-y-3">
                  {opportunities.slice(0, 3).map((opp, i) => (
                    <div key={opp.id} className="glass-card rounded-xl p-4 flex items-center gap-3" style={{ transform: `rotate(${i % 2 === 0 ? -0.3 : 0.3}deg)` }}>
                      <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                        {opp.type === "course" ? <Target className="w-4 h-4 text-[#5B8DEF]" /> : opp.type === "scholarship" ? <Shield className="w-4 h-4 text-[#00D2D3]" /> : <Zap className="w-4 h-4 text-[#FDCB6E]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-white/75 truncate">{opp.title}</p>
                        <p className="text-[10px] text-white/25 sans">{opp.provider}</p>
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
      <section className="relative z-10 py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade} className="text-center mb-12">
            <span className="text-[10px] font-semibold text-white/25 uppercase tracking-[3px] mb-3 block sans">Built for India</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Everything you need, nothing you don't.</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Target, title: "Personalized", desc: "AI recs based on your goals", color: "#7C6BF0" },
              { icon: Shield, title: "Trusted", desc: "Verified from reliable sources", color: "#00D2D3" },
              { icon: Lightbulb, title: "Relevant", desc: "Based on skills & eligibility", color: "#FDCB6E" },
              { icon: Users, title: "Community", desc: "Discuss & connect with peers", color: "#5B8DEF" },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: i * 0.08 }} className="glass-card rounded-2xl p-5 text-center">
                <div className="w-9 h-9 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ background: f.color + "10", border: `1px solid ${f.color}20` }}><f.icon className="w-4 h-4" style={{ color: f.color }} /></div>
                <h3 className="font-semibold text-[12px] text-white/70 mb-1 uppercase tracking-wider sans">{f.title}</h3>
                <p className="text-[11px] text-white/25 sans">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMMUNITY ═══ */}
      <section className="relative z-10 py-20 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <motion.div {...fade} className="lg:col-span-2">
              <span className="text-[10px] font-semibold text-white/25 uppercase tracking-[3px] mb-3 block sans">Community</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">Don't explore alone.</h2>
              <p className="text-[13px] text-white/30 leading-relaxed mb-6 max-w-sm sans">8,500+ students sharing tips, asking questions, and helping each other land opportunities.</p>
              <a href="/community" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white text-[13px] font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all sans">
                Explore Community <ArrowRight className="w-4 h-4" />
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
      <section className="relative z-10 py-24 border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fade}>
            <div className="glass rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#7C6BF0]/[0.06] via-transparent to-[#5B8DEF]/[0.03] pointer-events-none" />
              <div className="relative z-10">
                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C6BF0] to-[#5B8DEF] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                  <Zap className="w-7 h-7 text-white" />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">Stop searching. Start finding.</h2>
                <p className="text-[13px] text-white/30 mb-8 max-w-md mx-auto sans">Your profile is free. Your matches are instant. Your next opportunity is one search away.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="/onboarding" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white font-semibold text-[13px] rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all sans">Get Started — It's Free <ArrowRight className="w-4 h-4" /></a>
                  <a href="/explore" className="inline-flex items-center gap-2 px-6 py-3 glass text-white/50 font-medium text-[13px] rounded-xl hover:text-white hover:bg-white/[0.06] transition-all sans">Browse first</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PARTNERS ═══ */}
      <section className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divider mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {trustedSources.map((s) => <span key={s} className="text-base font-bold text-white/[0.06] hover:text-white/[0.12] transition-colors cursor-default sans">{s}</span>)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
