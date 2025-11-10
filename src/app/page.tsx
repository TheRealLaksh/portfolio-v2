"use client";


import { ScrollProgress } from "@/components/custom-ui/ScrollProgress";
import HeroSection from "@/components/sections/HeroSection";
import AboutMeSection from "@/components/sections/AboutMeSection";
import WorkExperiencesSection from "@/components/sections/WorkExperiencesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ResumeSection from "@/components/sections/ResumeSection";
import ContactSection from "@/components/sections/ContactSection";



export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <HeroSection />
      <AboutMeSection />
      <WorkExperiencesSection />
      <ProjectsSection />
      <SkillsSection />
      <ResumeSection />
      <ContactSection />
    </main>
  );
}
