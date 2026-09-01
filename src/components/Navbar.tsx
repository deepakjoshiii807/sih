import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Bell, User, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <div className="glass-strong border-b border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C6BF0] to-[#5B8DEF] flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-[14px] font-semibold text-white tracking-tight hidden sm:block">Opportune</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((l) => (
                <Link key={l.label} to={l.href} className="px-3 py-1.5 text-[12px] font-medium text-white/40 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all sans">{l.label}</Link>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button className="p-2 text-white/30 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all" aria-label="Search"><Search className="w-4 h-4" /></button>
              <button className="p-2 text-white/30 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all relative" aria-label="Notifications">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF6B6B] rounded-full" />
              </button>
              <Link to="/profile" className="hidden sm:flex p-2 text-white/30 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"><User className="w-4 h-4" /></Link>
              <Link to="/onboarding" className="hidden sm:inline-flex px-3.5 py-1.5 text-[12px] font-semibold text-white bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] rounded-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all">Get Started</Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white/50 hover:text-white rounded-lg transition-all" aria-label="Menu">
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden glass-strong border-b border-white/[0.05]">
            <nav className="px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map((l) => (
                <Link key={l.label} to={l.href} onClick={() => setMobileOpen(false)} className="px-3 py-2 text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all sans">{l.label}</Link>
              ))}
              <div className="divider my-2" />
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/[0.05] rounded-lg sans">Log in</Link>
              <Link to="/onboarding" onClick={() => setMobileOpen(false)} className="px-3 py-2 bg-gradient-to-r from-[#7C6BF0] to-[#5B8DEF] text-white text-[13px] font-semibold text-center rounded-lg">Get Started</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
