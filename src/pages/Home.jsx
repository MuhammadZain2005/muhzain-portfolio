import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { WorkExperience } from "../components/WorkExperience";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const sectionId = location.hash.replace("#", "");
    const scrollToSection = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // Attempt immediately then retry shortly in case the DOM isn't ready yet
    scrollToSection();
    const retryTimeout = setTimeout(scrollToSection, 100);

    return () => clearTimeout(retryTimeout);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background Effects */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <WorkExperience />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
