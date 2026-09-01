import { Link } from "react-router";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#08080C] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#6C5CE7] to-[#5B8DEF] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-white tracking-tight">Opportune</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed">
              AI-powered opportunity discovery for students and young professionals in India.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/explore?type=course" className="text-xs text-white/30 hover:text-white/70 transition-colors">Courses</Link></li>
              <li><Link to="/explore?type=scholarship" className="text-xs text-white/30 hover:text-white/70 transition-colors">Scholarships</Link></li>
              <li><Link to="/explore?type=internship" className="text-xs text-white/30 hover:text-white/70 transition-colors">Internships</Link></li>
              <li><Link to="/explore?type=job" className="text-xs text-white/30 hover:text-white/70 transition-colors">Jobs</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-3">Community</h4>
            <ul className="space-y-2">
              <li><Link to="/community" className="text-xs text-white/30 hover:text-white/70 transition-colors">Discussions</Link></li>
              <li><Link to="/community" className="text-xs text-white/30 hover:text-white/70 transition-colors">AI & ML</Link></li>
              <li><Link to="/community" className="text-xs text-white/30 hover:text-white/70 transition-colors">Web Dev</Link></li>
              <li><Link to="/community" className="text-xs text-white/30 hover:text-white/70 transition-colors">Scholarships</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2">
              <li><span className="text-xs text-white/30">About</span></li>
              <li><span className="text-xs text-white/30">Privacy</span></li>
              <li><span className="text-xs text-white/30">Terms</span></li>
              <li><span className="text-xs text-white/30">Contact</span></li>
            </ul>
          </div>
        </div>

        <div className="divider-glass my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/20">
            © 2026 Opportune. Built with precision.
          </p>
          <p className="text-[11px] text-white/20 italic">
            Your next opportunity is one search away.
          </p>
        </div>
      </div>
    </footer>
  );
}
