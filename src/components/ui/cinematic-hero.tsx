"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  brandName = "SkillBridge",
  tagline1 = "Build the skills,",
  tagline2 = "bridge the gap.",
  cardHeading = "Evidence-backed skill profiles.",
  cardDescription = (
    <>
      <span className="text-white font-semibold">SkillBridge</span> connects students with industry through verified skills, semantic matching, and real opportunity discovery.
    </>
  ),
  metricValue = 340,
  metricLabel = "Verified Skills",
  ctaHeading = "Start your journey.",
  ctaDescription = "Join thousands of students bridging the gap between academics and industry.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [scrollPhase, setScrollPhase] = useState(0); // 0=intro, 1=card, 2=cta
  const rafRef = useRef<number>(0);

  // Mount flag
  useEffect(() => { setMounted(true); }, []);

  // Mouse tracking for card sheen + 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          mockupRef.current.style.transform = `rotateY(${xVal * 12}deg) rotateX(${-yVal * 12}deg)`;
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("mousemove", handleMouseMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Scroll-based phase transitions (pure CSS/JS, no GSAP)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      if (progress < 0.15) setScrollPhase(0);
      else if (progress < 0.75) setScrollPhase(1);
      else setScrollPhase(2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Counter animation
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (scrollPhase < 1) return;
    let start = 0;
    const duration = 1500;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCounter(Math.floor(p * metricValue));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [scrollPhase, metricValue]);

  // Progress ring offset
  const ringOffset = scrollPhase >= 1 ? 60 : 402;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen overflow-hidden bg-[#0A101D] text-white font-sans antialiased", className)}
      style={{ height: mounted ? "400vh" : "100vh" }}
      {...props}
    >
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" aria-hidden="true"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* Background grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
      />

      {/* PHASE 0: Hero text */}
      <div
        className="fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-4 transition-all duration-700"
        style={{
          opacity: scrollPhase === 0 ? 1 : scrollPhase === 1 ? 0 : 0,
          transform: scrollPhase === 0 ? "scale(1)" : "scale(1.15)",
          filter: scrollPhase === 0 ? "blur(0px)" : "blur(20px)",
          pointerEvents: scrollPhase === 0 ? "auto" : "none",
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2"
          style={{ color: "white", textShadow: "0 10px 30px rgba(255,255,255,0.1), 0 2px 4px rgba(255,255,255,0.05)" }}>
          {tagline1}
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter"
          style={{ background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0px 10px 20px rgba(255,255,255,0.1))" }}>
          {tagline2}
        </h1>
      </div>

      {/* PHASE 1+2: Main card */}
      <div
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={mainCardRef}
          className="relative overflow-hidden flex items-center justify-center pointer-events-auto transition-all duration-[1800ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            width: scrollPhase === 0 ? "85vw" : scrollPhase === 1 ? "85vw" : "85vw",
            height: scrollPhase === 0 ? "85vh" : scrollPhase === 1 ? "100vh" : "85vh",
            borderRadius: scrollPhase === 0 ? "40px" : scrollPhase === 1 ? "0px" : "40px",
            transform: scrollPhase === 0 ? "translateY(calc(100vh + 200px))" : scrollPhase === 2 ? "translateY(-100vh)" : "translateY(0)",
            opacity: scrollPhase === 2 ? 0 : 1,
            background: "linear-gradient(145deg, #162C6D 0%, #0A101D 100%)",
            boxShadow: "0 40px 100px -20px rgba(0,0,0,0.9), 0 20px 40px -20px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.8)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Card sheen (mouse follow) */}
          <div className="absolute inset-0 pointer-events-none z-50" style={{ borderRadius: "inherit", background: "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%)", mixBlendMode: "screen" }} />

          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            {/* Right: Brand */}
            <div className={cn("order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full transition-all duration-700", scrollPhase >= 1 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12")}>
              <h2 className="text-5xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) drop-shadow(0px 4px 8px rgba(0,0,0,0.6))" }}>
                {brandName}
              </h2>
            </div>

            {/* Center: iPhone */}
            <div className={cn("order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10 transition-all duration-1000", scrollPhase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[300px]")} style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ transform: "scale(0.65)" }}>
                {/* iPhone */}
                <div ref={mockupRef} className="relative w-[280px] h-[580px] rounded-[3rem] flex flex-col will-change-transform" style={{ backgroundColor: "#111", boxShadow: "inset 0 0 0 2px #52525B, inset 0 0 0 7px #000, 0 40px 80px -15px rgba(0,0,0,0.9), 0 15px 25px -5px rgba(0,0,0,0.7)", transformStyle: "preserve-3d" }}>
                  {/* Hardware buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] rounded-l-md z-0" style={{ background: "linear-gradient(90deg, #404040, #171717)", boxShadow: "-2px 0 5px rgba(0,0,0,0.8)" }} />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] rounded-l-md z-0" style={{ background: "linear-gradient(90deg, #404040, #171717)", boxShadow: "-2px 0 5px rgba(0,0,0,0.8)" }} />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] rounded-l-md z-0" style={{ background: "linear-gradient(90deg, #404040, #171717)", boxShadow: "-2px 0 5px rgba(0,0,0,0.8)" }} />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] rounded-r-md z-0" style={{ background: "linear-gradient(270deg, #404040, #171717)", boxShadow: "2px 0 5px rgba(0,0,0,0.8)" }} />

                  {/* Screen */}
                  <div className="absolute inset-[7px] rounded-[2.5rem] overflow-hidden text-white z-10" style={{ backgroundColor: "#050914", boxShadow: "inset 0 0 15px rgba(0,0,0,1)" }}>
                    <div className="absolute inset-0 z-40 pointer-events-none" style={{ background: "linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%)" }} />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3" style={{ boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.1)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
                    </div>

                    {/* App content */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Dashboard</span>
                          <span className="text-xl font-bold tracking-tight text-white">SkillBridge</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-sm border border-white/10">SB</div>
                      </div>

                      {/* Progress ring */}
                      <div className="relative w-44 h-44 mx-auto flex items-center justify-center mb-8">
                        <svg className="absolute inset-0 w-full h-full" style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle cx="88" cy="88" r="64" fill="none" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" style={{ strokeDasharray: 402, strokeDashoffset: ringOffset, transition: "stroke-dashoffset 2s ease" }} />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="text-4xl font-extrabold tracking-tighter text-white">{counter}</span>
                          <span className="text-[8px] text-green-200/50 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      {/* Widget items */}
                      <div className="space-y-3">
                        <div className="rounded-2xl p-3 flex items-center" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", boxShadow: "0 10px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.03)" }}>
                          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mr-3 border border-green-400/20">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-20 bg-neutral-300 rounded-full mb-2" />
                            <div className="h-1.5 w-12 bg-neutral-600 rounded-full" />
                          </div>
                        </div>
                        <div className="rounded-2xl p-3 flex items-center" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))", boxShadow: "0 10px 20px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.05), inset 0 -1px 1px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.03)" }}>
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mr-3 border border-emerald-400/20">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-16 bg-neutral-300 rounded-full mb-2" />
                            <div className="h-1.5 w-24 bg-neutral-600 rounded-full" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className={cn("absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30 transition-all duration-700 delay-300", scrollPhase >= 1 ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-[100px] rotate-[-10deg]")}
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))", backdropFilter: "blur(24px)", boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.5)" }}>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-green-500/10 flex items-center justify-center border border-green-400/30">
                    <span className="text-base lg:text-xl" aria-hidden="true">🎯</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">91% Match</p>
                    <p className="text-green-200/50 text-[10px] lg:text-xs font-medium">Data Analyst role</p>
                  </div>
                </div>

                <div className={cn("absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30 transition-all duration-700 delay-500", scrollPhase >= 1 ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-[100px] rotate-[-10deg]")}
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))", backdropFilter: "blur(24px)", boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px -12px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.5)" }}>
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-400/30">
                    <span className="text-base lg:text-lg" aria-hidden="true">📈</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Skill Verified</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Evidence-backed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Left: Card text */}
            <div className={cn("order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full px-4 lg:px-0 transition-all duration-700", scrollPhase >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12")}>
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PHASE 2: CTA */}
      <div
        className="fixed inset-0 z-30 flex flex-col items-center justify-center text-center px-4 transition-all duration-700"
        style={{
          opacity: scrollPhase === 2 ? 1 : 0,
          transform: scrollPhase === 2 ? "scale(1)" : "scale(0.8)",
          filter: scrollPhase === 2 ? "blur(0px)" : "blur(30px)",
          pointerEvents: scrollPhase === 2 ? "auto" : "none",
        }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          style={{ background: "linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: "drop-shadow(0px 10px 20px rgba(255,255,255,0.1))" }}>
          {ctaHeading}
        </h2>
        <p className="text-white/40 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a href="/onboarding" className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
            style={{ background: "linear-gradient(180deg, #FFFFFF, #F1F5F9)", color: "#0F172A", boxShadow: "0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06)" }}>
            <svg className="w-6 h-6 transition-transform group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mb-[-2px]">Get started on</div>
              <div className="text-xl font-bold leading-none tracking-tight">SkillBridge</div>
            </div>
          </a>
          <a href="/explore" className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl group transition-all duration-300 hover:-translate-y-1"
            style={{ background: "linear-gradient(180deg, #27272A, #18181B)", color: "#FFFFFF", boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8)" }}>
            <svg className="w-6 h-6 transition-transform group-hover:scale-105" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-[-2px]">Browse</div>
              <div className="text-xl font-bold leading-none tracking-tight">Opportunities</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
