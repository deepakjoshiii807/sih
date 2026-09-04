import { Home, Compass, GraduationCap, Briefcase } from "lucide-react";
import { PrismaHero } from "@/components/ui/prisma-hero";
import AboutBento from "@/components/ui/about-bento";
import { MagicText } from "@/components/ui/magic-text";
import { AnimeNavBar } from "@/components/ui/anime-navbar";

const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "/", icon: Compass },
  { name: "Scholarships", url: "/", icon: GraduationCap },
  { name: "Internships", url: "/", icon: Briefcase },
];

export default function Auth() {
  return (
    <div className="min-h-screen">
      <AnimeNavBar items={navItems} defaultActive="Home" />

      <PrismaHero />
      <AboutBento />

      {/* Magic scroll text section */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <MagicText
            text="Hi there! We're Lead2Learn, building the future of opportunity discovery for students across India. Thank you for all the support and love. We hope you enjoy using L2L as much as we enjoyed creating it."
          />
        </div>
      </section>
    </div>
  );
}
