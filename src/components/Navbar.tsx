import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Bell, User } from "lucide-react";
import { PixelChip } from "./PixelIcons";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Opportunities", href: "/explore" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Community", href: "/community" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-cream border-b-[3px] border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 bg-forest border-2 border-[#2A4A35] shadow-[2px_2px_0px_#2A4A35] flex items-center justify-center">
                <PixelChip className="text-cream" size={16} />
              </div>
              <div className="hidden sm:block">
                <span className="text-[11px] font-bold text-ink tracking-wider pixel block leading-tight">SKILLBRIDGE</span>
                <span className="text-[8px] text-ink-muted block leading-tight">Academia–Industry Portal</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => (
                <Link key={l.label} to={l.href} className="px-3 py-1.5 text-[12px] font-semibold text-ink-light hover:text-ink hover:bg-cream-dark rounded transition-all sans">{l.label}</Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button className="p-2 text-ink-muted hover:text-ink hover:bg-cream-dark rounded transition-all" aria-label="Search"><Search className="w-4 h-4" /></button>
              <button className="p-2 text-ink-muted hover:text-ink hover:bg-cream-dark rounded transition-all relative" aria-label="Notifications">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C75B4A] border border-white rounded-full" />
              </button>
              <Link to="/profile" className="hidden sm:flex p-2 text-ink-muted hover:text-ink hover:bg-cream-dark rounded transition-all"><User className="w-4 h-4" /></Link>
              <Link to="/onboarding" className="hidden sm:inline-flex pixel-btn pixel-btn-primary text-[7px] py-1.5 px-3">Get Started</Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-ink-muted hover:text-ink rounded transition-all" aria-label="Menu">
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden bg-cream border-b-[3px] border-ink">
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link key={l.label} to={l.href} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-[12px] font-semibold text-ink-light hover:text-ink hover:bg-cream-dark rounded transition-all sans">{l.label}</Link>
              ))}
              <div className="pixel-divider-dashed my-2" />
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-[12px] font-semibold text-ink-light hover:text-ink hover:bg-cream-dark rounded sans">Log in</Link>
              <Link to="/onboarding" onClick={() => setMobileOpen(false)} className="pixel-btn pixel-btn-primary text-center text-[8px] py-2">Get Started</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
