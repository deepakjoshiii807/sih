import { Home, Compass, GraduationCap, Briefcase, LogIn } from "lucide-react";
import { PrismaHero } from "@/components/ui/prisma-hero";
import AboutBento from "@/components/ui/about-bento";
import { MagicText } from "@/components/ui/magic-text";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import DigiLockerPanel from "@/components/ui/digilocker-panel";
import SkillGapPanel from "@/components/ui/skill-gap-panel";
import FeatureSections from "@/components/ui/feature-sections";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "/", icon: Compass },
  { name: "Scholarships", url: "/", icon: GraduationCap },
  { name: "Internships", url: "/", icon: Briefcase },
  { name: "Login", url: "/login", icon: LogIn, isAction: true, highlight: true },
];

export default function Auth() {
  return (
    <div className="min-h-screen">
      <AnimeNavBar items={navItems} defaultActive="Home" />

      <PrismaHero />
      <AboutBento />

      {/* Magic scroll text section */}
      <section className="bg-white hidden lg:block py-16 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <MagicText
            text="Hi there! We're Lead2Learn, building the future of opportunity discovery for students across India. Thank you for all the support and love. We hope you enjoy using L2L as much as we enjoyed creating it."
          />
        </div>
      </section>

      {/* Skill Gap Visualizer */}
      <SkillGapPanel />

      {/* DigiLocker Integration Panel */}
      <DigiLockerPanel />

      {/* Feature Sections */}
      <FeatureSections />
    </div>
  );
}
