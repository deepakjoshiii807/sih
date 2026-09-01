import { Link } from "react-router";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] relative">
      <div className="ambient-glow" />
      <Navbar />
      <main className="relative z-10 flex flex-col items-center justify-center py-32 px-4">
        <div className="glass rounded-2xl p-10 text-center max-w-sm">
          <p className="text-5xl font-bold gradient-text mb-4">404</p>
          <p className="text-sm text-white/50 mb-6">The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
