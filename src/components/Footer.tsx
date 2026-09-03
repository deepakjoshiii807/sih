import { Link } from "react-router";
import { PixelChip } from "./PixelIcons";

export default function Footer() {
  return (
    <footer className="bg-ink border-t-[3px] border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-forest border-2 border-[#2A4A35] shadow-[2px_2px_0px_#2A4A35] flex items-center justify-center"><PixelChip className="text-cream" size={12} /></div>
              <span className="text-[10px] font-bold text-cream tracking-wider pixel">SKILLBRIDGE</span>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed sans">Academia–Industry collaboration portal for India's students.</p>
          </div>
          {[
            { title: "Explore", links: [{ l: "Courses", h: "/explore?type=course" }, { l: "Scholarships", h: "/explore?type=scholarship" }, { l: "Internships", h: "/explore?type=internship" }, { l: "Jobs", h: "/explore?type=job" }] },
            { title: "Community", links: [{ l: "Discussions", h: "/community" }, { l: "AI & ML", h: "/community" }, { l: "Web Dev", h: "/community" }, { l: "Scholarships", h: "/community" }] },
            { title: "Company", links: [{ l: "About", h: "#" }, { l: "Privacy", h: "#" }, { l: "Terms", h: "#" }, { l: "Contact", h: "#" }] },
          ].map((c) => (
            <div key={c.title}>
              <h4 className="pixel text-[7px] text-white/30 uppercase tracking-wider mb-3">{c.title}</h4>
              <ul className="space-y-1.5">{c.links.map((lk) => <li key={lk.l}><Link to={lk.h} className="text-[11px] text-white/30 hover:text-white/60 transition-colors sans">{lk.l}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="pixel-divider my-8" style={{ background: "rgba(255,255,255,0.1)" }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-white/20 sans">© 2026 SkillBridge · SIH26044</p>
          <p className="pixel text-[7px] text-white/15">YOUR NEXT STEP IS ONE SEARCH AWAY</p>
        </div>
      </div>
    </footer>
  );
}
