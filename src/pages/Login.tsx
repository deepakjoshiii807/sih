import { useState } from "react";
import { useNavigate } from "react-router";
import SparkBadge from "@/components/SparkBadge";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend
    console.log(mode, { email, password, name });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0A0A0F]">
      {/* SparkBadge rain background — full bleed */}
      <div className="absolute inset-0 z-0">
        <SparkBadge className="w-full h-full" />
      </div>

      {/* Dark overlay to ensure form readability */}
      <div className="absolute inset-0 z-[5] bg-[#0A0A0F]/60" />

      {/* Login form — centered */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div
          className="w-full max-w-md"
          style={{
            animation: "fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white text-xl font-bold tracking-tight">
                Lead2Learn
              </span>
            </div>
            <p className="text-white/40 text-sm">
              {mode === "login"
                ? "Welcome back. Sign in to continue."
                : "Create your account to get started."}
            </p>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl border border-white/[0.06] p-8"
            style={{
              background: "linear-gradient(145deg, rgba(30,41,59,0.5) 0%, rgba(15,23,42,0.6) 100%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* Tab toggle */}
            <div className="flex rounded-xl bg-white/[0.04] p-1 mb-6">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  mode === "login"
                    ? "bg-white/[0.08] text-white shadow-sm"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  mode === "signup"
                    ? "bg-white/[0.08] text-white shadow-sm"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name — signup only */}
              {mode === "signup" && (
                <div>
                  <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Shubham"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/25 text-sm outline-none focus:border-green-500/40 focus:ring-1 focus:ring-green-500/20 transition-all duration-300"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/25 text-sm outline-none focus:border-green-500/40 focus:ring-1 focus:ring-green-500/20 transition-all duration-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white placeholder-white/25 text-sm outline-none focus:border-green-500/40 focus:ring-1 focus:ring-green-500/20 transition-all duration-300"
                />
              </div>

              {/* Forgot password */}
              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-green-400/70 text-xs hover:text-green-400 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:translate-y-[-1px]"
                style={{
                  background: "linear-gradient(180deg, #22c55e 0%, #16a34a 100%)",
                  boxShadow: "0 0 0 1px rgba(34,197,94,0.3), 0 4px 12px rgba(34,197,94,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                {mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-white/25 text-xs uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Social login */}
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white/60 text-sm font-medium hover:bg-white/[0.06] hover:text-white/80 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Back link */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-white/30 text-xs hover:text-white/50 transition-colors inline-flex items-center gap-1.5"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </button>
          </div>
        </div>
      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spark-badge { width: 100%; height: 100%; }
        .spark-badge__frame {
          width: 100%; height: 100%; border: none; display: block;
        }
      `}</style>
    </div>
  );
}
