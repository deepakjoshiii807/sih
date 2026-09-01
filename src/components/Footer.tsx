import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#E8E4DA] border-t border-[#D4CFC4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#1A1A1A] flex items-center justify-center">
                <span className="text-[#FAF8F2] font-bold text-[10px] editorial">O</span>
              </div>
              <span className="text-[13px] font-bold tracking-tight editorial text-[#1A1A1A]">OPPORTUNE</span>
            </div>
            <p className="text-[11px] text-[#7A7570] leading-relaxed sans-ui">
              AI-powered opportunity discovery for India's students and young professionals.
            </p>
          </div>
          {[
            { title: "Explore", links: [{ label: "Courses", href: "/explore?type=course" }, { label: "Scholarships", href: "/explore?type=scholarship" }, { label: "Internships", href: "/explore?type=internship" }, { label: "Jobs", href: "/explore?type=job" }] },
            { title: "Community", links: [{ label: "Discussions", href: "/community" }, { label: "AI & ML", href: "/community" }, { label: "Web Dev", href: "/community" }, { label: "Scholarships", href: "/community" }] },
            { title: "Company", links: [{ label: "About", href: "#" }, { label: "Privacy", href: "#" }, { label: "Terms", href: "#" }, { label: "Contact", href: "#" }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-bold text-[#1A1A1A] uppercase tracking-[0.15em] mb-3 sans-ui">{col.title}</h4>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-[11px] text-[#7A7570] hover:text-[#1A1A1A] transition-colors sans-ui">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rule mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-[#8A8580] sans-ui">© 2026 Opportune. Built with care for India's students.</p>
          <p className="text-[10px] text-[#8A8580] italic editorial">"Your next opportunity is one search away."</p>
        </div>
      </div>
    </footer>
  );
}
