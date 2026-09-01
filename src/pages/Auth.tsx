import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Lock, User, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

type AuthMode = "login" | "signup" | "forgot";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("login");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F0EEE6]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-[#FAF8F2] ink-border paper-shadow-lg p-8 relative">
                <div className="tape" />

                {mode === "forgot" && (
                  <button onClick={() => setMode("login")} className="flex items-center gap-1 text-[12px] text-[#7A7570] hover:text-[#1A1A1A] mb-6 sans-ui">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to login
                  </button>
                )}

                {/* Logo */}
                <div className="text-center mb-6 mt-2">
                  <div className="w-10 h-10 bg-[#1A1A1A] flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#FAF8F2] font-bold text-sm editorial">O</span>
                  </div>
                  <h1 className="heading-lg text-xl text-[#1A1A1A]">
                    {mode === "login" && "Welcome back"}
                    {mode === "signup" && "Create your account"}
                    {mode === "forgot" && "Reset password"}
                  </h1>
                  <p className="text-[12px] text-[#8A8580] mt-1 sans-ui">
                    {mode === "login" && "Sign in to continue your journey"}
                    {mode === "signup" && "Start discovering opportunities"}
                    {mode === "forgot" && "Enter your email to receive a reset link"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <label className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.15em] mb-1.5 block sans-ui">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-[#8A8580]" />
                        <input type="text" placeholder="Your name" className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] ink-border text-[13px] editorial placeholder:text-[#D4CFC4] focus:outline-none focus:border-[#3D4F6F]" required />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.15em] mb-1.5 block sans-ui">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-[#8A8580]" />
                      <input type="email" placeholder="name@example.com" className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] ink-border text-[13px] editorial placeholder:text-[#D4CFC4] focus:outline-none focus:border-[#3D4F6F]" required />
                    </div>
                  </div>

                  {mode !== "forgot" && (
                    <div>
                      <label className="text-[10px] font-bold text-[#8A8580] uppercase tracking-[0.15em] mb-1.5 block sans-ui">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-4 h-4 text-[#8A8580]" />
                        <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] ink-border text-[13px] editorial placeholder:text-[#D4CFC4] focus:outline-none focus:border-[#3D4F6F]" required />
                      </div>
                    </div>
                  )}

                  {mode === "login" && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-[12px] text-[#7A7570] sans-ui">
                        <input type="checkbox" className="accent-[#1A1A1A]" /> Remember me
                      </label>
                      <button type="button" onClick={() => setMode("forgot")} className="text-[12px] text-[#3D4F6F] hover:text-[#1A1A1A] sans-ui">
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button type="submit" className="btn-paper btn-ink w-full justify-center text-[13px]">
                    {mode === "login" && "Log In"}
                    {mode === "signup" && "Create Account"}
                    {mode === "forgot" && "Send Reset Link"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="rule my-6" />

                <p className="text-center text-[12px] text-[#7A7570] sans-ui">
                  {mode === "login" && (
                    <>Don't have an account? <button onClick={() => setMode("signup")} className="font-semibold text-[#1A1A1A] hover:text-[#3D4F6F]">Sign up</button></>
                  )}
                  {mode === "signup" && (
                    <>Already have an account? <button onClick={() => setMode("login")} className="font-semibold text-[#1A1A1A] hover:text-[#3D4F6F]">Log in</button></>
                  )}
                  {mode === "forgot" && (
                    <>Remember your password? <button onClick={() => setMode("login")} className="font-semibold text-[#1A1A1A] hover:text-[#3D4F6F]">Log in</button></>
                  )}
                </p>
              </div>

              <p className="text-center text-[10px] text-[#8A8580] mt-4 sans-ui">
                Secured by Opportune · <span className="underline">Privacy Policy</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
