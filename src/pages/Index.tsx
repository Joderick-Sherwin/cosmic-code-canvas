import { NeuralBackground } from "@/components/NeuralBackground";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { EducationSection } from "@/components/EducationSection";
import { AwardsSection } from "@/components/AwardsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Depth3DContainer } from "@/components/ParallaxSection";
import { useProfileContent } from "@/hooks/useProfileContent";

const Index = () => {
  const { content } = useProfileContent();

  const hero = content.hero;
  const contact = content.contact;
  const summary = content.summary;
  const experience = content.experience;
  const skills = content.skills;
  const projects = content.projects;
  const education = content.education;
  const certifications = content.certifications;
  const awards = content.awards;
  const leadership = content.leadership;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <NeuralBackground />
      <Navigation />
      
      <Depth3DContainer>
        <main className="relative z-10">
          <HeroSection hero={hero} contact={contact} />
          <AboutSection summary={summary} />
          <ExperienceSection experience={experience} />
          <SkillsSection skills={skills} />
          <ProjectsSection projects={projects} />
          <EducationSection education={education} certifications={certifications} />
          <AwardsSection awards={awards} leadership={leadership} />
          <ContactSection contact={contact} />
        </main>
      </Depth3DContainer>

      <Footer />
    </div>
  );
};

export default Index;
