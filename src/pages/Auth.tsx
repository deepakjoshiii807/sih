import { Home, Compass, BarChart3, Sparkles, LogIn } from "lucide-react";
import { PrismaHero } from "@/components/ui/prisma-hero";
import AboutBento from "@/components/ui/about-bento";
import { MagicText } from "@/components/ui/magic-text";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import DigiLockerPanel from "@/components/ui/digilocker-panel";
import SkillGapPanel from "@/components/ui/skill-gap-panel";
import FeatureSections from "@/components/ui/feature-sections";
import SiteFooter from "@/components/ui/site-footer";

const navItems = [
  { name: "Home", url: "#hero", icon: Home },
  { name: "About", url: "#about", icon: Compass },
  { name: "Skills", url: "#skills", icon: BarChart3 },
  { name: "Features", url: "#features", icon: Sparkles },
  { name: "Login", url: "/login", icon: LogIn, isAction: true, highlight: true },
];

export default function Auth() {
  return (
    <div className="min-h-screen">
      <AnimeNavBar items={navItems} defaultActive="Home" />

      <div id="hero">
        <PrismaHero />
      </div>
      <div id="about">
        <AboutBento />
      </div>

      {/* Magic scroll text section */}
      <section className="bg-[#f0f0f2] hidden lg:block py-16 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <MagicText
            text="Hi there! We're Lead2Learn, building the future of opportunity discovery for students across India. Thank you for all the support and love. We hope you enjoy using L2L as much as we enjoyed creating it."
          />
        </div>
      </section>

      {/* Skill Gap Visualizer */}
      <div id="skills">
        <SkillGapPanel />
      </div>

      {/* DigiLocker Integration Panel */}
      <DigiLockerPanel />

      {/* Feature Sections */}
      <div id="features">
        <FeatureSections />
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
