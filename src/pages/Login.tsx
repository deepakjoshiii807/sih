import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { AuthForm } from "@/components/ui/premium-auth";

export default function Login() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#0A0A0F] px-4 py-16">
      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, rgba(34,197,94,0.08), transparent 60%)",
        }}
      />
      {/* Noise texture */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />

      {/* Back to home */}
      <Link
        to="/"
        className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white sm:left-6 sm:top-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Auth card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-[#101014]/90 p-2 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <AuthForm initialMode={initialMode} />
        </div>
        <p className="mt-6 text-center text-xs text-white/30">
          Lead2Learn — Discover. Learn. Grow.
        </p>
      </div>
    </div>
  );
}
