import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { CinematicHero } from "@/components/ui/cinematic-hero";

type Mode = "login" | "signup" | "forgot";

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); navigate("/dashboard"); };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0A0A0F]">
      {/* Left — Cinematic Hero (dark, authentic) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <CinematicHero
          tagline1="Build the skills,"
          tagline2="bridge the gap."
          cardHeading="Evidence-backed skill profiles."
          cardDescription={
            <>
              <span className="text-white font-semibold">SkillBridge</span> connects students with industry through verified skills, semantic matching, and real opportunity discovery.
            </>
          }
          metricValue={340}
          metricLabel="Verified Skills"
          ctaHeading="Start your journey."
          ctaDescription="Join thousands of students bridging the gap between academics and industry."
        />
      </div>

      {/* Right — Auth Form (dark) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 sm:px-8 py-12 lg:py-0 min-h-screen lg:min-h-0 bg-[#0A0A0F]">
        <div className="w-full max-w-md">
          {/* Mobile-only branding */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 border border-white/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-white/70" viewBox="0 0 16 16" fill="none">
                  <rect x="4" y="4" width="8" height="8" fill="currentColor" />
                  <rect x="6" y="6" width="4" height="4" fill="#0A0A0F" />
                </svg>
              </div>
              <span className="pixel text-[9px] text-white/60 tracking-wider">SKILLBRIDGE</span>
            </Link>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              {mode === "forgot" && (
                <button onClick={() => setMode("login")} className="flex items-center gap-1 text-[12px] text-white/30 hover:text-white/60 mb-6 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to login
                </button>
              )}

              <div className="mb-8">
                <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">
                  {mode === "login" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset password"}
                </h1>
                <p className="text-[13px] text-white/40">
                  {mode === "login" ? "Sign in to continue your journey" : mode === "signup" ? "Start discovering opportunities" : "Enter your email to receive a reset link"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                  <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5 block">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                      <input type="text" placeholder="Your name" className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded text-[13px] text-white placeholder:text-white/15 focus:outline-none focus:border-green-500/40 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)] transition-all" required />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                    <input type="email" placeholder="name@example.com" className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded text-[13px] text-white placeholder:text-white/15 focus:outline-none focus:border-green-500/40 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)] transition-all" required />
                  </div>
                </div>

                {mode !== "forgot" && (
                  <div>
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1.5 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-4 h-4 text-white/20" />
                      <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded text-[13px] text-white placeholder:text-white/15 focus:outline-none focus:border-green-500/40 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)] transition-all" required />
                    </div>
                  </div>
                )}

                {mode === "login" && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-[11px] text-white/30">
                      <input type="checkbox" className="accent-green-500 rounded" /> Remember me
                    </label>
                    <button type="button" onClick={() => setMode("forgot")} className="text-[11px] text-green-400 hover:text-green-300 font-semibold transition-colors">
                      Forgot password?
                    </button>
                  </div>
                )}

                <button type="submit" className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 text-white text-[12px] font-bold uppercase tracking-wider rounded transition-all shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_30px_rgba(34,197,94,0.25)]">
                  {mode === "login" ? "Log In" : mode === "signup" ? "Create Account" : "Send Reset Link"} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="h-px bg-white/[0.06] my-8" />

              <p className="text-center text-[12px] text-white/25">
                {mode === "login" && <>Don't have an account? <button onClick={() => setMode("signup")} className="font-bold text-white/60 hover:text-white transition-colors">Sign up</button></>}
                {mode === "signup" && <>Already have an account? <button onClick={() => setMode("login")} className="font-bold text-white/60 hover:text-white transition-colors">Log in</button></>}
                {mode === "forgot" && <>Remember your password? <button onClick={() => setMode("login")} className="font-bold text-white/60 hover:text-white transition-colors">Log in</button></>}
              </p>
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-[10px] text-white/10 mt-8">Secured by SkillBridge · Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
