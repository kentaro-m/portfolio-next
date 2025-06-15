import { HeroSection } from "@/components/sections/hero";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { LatestPostsSection } from "@/components/sections/latest-posts";
import { ContactSection } from "@/components/sections/contact";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Separator />
      <ExperienceSection />
      <Separator />
      <SkillsSection />
      <Separator />
      <ProjectsSection />
      <Separator />
      <LatestPostsSection />
      <Separator />
      <ContactSection />
    </div>
  );
}
