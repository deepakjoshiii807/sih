import { useState } from "react";
import { PrismaHero } from "@/components/ui/prisma-hero";
import AboutBento from "@/components/ui/about-bento";

const navItems = ["About", "Opportunities", "Scholarships", "Internships", "Contact"];

export default function Auth() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Fixed navbar — always on top */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="flex items-center gap-3 rounded-b-2xl bg-black/80 backdrop-blur-md px-4 py-2 sm:gap-6 md:gap-12 md:rounded-b-3xl md:px-8 lg:gap-14">
          <span className="text-[#E1E0CC] font-bold text-sm tracking-tight mr-2 sm:mr-4">L2L</span>
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[10px] transition-colors sm:text-xs md:text-sm hidden md:inline-block"
              style={{ color: "rgba(225, 224, 204, 0.8)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")}
            >
              {item}
            </a>
          ))}
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-4 h-[1.5px] bg-[#E1E0CC]" />
            <span className="block w-4 h-[1.5px] bg-[#E1E0CC]" />
            <span className="block w-4 h-[1.5px] bg-[#E1E0CC]" />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/90 backdrop-blur-md rounded-2xl px-6 py-4 flex flex-col items-center gap-3 md:hidden">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors"
                style={{ color: "rgba(225, 224, 204, 0.8)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      <PrismaHero />
      <AboutBento />
    </div>
  );
}
