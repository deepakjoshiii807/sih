import { cn } from "@/lib/utils";

export default function SiteFooter() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        .footer-poppins * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <footer className="footer-poppins flex flex-col items-center justify-around w-full py-16 text-sm bg-slate-50 text-gray-800/70">
        {/* L2L SVG Logo */}
        <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield shape */}
          <path
            d="M15.5 2 L28 8 L28 20 Q28 32 15.5 38 Q3 32 3 20 L3 8 Z"
            stroke="#22C55E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Inner lines */}
          <path
            d="M15.5 8 L23 12 L23 20 Q23 28 15.5 32 Q8 28 8 20 L8 12 Z"
            stroke="#22C55E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.4"
          />
          {/* Center dot */}
          <circle cx="15.5" cy="20" r="2" fill="#22C55E" />
          {/* L2L text */}
          <text x="38" y="25" fill="#1a1a1a" fontSize="18" fontWeight="800" fontFamily="'Poppins', sans-serif" letterSpacing="-0.5">
            L2L
          </text>
        </svg>

        <p className="mt-4 text-center max-w-md">
          Discover courses, scholarships, internships and jobs tailored to your skills, goals and interests across India.
        </p>

        <div className="flex items-center gap-4 mt-6">
          <a href="#" className="font-medium text-gray-800 hover:text-black transition-all">
            About
          </a>
          <div className="h-4 w-px bg-black/20"></div>
          <a href="#" className="font-medium text-gray-800 hover:text-black transition-all">
            Privacy Policy
          </a>
          <div className="h-4 w-px bg-black/20"></div>
          <a href="#" className="font-medium text-gray-800 hover:text-black transition-all">
            Terms of Service
          </a>
        </div>

        <p className="mt-6 text-center text-gray-400 text-xs">
          Copyright © {new Date().getFullYear()} Lead2Learn. All rights reserved.
        </p>
      </footer>
    </>
  );
}
