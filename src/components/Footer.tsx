import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#E8E4DA] border-t border-[#D4CFC4] paper-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-7 h-7 bg-[#2C2C2C] flex items-center justify-center">
                <span className="text-[#FAF8F2] font-serif font-bold text-xs">O</span>
              </div>
              <span className="editorial-heading text-base text-[#1a1a1a]">Opportune</span>
            </div>
            <p className="text-xs text-[#6B6560] leading-relaxed">
              AI-powered opportunity discovery for students and young professionals in India.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/explore?type=course" className="text-xs text-[#6B6560] hover:text-[#1a1a1a] transition-colors">Courses</Link></li>
              <li><Link to="/explore?type=scholarship" className="text-xs text-[#6B6560] hover:text-[#1a1a1a] transition-colors">Scholarships</Link></li>
              <li><Link to="/explore?type=internship" className="text-xs text-[#6B6560] hover:text-[#1a1a1a] transition-colors">Internships</Link></li>
              <li><Link to="/explore?type=job" className="text-xs text-[#6B6560] hover:text-[#1a1a1a] transition-colors">Jobs</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-wider mb-3">Community</h4>
            <ul className="space-y-2">
              <li><Link to="/community" className="text-xs text-[#6B6560] hover:text-[#1a1a1a] transition-colors">Discussions</Link></li>
              <li><Link to="/community" className="text-xs text-[#6B6560] hover:text-[#1a1a1a] transition-colors">AI & ML</Link></li>
              <li><Link to="/community" className="text-xs text-[#6B6560] hover:text-[#1a1a1a] transition-colors">Web Dev</Link></li>
              <li><Link to="/community" className="text-xs text-[#6B6560] hover:text-[#1a1a1a] transition-colors">Scholarships</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-[#1a1a1a] uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2">
              <li><span className="text-xs text-[#6B6560]">About</span></li>
              <li><span className="text-xs text-[#6B6560]">Privacy</span></li>
              <li><span className="text-xs text-[#6B6560]">Terms</span></li>
              <li><span className="text-xs text-[#6B6560]">Contact</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#D4CFC4]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-[#8A8580]">
              © 2026 Opportune. Made with care for India's students.
            </p>
            <p className="text-[11px] text-[#8A8580] italic">
              "Your next opportunity is one search away."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
