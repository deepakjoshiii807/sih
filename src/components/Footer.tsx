import { Link } from "react-router";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#08080C] border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7C6BF0] to-[#5B8DEF] flex items-center justify-center"><Zap className="w-3.5 h-3.5 text-white" /></div>
              <span className="text-[13px] font-semibold text-white tracking-tight">Opportune</span>
            </div>
            <p className="text-[11px] text-white/25 leading-relaxed sans">AI-powered opportunity discovery for India's students.</p>
          </div>
          {[
            { title: "Explore", links: [{ l: "Courses", h: "/explore?type=course" }, { l: "Scholarships", h: "/explore?type=scholarship" }, { l: "Internships", h: "/explore?type=internship" }, { l: "Jobs", h: "/explore?type=job" }] },
            { title: "Community", links: [{ l: "Discussions", h: "/community" }, { l: "AI & ML", h: "/community" }, { l: "Web Dev", h: "/community" }, { l: "Scholarships", h: "/community" }] },
            { title: "Company", links: [{ l: "About", h: "#" }, { l: "Privacy", h: "#" }, { l: "Terms", h: "#" }, { l: "Contact", h: "#" }] },
          ].map((c) => (
            <div key={c.title}>
              <h4 className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mb-3 sans">{c.title}</h4>
              <ul className="space-y-1.5">{c.links.map((lk) => <li key={lk.l}><Link to={lk.h} className="text-[11px] text-white/25 hover:text-white/60 transition-colors sans">{lk.l}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="divider my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-white/15 sans">© 2026 Opportune. Built with precision.</p>
          <p className="text-[10px] text-white/15 italic serif">Your next opportunity is one search away.</p>
        </div>
      </div>
    </footer>
  );
}
