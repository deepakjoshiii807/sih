import { Home, Compass, GraduationCap, Briefcase, LogIn } from "lucide-react";
import { PrismaHero } from "@/components/ui/prisma-hero";
import AboutBento from "@/components/ui/about-bento";
import { MagicText } from "@/components/ui/magic-text";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import DigiLockerPanel from "@/components/ui/digilocker-panel";
import SkillGapPanel from "@/components/ui/skill-gap-panel";
import RolesPanel from "@/components/ui/roles-panel";

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

      {/* Hero → AboutBento: dark to light */}
      <div className="relative h-20 sm:h-32">
        <div className="absolute inset-0 bg-[#0A0A0F]" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #0A0A0F 0%, #0f1015 20%, #3a3d4a 45%, #8a8c96 65%, #c5c7ce 80%, #e8e9ec 92%, #f8fafc 100%)" }}
        />
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: "radial-gradient(circle at 50% 60%, rgba(34,197,94,0.08), transparent 60%)",
        }} />
      </div>

      <AboutBento />

      {/* Magic scroll text section */}
      <section className="bg-white hidden lg:block py-16 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <MagicText
            text="Hi there! We're Lead2Learn, building the future of opportunity discovery for students across India. Thank you for all the support and love. We hope you enjoy using L2L as much as we enjoyed creating it."
          />
        </div>
      </section>

      {/* AboutBento/MagicText → SkillGap: light to dark */}
      <div className="relative h-24 sm:h-40">
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #ffffff 0%, #f0f0f2 15%, #9a9ca6 35%, #4a4c58 55%, #1a1c24 75%, #0d0e13 90%, #0A0A0F 100%)" }}
        />
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage: "radial-gradient(circle at 30% 40%, rgba(34,197,94,0.12), transparent 50%), radial-gradient(circle at 70% 70%, rgba(59,130,246,0.08), transparent 50%)",
        }} />
      </div>

      {/* Skill Gap Visualizer */}
      <SkillGapPanel />

      {/* SkillGap → DigiLocker: dark to light */}
      <div className="relative h-24 sm:h-40">
        <div className="absolute inset-0 bg-[#0A0A0F]" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #0A0A0F 0%, #0d0e13 10%, #1a1c24 25%, #4a4c58 45%, #9a9ca6 65%, #e0e1e5 82%, #f5f5f7 92%, #ffffff 100%)" }}
        />
        <div className="absolute inset-0 opacity-[0.10]" style={{
          backgroundImage: "radial-gradient(circle at 60% 50%, rgba(168,85,247,0.10), transparent 50%)",
        }} />
      </div>

      {/* DigiLocker Integration Panel */}
      <DigiLockerPanel />

      {/* DigiLocker → Roles: light to dark */}
      <div className="relative h-20 sm:h-32">
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #ffffff 0%, #f0f0f2 20%, #8a8c96 45%, #3a3d4a 65%, #15171d 85%, #0A0A0F 100%)" }}
        />
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "radial-gradient(circle at 50% 30%, rgba(34,197,94,0.10), transparent 50%)",
        }} />
      </div>

      {/* Roles Panel */}
      <RolesPanel />
    </div>
  );
}
