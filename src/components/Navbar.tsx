import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Bell, User } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-[#FAF8F2]/95 backdrop-blur-sm border-b border-[#D4CFC4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-7 h-7 bg-[#1A1A1A] flex items-center justify-center">
              <span className="text-[#FAF8F2] font-bold text-xs editorial">O</span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[14px] font-bold tracking-tight editorial text-[#1A1A1A]">OPPORTUNE</span>
              <span className="text-[9px] text-[#8A8580] tracking-[0.15em] sans-ui">Discover. Learn. Grow.</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-3 py-1.5 text-[12px] font-medium text-[#7A7570] hover:text-[#1A1A1A] hover:bg-[#E8E4DA]/60 transition-colors sans-ui"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-1">
            <button className="p-2 text-[#7A7570] hover:text-[#1A1A1A] hover:bg-[#E8E4DA]/60 transition-colors rounded" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#7A7570] hover:text-[#1A1A1A] hover:bg-[#E8E4DA]/60 transition-colors rounded relative" aria-label="Notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#B87654] rounded-full" />
            </button>
            <Link to="/auth" className="hidden sm:flex p-2 text-[#7A7570] hover:text-[#1A1A1A] transition-colors">
              <User className="w-4 h-4" />
            </Link>
            <Link
              to="/onboarding"
              className="hidden sm:inline-flex btn-paper btn-ink text-[12px] py-1.5 px-3"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#3D3D3D]"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[#FAF8F2] border-t border-[#D4CFC4]"
          >
            <nav className="px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm text-[#7A7570] hover:bg-[#E8E4DA]/60 transition-colors sans-ui"
                >
                  {link.label}
                </Link>
              ))}
              <div className="rule my-2" />
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-sm text-[#7A7570] hover:bg-[#E8E4DA]/60 sans-ui">
                Log in
              </Link>
              <Link to="/onboarding" onClick={() => setMobileOpen(false)} className="px-3 py-2 bg-[#1A1A1A] text-[#FAF8F2] text-sm font-medium text-center sans-ui">
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
