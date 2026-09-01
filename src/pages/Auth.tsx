import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User, ArrowLeft, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

type Mode = "login" | "signup" | "forgot";

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); navigate("/dashboard"); };

  return (
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <div className="relative z-10 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
              <div className="glass rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#7C6BF0]/[0.04] to-transparent pointer-events-none" />
                <div className="relative z-10">
                  {mode === "forgot" && <button onClick={() => setMode("login")} className="flex items-center gap-1 text-[12px] text-white/25 hover:text-white/50 mb-6 sans"><ArrowLeft className="w-3.5 h-3.5" /> Back to login</button>}
                  <div className="text-center mb-6 mt-1">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C6BF0] to-[#5B8DEF] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/20"><Zap className="w-5 h-5 text-white" /></div>
                    <h1 className="text-xl font-bold text-white tracking-tight">{mode === "login" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset password"}</h1>
                    <p className="text-[12px] text-white/25 mt-1 sans">{mode === "login" ? "Sign in to continue your journey" : mode === "signup" ? "Start discovering opportunities" : "Enter your email to receive a reset link"}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "signup" && <div><label className="text-[9px] font-semibold text-white/25 uppercase tracking-wider mb-1.5 block sans">Full Name</label><div className="relative"><User className="absolute left-3 top-3 w-4 h-4 text-white/20" /><input type="text" placeholder="Your name" className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[13px] text-white placeholder:text-white/10 focus:outline-none focus:border-[#7C6BF0]/40 transition-all sans" required /></div></div>}
                    <div><label className="text-[9px] font-semibold text-white/25 uppercase tracking-wider mb-1.5 block sans">Email</label><div className="relative"><Mail className="absolute left-3 top-3 w-4 h-4 text-white/20" /><input type="email" placeholder="name@example.com" className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[13px] text-white placeholder:text-white/10 focus:outline-none focus:border-[#7C6BF0]/40 transition-all sans" required /></div></div>
                    {mode !== "forgot" && <div><label className="text-[9px] font-semibold text-white/25 uppercase tracking-wider mb-1.5 block sans">Password</label><div className="relative"><Lock className="absolute left-3 top-3 w-4 h-4 text-white/20" /><input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-[13px] text-white placeholder:text-white/10 focus:outline-none focus:border-[#7C6BF0]/40 transition-all sans" required /></div></div>}
                    {mode === "login" && <div className="flex items-center justify-between"><label className="flex items-center gap-2 text-[11px] text-white/30 sans"><input type="checkbox" className="accent-[#7C6BF0] rounded" /> Remember me</label><button type="button" onClick={() => setMode("forgot")} className="text-[11px] text-[#5B8DEF] hover:text-[#A8C8FF] sans">Forgot password?</button></div>}
                    <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white text-[13px] font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all sans">
                      {mode === "login" ? "Log In" : mode === "signup" ? "Create Account" : "Send Reset Link"} <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                  <div className="divider my-6" />
                  <p className="text-center text-[11px] text-white/25 sans">
                    {mode === "login" && <>Don't have an account? <button onClick={() => setMode("signup")} className="font-semibold text-white/60 hover:text-white">Sign up</button></>}
                    {mode === "signup" && <>Already have an account? <button onClick={() => setMode("login")} className="font-semibold text-white/60 hover:text-white">Log in</button></>}
                    {mode === "forgot" && <>Remember your password? <button onClick={() => setMode("login")} className="font-semibold text-white/60 hover:text-white">Log in</button></>}
                  </p>
                </div>
              </div>
              <p className="text-center text-[10px] text-white/15 mt-4 sans">Secured by Opportune · Privacy Policy</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
