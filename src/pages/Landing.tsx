import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PixelGraduation, PixelBriefcase, PixelTarget, PixelRocket, PixelDocument, PixelGraph, PixelStar, PixelChip } from "@/components/PixelIcons";

/* ─── Animated counter ─── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ─── Skill bar ─── */
function SkillBar({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex items-center gap-4">
      <span className="text-[12px] text-ink-light font-medium w-28 shrink-0 text-right">{label}</span>
      <div className="flex-1 pixel-progress">
        <div
          className={`pixel-progress-fill ${pct >= 75 ? "green" : pct >= 50 ? "blue" : "yellow"}`}
          style={{ width: inView ? `${pct}%` : "0%", transition: `width 0.8s ease ${delay}s` }}
        />
      </div>
      <span className="pixel text-[8px] text-ink-muted w-10">{pct}%</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*                     LANDING PAGE                       */
/* ═══════════════════════════════════════════════════════ */

export default function Landing() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) navigate(`/explore?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

            {/* Left — text */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="pixel text-[7px] text-ink-muted tracking-widest mb-6">
                  SIH26044 · ACADEMIA–INDUSTRY PORTAL
                </div>

                <h1 className="text-[2.5rem] sm:text-[3.2rem] lg:text-[3.8rem] font-extrabold text-ink leading-[1.08] tracking-tight mb-6">
                  Find the opportunity
                  <br />
                  worth your{" "}
                  <span className="relative inline-block">
                    next step
                    <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                      <path d="M2 5.5C40 2.5 100 2.5 198 5.5" stroke="#2D5016" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>.
                </h1>

                <p className="text-[15px] text-ink-light leading-relaxed mb-8 max-w-lg">
                  Discover courses, scholarships, internships and jobs matched to your skills, goals and interests.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                <div className="pixel-card-border p-1.5 flex items-stretch gap-1.5 max-w-xl">
                  <div className="flex-1 flex items-center gap-3 px-4 bg-cream-card">
                    <Search className="w-4 h-4 text-ink-muted shrink-0" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search opportunities..."
                      className="w-full bg-transparent text-[13px] text-ink placeholder:text-ink-muted focus:outline-none py-2.5"
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <button onClick={handleSearch} className="pixel-btn pixel-btn-green text-[7px] px-5 shrink-0">
                    Explore <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  {["Internships", "Jobs", "Courses", "Scholarships"].map((c) => (
                    <Link key={c} to={`/explore?type=${c.toLowerCase()}`} className="text-[11px] text-ink-muted hover:text-ink font-medium transition-colors">
                      {c}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right — career roadmap visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 order-1 lg:order-2 hidden lg:block"
            >
              <div className="pixel-card p-6 ml-4">
                <div className="pixel text-[7px] text-ink-muted tracking-widest mb-5">YOUR CAREER PATH</div>

                <div className="space-y-0">
                  {[
                    { icon: PixelDocument, label: "Student Profile", sub: "Education & background", color: "var(--green)" },
                    { icon: PixelStar, label: "Skills", sub: "Evidence-backed skill map", color: "var(--yellow)" },
                    { icon: PixelTarget, label: "Skill Gap", sub: "What you need to learn", color: "var(--peach)" },
                    { icon: PixelBriefcase, label: "Opportunity", sub: "Matched to your profile", color: "var(--blue)" },
                    { icon: PixelRocket, label: "Next Step", sub: "Your career launchpad", color: "var(--green)" },
                  ].map((step, i) => (
                    <div key={step.label}>
                      <div className="flex items-center gap-3 py-2.5">
                        <div className="w-9 h-9 border-[1.5px] border-ink bg-cream flex items-center justify-center shrink-0" style={{ boxShadow: `2px 2px 0 ${step.color}40` }}>
                          <step.icon className="text-ink" size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12px] font-bold text-ink leading-tight">{step.label}</p>
                          <p className="text-[10px] text-ink-muted">{step.sub}</p>
                        </div>
                      </div>
                      {i < 4 && (
                        <div className="ml-[17px] border-l-[1.5px] border-dashed border-border h-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS BAR ═══════ */}
      <section className="border-y border-border bg-cream-card">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 12000, suffix: "+", label: "Opportunities" },
              { value: 8500, suffix: "+", label: "Students" },
              { value: 340, suffix: "+", label: "Verified Skills" },
              { value: 94, suffix: "%", label: "Match Accuracy" },
            ].map((s) => (
              <div key={s.label}>
                <p className="pixel text-[14px] sm:text-[18px] text-ink leading-none mb-1.5">
                  <CountUp target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-[11px] text-ink-muted font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS — 4 STEPS ═══════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-16">
            <p className="section-pixel mb-4">How SkillBridge works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight max-w-lg leading-tight">
              Everything you need for your next step.
            </h2>
          </div>

          <div className="space-y-0">
            {[
              {
                num: "01",
                title: "Build Your Skill Profile",
                desc: "Upload evidence — degrees, certificates, projects, internships. Our system extracts and verifies your skills from real documents.",
                icon: PixelDocument,
              },
              {
                num: "02",
                title: "Understand Your Gap",
                desc: "See how your current skills compare to your target role. Visualize the gap between where you are and where you want to be.",
                icon: PixelTarget,
              },
              {
                num: "03",
                title: "Find the Right Opportunity",
                desc: "Discover internships, jobs, courses and scholarships matched to your verified skills, not just keywords on a resume.",
                icon: PixelBriefcase,
              },
              {
                num: "04",
                title: "Track Your Journey",
                desc: "Application pipeline, skill verification status, outcomes and a growing portfolio — all in one place.",
                icon: PixelGraph,
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 py-8 border-b border-border last:border-0"
              >
                <div className="sm:col-span-1">
                  <span className="section-number">{step.num}</span>
                </div>
                <div className="sm:col-span-3 flex items-start gap-3">
                  <div className="w-9 h-9 border-[1.5px] border-ink bg-cream flex items-center justify-center shrink-0" style={{ boxShadow: "2px 2px 0 var(--border)" }}>
                    <step.icon className="text-ink" size={16} />
                  </div>
                  <h3 className="text-[15px] font-bold text-ink leading-tight pt-1">{step.title}</h3>
                </div>
                <div className="sm:col-span-8">
                  <p className="text-[13px] text-ink-light leading-relaxed max-w-md">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SKILL MATCHING ═══════ */}
      <section className="py-24 sm:py-32 bg-cream-card border-y border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="section-pixel mb-4">Skill Matching</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
                Evidence-backed skills,<br />
                not self-reported claims.
              </h2>
              <p className="text-[13px] text-ink-light leading-relaxed mb-6 max-w-md">
                SkillBridge extracts and verifies your skills from uploaded documents — degrees, certificates, project repositories, and internship records. Your profile is backed by evidence, not guesswork.
              </p>
              <div className="pixel-badge pixel-badge-green">
                <svg className="w-2.5 h-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13.5 4.5L6.5 11.5L2.5 7.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                VERIFIED · EVIDENCE-BACKED
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="pixel-card p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="pixel text-[7px] text-ink-muted tracking-widest">YOUR SKILLS</span>
                  <span className="pixel-badge pixel-badge-green text-[6px]">91% MATCH</span>
                </div>

                <div className="space-y-4 mb-6">
                  <SkillBar label="Python" pct={86} delay={0} />
                  <SkillBar label="Data Analysis" pct={72} delay={0.1} />
                  <SkillBar label="SQL" pct={61} delay={0.2} />
                  <SkillBar label="Statistics" pct={38} delay={0.3} />
                  <SkillBar label="ML Basics" pct={24} delay={0.4} />
                </div>

                <div className="pixel-divider-light my-5" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="pixel text-[7px] text-ink-muted tracking-widest mb-1">TARGET ROLE</p>
                    <p className="text-[14px] font-bold text-ink">Data Analyst</p>
                  </div>
                  <div className="text-right">
                    <p className="pixel text-[7px] text-ink-muted tracking-widest mb-1">GAP TO CLOSE</p>
                    <p className="text-[14px] font-bold text-ink">2 skills</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ OPPORTUNITIES ═══════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="section-pixel mb-4">Opportunities</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Matched to your verified skills.
              </h2>
            </div>
            <Link to="/explore" className="hidden sm:inline-flex pixel-btn pixel-btn-outline text-[7px]">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-0">
            {[
              { type: "Internship", typeColor: "pixel-badge-peach", title: "AI / ML Research Internship", org: "Microsoft Research India", match: 90, skills: ["Python", "Machine Learning", "PyTorch"], deadline: "Feb 28, 2026" },
              { type: "Course", typeColor: "pixel-badge-blue", title: "Google Data Analytics Certificate", org: "Google · Coursera", match: 95, skills: ["SQL", "R", "Tableau"], deadline: "Rolling" },
              { type: "Job", typeColor: "pixel-badge-lavender", title: "Junior Data Analyst", org: "Infosys", match: 88, skills: ["Python", "Data Analysis", "SQL"], deadline: "May 15, 2026" },
              { type: "Scholarship", typeColor: "pixel-badge-green", title: "Undergraduate Scholarship Programme", org: "Tata Trusts", match: 92, skills: ["Academic Excellence", "Leadership"], deadline: "Mar 15, 2026" },
            ].map((opp, i) => (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <Link to="/explore" className="group flex items-center gap-5 py-5 border-b border-border hover:bg-cream-card/60 transition-colors px-3 -mx-3">
                  <div className="shrink-0 w-16 sm:w-20">
                    <span className={`pixel-badge ${opp.typeColor} text-[6px]`}>{opp.type}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-ink group-hover:text-green transition-colors truncate">{opp.title}</p>
                    <p className="text-[11px] text-ink-muted mt-0.5">{opp.org}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    {opp.skills.slice(0, 2).map((s) => (
                      <span key={s} className="text-[9px] text-ink-muted border border-border px-1.5 py-0.5">{s}</span>
                    ))}
                  </div>
                  <div className="shrink-0 text-right w-20 hidden md:block">
                    <p className="pixel text-[7px] text-ink-muted mb-0.5">DEADLINE</p>
                    <p className="text-[10px] text-ink-light">{opp.deadline}</p>
                  </div>
                  <div className="shrink-0 w-16 text-right">
                    <span className={`pixel-match ${opp.match >= 90 ? "pixel-match-high" : opp.match >= 75 ? "pixel-match-mid" : "pixel-match-low"}`}>
                      {opp.match}%
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link to="/explore" className="pixel-btn pixel-btn-outline text-[7px] w-full justify-center">View All Opportunities</Link>
          </div>
        </div>
      </section>

      {/* ═══════ FOUR USER TYPES ═══════ */}
      <section className="py-24 sm:py-32 bg-ink text-cream">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="mb-16">
            <p className="pixel text-[7px] text-cream/40 tracking-widest mb-4">THE ECOSYSTEM</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-cream max-w-lg leading-tight">
              Built for every stakeholder in the talent pipeline.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10">
            {[
              { icon: PixelGraduation, label: "Students", desc: "Build skills, discover opportunities, track your career journey." },
              { icon: PixelBriefcase, label: "Industry", desc: "Find candidates based on verified skills, not just resumes." },
              { icon: PixelDocument, label: "Academicians", desc: "Understand industry demand and verify student outcomes." },
              { icon: PixelGraph, label: "Institutions", desc: "Track placement analytics, skill trends and cohort performance." },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-ink p-6 sm:p-8"
              >
                <div className="w-10 h-10 border border-cream/20 flex items-center justify-center mb-5">
                  <item.icon className="text-cream/60" size={18} />
                </div>
                <h3 className="pixel text-[8px] text-cream/70 tracking-wider mb-3">{item.label}</h3>
                <p className="text-[12px] text-cream/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-6 leading-tight">
              Your next opportunity starts with knowing your skills.
            </h2>
            <p className="text-[14px] text-ink-light mb-10 max-w-md mx-auto leading-relaxed">
              Build your evidence-backed skill profile. Discover where you stand. Find where you fit.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/onboarding" className="pixel-btn pixel-btn-green text-[8px]">
                Get Started <ArrowRight className="w-3 h-3" />
              </Link>
              <Link to="/explore" className="pixel-btn pixel-btn-outline text-[8px]">
                Explore Opportunities
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
