import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-[#FAF8F2]/95 backdrop-blur-sm border-b border-[#D4CFC4]">
      <div className="paper-texture max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 bg-[#2C2C2C] flex items-center justify-center">
              <span className="text-[#FAF8F2] font-serif font-bold text-sm">O</span>
            </div>
            <div className="hidden sm:block">
              <span className="editorial-heading text-lg text-ink tracking-tight">Opportune</span>
              <span className="hidden md:inline text-[10px] text-[#6B6560] ml-2 tracking-wide uppercase">Discover. Learn. Grow.</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-3 py-1.5 text-[13px] font-medium text-[#3D3D3D] hover:text-[#1a1a1a] hover:bg-[#E8E4DA]/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchFocused(!searchFocused)}
              className="p-2 text-[#6B6560] hover:text-[#1a1a1a] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <Link
              to="/auth"
              className="hidden sm:inline-flex px-3 py-1.5 text-[13px] font-medium text-[#3D3D3D] hover:text-[#1a1a1a] transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/auth?returnTo=/dashboard"
              className="hidden sm:inline-flex px-4 py-1.5 bg-[#2C2C2C] text-[#FAF8F2] text-[13px] font-medium hover:bg-[#1a1a1a] transition-colors"
            >
              Get Started
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#3D3D3D]"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar expandable */}
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
                  className="w-full px-4 py-2 bg-[#FAF8F2] border border-[#D4CFC4] text-sm text-[#1a1a1a] placeholder:text-[#8A8580] focus:outline-none focus:border-[#3D4F6F]"
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

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-[#FAF8F2] border-t border-[#D4CFC4]"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-[#3D3D3D] hover:bg-[#E8E4DA]/60 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-[#D4CFC4] mt-2 pt-2 flex flex-col gap-1">
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-[#3D3D3D] hover:bg-[#E8E4DA]/60"
                >
                  Log in
                </Link>
                <Link
                  to="/auth?returnTo=/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 bg-[#2C2C2C] text-[#FAF8F2] text-sm font-medium text-center hover:bg-[#1a1a1a]"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
