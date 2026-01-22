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
import { AIChatbot } from "@/components/AIChatbot";
import { Footer } from "@/components/Footer";
import { useProfileContent } from "@/hooks/useProfileContent";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { content, isLoading, error } = useProfileContent();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading neural network...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  // Default values in case content isn't loaded
  const hero = content.hero || { name: "Joderick Sherwin J", title: "Machine Learning Engineer", subtitle: "Transforming Ideas into Intelligent Solutions", location: "Chennai, India" };
  const contact = content.contact || { email: "jodericksherwinjohn@gmail.com", phone: "+91 70949 44667", location: "Chennai, Tamil Nadu, India" };
  const summary = content.summary || { text: "" };
  const experience = content.experience || { items: [] };
  const skills = content.skills || { categories: [] };
  const projects = content.projects || { items: [] };
  const education = content.education || { items: [] };
  const certifications = content.certifications || { items: [] };
  const awards = content.awards || { items: [] };
  const leadership = content.leadership || { items: [] };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <NeuralBackground />
      <Navigation />
      
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

      <Footer />
      <AIChatbot profileData={content} />
    </div>
  );
};

export default Index;
