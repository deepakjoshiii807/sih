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
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm">
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 bg-ink flex items-center justify-center">
                <PixelChip className="text-cream" size={16} />
              </div>
              <div className="hidden sm:block leading-none">
                <span className="pixel text-[9px] text-ink block tracking-wider">SKILLBRIDGE</span>
                <span className="text-[9px] text-ink-muted block mt-0.5">Academia–Industry Portal</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => (
                <Link key={l.label} to={l.href} className="px-3.5 py-1.5 text-[12px] font-medium text-ink-muted hover:text-ink transition-colors">{l.label}</Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button className="p-2 text-ink-muted hover:text-ink transition-colors" aria-label="Search"><Search className="w-4 h-4" /></button>
              <button className="p-2 text-ink-muted hover:text-ink transition-colors relative" aria-label="Notifications">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full" />
              </button>
              <Link to="/profile" className="hidden sm:flex p-2 text-ink-muted hover:text-ink transition-colors"><User className="w-4 h-4" /></Link>
              <Link to="/onboarding" className="hidden sm:inline-flex pixel-btn pixel-btn-green text-[7px]">Get Started</Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-ink-muted hover:text-ink transition-colors" aria-label="Menu">
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden bg-cream border-b border-border">
            <nav className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link key={l.label} to={l.href} onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-[13px] font-medium text-ink-light hover:text-ink transition-colors">{l.label}</Link>
              ))}
              <div className="pixel-divider-light my-3" />
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-[13px] font-medium text-ink-light hover:text-ink transition-colors">Log in</Link>
              <Link to="/onboarding" onClick={() => setMobileOpen(false)} className="pixel-btn pixel-btn-green text-center text-[7px] py-2.5 mt-1">Get Started</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
