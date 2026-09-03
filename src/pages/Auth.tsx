import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { PixelChip } from "@/components/PixelIcons";

type Mode = "login" | "signup" | "forgot";

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); navigate("/dashboard"); };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <div className="pixel-card bg-card p-8 relative overflow-hidden">
                <div className="absolute inset-0 pixel-dots opacity-10 pointer-events-none" />
                <div className="relative z-10">
                  {mode === "forgot" && <button onClick={() => setMode("login")} className="flex items-center gap-1 text-[12px] text-ink-muted hover:text-ink mb-6 sans"><ArrowLeft className="w-3.5 h-3.5" /> Back to login</button>}
                  <div className="text-center mb-6 mt-1">
                    <div className="w-12 h-12 bg-forest border-[3px] border-[#2A4A35] shadow-[3px_3px_0px_#2A4A35] flex items-center justify-center mx-auto mb-3">
                      <PixelChip className="text-cream" size={20} />
                    </div>
                    <h1 className="text-xl font-extrabold text-ink tracking-tight">{mode === "login" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset password"}</h1>
                    <p className="text-[12px] text-ink-muted mt-1 sans">{mode === "login" ? "Sign in to continue your journey" : mode === "signup" ? "Start discovering opportunities" : "Enter your email to receive a reset link"}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "signup" && <div><label className="section-pixel mb-1.5 block">Full Name</label><div className="relative"><User className="absolute left-3 top-3 w-4 h-4 text-ink-muted" /><input type="text" placeholder="Your name" className="pixel-input pl-10" required /></div></div>}
                    <div><label className="section-pixel mb-1.5 block">Email</label><div className="relative"><Mail className="absolute left-3 top-3 w-4 h-4 text-ink-muted" /><input type="email" placeholder="name@example.com" className="pixel-input pl-10" required /></div></div>
                    {mode !== "forgot" && <div><label className="section-pixel mb-1.5 block">Password</label><div className="relative"><Lock className="absolute left-3 top-3 w-4 h-4 text-ink-muted" /><input type="password" placeholder="••••••••" className="pixel-input pl-10" required /></div></div>}
                    {mode === "login" && <div className="flex items-center justify-between"><label className="flex items-center gap-2 text-[11px] text-ink-muted sans"><input type="checkbox" className="accent-forest rounded" /> Remember me</label><button type="button" onClick={() => setMode("forgot")} className="text-[11px] text-forest hover:text-forest-light font-semibold sans">Forgot password?</button></div>}
                    <button type="submit" className="w-full pixel-btn pixel-btn-primary justify-center py-2.5">
                      {mode === "login" ? "Log In" : mode === "signup" ? "Create Account" : "Send Reset Link"} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                  <div className="pixel-divider-dashed my-6" />
                  <p className="text-center text-[11px] text-ink-muted sans">
                    {mode === "login" && <>Don't have an account? <button onClick={() => setMode("signup")} className="font-bold text-ink hover:text-forest">Sign up</button></>}
                    {mode === "signup" && <>Already have an account? <button onClick={() => setMode("login")} className="font-bold text-ink hover:text-forest">Log in</button></>}
                    {mode === "forgot" && <>Remember your password? <button onClick={() => setMode("login")} className="font-bold text-ink hover:text-forest">Log in</button></>}
                  </p>
                </div>
              </div>
              <p className="text-center text-[10px] text-ink-muted/50 mt-4 sans">Secured by SkillBridge · Privacy Policy</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
