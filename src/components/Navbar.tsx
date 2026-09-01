import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Scholarships", href: "/explore?type=scholarship" },
  { label: "Internships", href: "/explore?type=internship" },
  { label: "Courses", href: "/explore?type=course" },
  { label: "Jobs", href: "/explore?type=job" },
  { label: "Community", href: "/community" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-strong border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6C5CE7] to-[#5B8DEF] flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-[15px] font-semibold text-white tracking-tight">
                Opportune
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="px-3 py-1.5 text-[13px] font-medium text-white/50 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSearchFocused(!searchFocused)}
                className="p-2 text-white/40 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <Link
                to="/auth"
                className="hidden sm:inline-flex px-3 py-1.5 text-[13px] font-medium text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]"
              >
                Log in
              </Link>
              <Link
                to="/auth?returnTo=/dashboard"
                className="hidden sm:inline-flex px-4 py-1.5 text-[13px] font-semibold text-white bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 rounded-lg"
              >
                Get Started
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Expandable search */}
          <AnimatePresence>
            {searchFocused && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pb-3">
                  <input
                    type="text"
                    placeholder="Search opportunities..."
                    className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-xl text-sm text-white placeholder:text-white/30 input-glass"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const value = (e.target as HTMLInputElement).value;
                        if (value.trim()) {
                          navigate(`/explore?q=${encodeURIComponent(value.trim())}`);
                        }
                        setSearchFocused(false);
                      }
                      if (e.key === "Escape") setSearchFocused(false);
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden glass-strong border-b border-white/[0.06]"
          >
            <nav className="px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="divider-glass my-2" />
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg"
              >
                Log in
              </Link>
              <Link
                to="/auth?returnTo=/dashboard"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 bg-gradient-to-r from-[#6C5CE7] to-[#5B8DEF] text-white text-sm font-semibold text-center rounded-lg"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
