import { ArrowLeft, Sparkles, GraduationCap, Target } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { AuthForm } from "@/components/ui/premium-auth";

export default function Login() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0F] overflow-hidden">
      {/* Background atmosphere */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[700px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "rgba(34,197,94,0.07)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 h-[400px] w-[500px] rounded-full blur-[100px]"
        style={{ background: "rgba(59,130,246,0.05)" }}
      />

      {/* Back to home */}
      <Link
        to="/"
        className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white sm:left-6 sm:top-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Main layout */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-20 sm:px-6 lg:px-8">
        {/* ─── Left Bento Grid (desktop only) ─── */}
        <div className="hidden lg:grid lg:w-3/5 lg:grid-cols-2 lg:gap-3 lg:pr-6">
          {/* Brand hero card */}
          <div className="group col-span-2 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 transition-colors hover:border-white/[0.15]">
            <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/15 blur-3xl transition-all duration-700 group-hover:scale-110" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl" />
            <div className="relative z-10">
              <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                Lead2Learn
              </span>
              <h2
                className="mt-4 text-4xl font-bold leading-tight text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Discover.
                <br />
                Learn.
                <br />
                Grow.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/40">
                The AI-powered platform connecting students with courses,
                scholarships, internships and jobs across India.
              </p>
            </div>
          </div>

          {/* Stat: Students */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/[0.15] hover:bg-white/[0.05]">
            <GraduationCap className="h-5 w-5 text-primary/70" />
            <span
              className="mt-3 block text-3xl font-bold text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              10,000+
            </span>
            <p className="mt-1 text-xs text-white/40">Active Students</p>
          </div>

          {/* Stat: Match Rate */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-white/[0.15] hover:bg-white/[0.05]">
            <Target className="h-5 w-5 text-primary/70" />
            <span
              className="mt-3 block text-3xl font-bold text-primary"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              92%
            </span>
            <p className="mt-1 text-xs text-white/40">Average Match Rate</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[92%] rounded-full bg-primary/70 transition-all duration-700 group-hover:w-full" />
            </div>
          </div>

          {/* AI Feature card */}
          <div className="group col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/[0.15]">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-white">
                AI-Powered Matching
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-white/40">
              Our semantic skill engine analyzes your profile, goals, and
              interests to surface the most relevant opportunities — courses,
              scholarships, internships, and jobs tailored to you.
            </p>
          </div>
        </div>

        {/* ─── Right: Auth Form ─── */}
        <div className="w-full lg:w-2/5 lg:pl-6">
          {/* Mobile brand header */}
          <div className="mb-6 text-center lg:hidden">
            <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              Lead2Learn
            </span>
            <h1
              className="mt-3 text-2xl font-bold text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Discover. Learn. Grow.
            </h1>
            <p className="mt-1 text-xs text-white/40">
              Sign in or create your account to get started
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101014]/80 p-px shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <AuthForm initialMode={initialMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
