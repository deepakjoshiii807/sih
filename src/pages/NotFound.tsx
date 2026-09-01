import { Link } from "react-router";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0B11] relative">
      <div className="ambient" />
      <Navbar />
      <main className="relative z-10 flex flex-col items-center justify-center py-32 px-4">
        <div className="glass rounded-2xl p-10 text-center max-w-sm">
          <p className="text-5xl font-bold gradient-text mb-2">404</p>
          <p className="text-[13px] text-white/30 mb-6 sans">The page you're looking for doesn't exist.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white text-[13px] font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all sans">Back to Home</Link>
        </div>
      </main>
    </div>
  );
}
