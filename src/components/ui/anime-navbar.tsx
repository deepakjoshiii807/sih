import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  /** When true, clicking navigates to `url` instead of just switching the active tab */
  isAction?: boolean;
  /** Renders the item as a highlighted pill (used for Sign Up) */
  highlight?: boolean;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  defaultActive?: string;
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(defaultActive);
  const [clickedByUser, setClickedByUser] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll-based active tab detection
  useEffect(() => {
    if (!mounted) return;

    const sectionMap: Record<string, string> = {
      "#hero": "Home",
      "#about": "About",
      "#skills": "Skills",
      "#features": "Features",
    };

    const sectionIds = Object.keys(sectionMap);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible entry
        let bestEntry: Element | null = null;
        let bestRatio = -1;
        for (let i = 0; i < entries.length; i++) {
          const entry = entries[i] as IntersectionObserverEntry;
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestEntry = entry.target;
          }
        }

        if (bestEntry && bestEntry.id && !clickedByUser) {
          const sectionId = `#${bestEntry.id}`;
          const tabName = sectionMap[sectionId];
          if (tabName) {
            setActiveTab(tabName);
          }
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [mounted, clickedByUser]);

  // Reset clickedByUser after scroll settles
  useEffect(() => {
    if (!clickedByUser) return;
    const timer = setTimeout(() => setClickedByUser(false), 1500);
    return () => clearTimeout(timer);
  }, [clickedByUser]);

  if (!mounted) return null;

  return (
    <div className={cn("fixed top-5 left-0 right-0 z-[9999]", className)}>
      <div className="flex justify-center pt-6">
        <motion.div
          className="flex items-center gap-3 bg-black/50 border border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = !item.isAction && activeTab === item.name;
            const isHovered = hoveredTab === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  if (item.isAction && item.highlight) {
                    setLoginClicked(true);
                    setShowTransition(true);
                    setTimeout(() => {
                      navigate(item.url);
                    }, 600);
                  } else if (item.url.startsWith("#")) {
                    setClickedByUser(true);
                    const el = document.querySelector(item.url);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                    setActiveTab(item.name);
                  } else {
                    setClickedByUser(true);
                    setActiveTab(item.name);
                  }
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                  item.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : item.isAction
                      ? "text-white/70 hover:text-white"
                      : cn("text-white/70 hover:text-white", isActive && "text-white")
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                    <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                      style={{ animation: "shine 3s ease-in-out infinite" }}
                    />
                  </motion.div>
                )}

                <motion.span
                  className="hidden md:inline relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span
                  className="md:hidden relative z-10"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </motion.span>

                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>

                {/* Login click ripple effect */}
                {item.highlight && loginClicked && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                )}

                {isActive && (
                  <motion.div
                    layoutId="anime-mascot"
                    className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="relative w-12 h-12">
                      <motion.div
                        className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2"
                        animate={
                          loginClicked
                            ? { scale: [1, 1.4, 0.8, 1.2, 0], rotate: [0, -10, 10, -5, 0], y: [0, -20, 5, -15, -40], transition: { duration: 0.7, ease: "easeInOut" } }
                            : hoveredTab
                              ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0], transition: { duration: 0.5, ease: "easeInOut" } }
                              : { y: [0, -3, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
                        }
                      >
                        <motion.div
                          className="absolute w-2 h-2 bg-black rounded-full"
                          animate={hoveredTab ? { scaleY: [1, 0.2, 1], transition: { duration: 0.2, times: [0, 0.5, 1] } } : {}}
                          style={{ left: "25%", top: "40%" }}
                        />
                        <motion.div
                          className="absolute w-2 h-2 bg-black rounded-full"
                          animate={hoveredTab ? { scaleY: [1, 0.2, 1], transition: { duration: 0.2, times: [0, 0.5, 1] } } : {}}
                          style={{ right: "25%", top: "40%" }}
                        />
                        <motion.div className="absolute w-2 h-1.5 bg-pink-300 rounded-full" animate={{ opacity: hoveredTab ? 0.8 : 0.6 }} style={{ left: "15%", top: "55%" }} />
                        <motion.div className="absolute w-2 h-1.5 bg-pink-300 rounded-full" animate={{ opacity: hoveredTab ? 0.8 : 0.6 }} style={{ right: "15%", top: "55%" }} />
                        <motion.div
                          className="absolute w-4 h-2 border-b-2 border-black rounded-full"
                          animate={hoveredTab ? { scaleY: 1.5, y: -1 } : { scaleY: 1, y: 0 }}
                          style={{ left: "30%", top: "60%" }}
                        />
                        <AnimatePresence>
                          {(hoveredTab || loginClicked) && (
                            <>
                              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: loginClicked ? 1.5 : 1, y: loginClicked ? -10 : 0 }} exit={{ opacity: 0, scale: 0 }} className="absolute -top-1 -right-1 w-2 h-2 text-yellow-300">✨</motion.div>
                              <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: loginClicked ? 1.5 : 1, y: loginClicked ? -10 : 0 }} exit={{ opacity: 0, scale: 0 }} transition={{ delay: 0.1 }} className="absolute -top-2 left-0 w-2 h-2 text-yellow-300">✨</motion.div>
                              {loginClicked && (
                                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1.5, y: -15 }} exit={{ opacity: 0 }} transition={{ delay: 0.15 }} className="absolute -top-3 right-1 w-2 h-2 text-yellow-300">✨</motion.div>
                              )}
                            </>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                        animate={
                          loginClicked
                            ? { y: [0, -30, -50], scale: [1, 1.2, 0], rotate: [0, 180, 360], opacity: [1, 1, 0], transition: { duration: 0.7, ease: "easeInOut" } }
                            : hoveredTab
                              ? { y: [0, -4, 0], transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" as const } }
                              : { y: [0, 2, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }
                        }
                      >
                        <div className="w-full h-full bg-white rotate-45 transform origin-center" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </button>
            );
          })}
        </motion.div>
      </div>
      {/* Page transition overlay */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            className="fixed inset-0 z-[10000] pointer-events-none"
            initial={{ clipPath: "circle(0% at 95% 3%)" }}
            animate={{ clipPath: "circle(150% at 95% 3%)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 bg-[#0A0A0F]" />
            {/* Centered L2L text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span
                className="text-6xl font-extrabold tracking-tight"
                style={{ color: "#E1E0CC", fontFamily: "'Syne', sans-serif" }}
              >
                L2L
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
