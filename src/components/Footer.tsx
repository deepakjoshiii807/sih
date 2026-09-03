import { Link } from "react-router";
import { PixelChip } from "./PixelIcons";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-ink flex items-center justify-center">
                <PixelChip className="text-cream" size={12} />
              </div>
              <span className="pixel text-[8px] text-ink tracking-wider">SKILLBRIDGE</span>
            </div>
            <p className="text-[11px] text-ink-muted leading-relaxed">Academia–Industry Portal</p>
          </div>
          <div>
            <p className="pixel text-[7px] text-ink-muted tracking-widest mb-3">EXPLORE</p>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-[12px] text-ink-light hover:text-ink transition-colors">Opportunities</Link></li>
              <li><Link to="/roadmap" className="text-[12px] text-ink-light hover:text-ink transition-colors">Career Roadmap</Link></li>
              <li><Link to="/community" className="text-[12px] text-ink-light hover:text-ink transition-colors">Community</Link></li>
            </ul>
          </div>
          <div>
            <p className="pixel text-[7px] text-ink-muted tracking-widest mb-3">FOR</p>
            <ul className="space-y-2">
              <li><span className="text-[12px] text-ink-light">Students</span></li>
              <li><span className="text-[12px] text-ink-light">Industry</span></li>
              <li><span className="text-[12px] text-ink-light">Academicians</span></li>
              <li><span className="text-[12px] text-ink-light">Institutions</span></li>
            </ul>
          </div>
          <div>
            <p className="pixel text-[7px] text-ink-muted tracking-widest mb-3">LEGAL</p>
            <ul className="space-y-2">
              <li><span className="text-[12px] text-ink-light">Privacy</span></li>
              <li><span className="text-[12px] text-ink-light">Terms</span></li>
            </ul>
          </div>
        </div>
        <div className="pixel-divider-light" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-6">
          <p className="text-[10px] text-ink-muted">© 2026 SkillBridge · SIH26044</p>
          <p className="pixel text-[7px] text-ink-muted/50">BUILT FOR INDIA</p>
        </div>
      </div>
    </footer>
  );
}
