import { cn } from "@/lib/utils";
import { Home, FolderKanban, Github, Menu, X, User, Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", hash: "hero", icon: Home },
  { name: "About", hash: "about", icon: User },
  { name: "Experience", hash: "experience", icon: Briefcase },
  { name: "Projects", hash: "projects", icon: FolderKanban },
  { name: "Contact", hash: "contact", icon: Github },
];

const routeItems = [{ name: "Blog", to: "/blog", icon: FolderKanban }];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Scroll spy logic
      const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between bg-background/50 backdrop-blur-xl border-2 border-primary/40 rounded-full px-8 py-2.5 navbar-glow">
        {/* Avatar/Logo */}
        <Link
          to={{ pathname: "/", hash: "#hero" }}
          className="flex-shrink-0 group"
          aria-label="Home"
          preventScrollReset
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:border-primary/60">
            <img 
              src="/vite2.svg" 
              alt="Logo" 
              className="w-7 h-7 object-cover"
            />
          </div>
        </Link>

        {/* Navigation Icons */}
        <div className="flex items-center gap-1 ml-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.hash;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={{ pathname: "/", hash: `#${item.hash}` }}
                className="relative group px-3 py-3"
                aria-label={item.name}
                preventScrollReset
              >
                <div className="relative">
                  <Icon 
                    className={cn(
                      "w-[22px] h-[22px] transition-all duration-300 ease-out",
                      isActive 
                        ? "text-foreground scale-110 -translate-y-1" 
                        : "text-foreground/60 group-hover:text-foreground group-hover:scale-125 group-hover:-translate-y-2"
                    )}
                  />
                  {/* Glow effect on hover */}
                  <div className={cn(
                    "absolute inset-0 rounded-full blur-md transition-opacity duration-300 -z-10",
                    isActive 
                      ? "bg-primary/20 opacity-100" 
                      : "bg-primary/30 opacity-0 group-hover:opacity-100"
                  )} />
                </div>
                {/* Active indicator */}
                <div 
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300",
                    isActive ? "w-6" : "w-0 group-hover:w-4"
                  )}
                />
              </Link>
            );
          })}

          {/* Route Links */}
          {routeItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.to}
                className="relative group px-3 py-3"
                aria-label={item.name}
              >
                <div className="relative">
                  <Icon className="w-[22px] h-[22px] text-foreground/60 group-hover:text-foreground transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2" />
                  <div className="absolute inset-0 rounded-full blur-md bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 w-0 group-hover:w-4" />
              </Link>
            );
          })}
          
          {/* Theme Toggle */}
          <div className="ml-2 pl-2 border-l border-border/40">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between bg-background/50 backdrop-blur-xl border-2 border-primary/40 rounded-full px-6 py-2.5 navbar-glow">
        <Link
          to={{ pathname: "/", hash: "#hero" }}
          className="flex-shrink-0"
          aria-label="Home"
          preventScrollReset
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center overflow-hidden">
            <img 
              src="/vite2.svg" 
              alt="Logo" 
              className="w-6 h-6 object-cover"
            />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground z-50 hover:bg-foreground/5 rounded-full transition-colors"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
          "transition-all duration-300 md:hidden -mx-4 -my-8",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col space-y-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.hash;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={{ pathname: "/", hash: `#${item.hash}` }}
                className={cn(
                  "flex items-center gap-4 text-xl transition-all duration-300 group",
                  isActive 
                    ? "text-primary font-semibold" 
                    : "text-foreground/80 hover:text-primary"
                )}
                onClick={() => setIsMenuOpen(false)}
                preventScrollReset
              >
                <div className="relative">
                  <Icon className="w-6 h-6 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-300" />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-full blur-md bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                {item.name}
              </Link>
            );
          })}
          {routeItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center gap-4 text-xl transition-all duration-300 group text-foreground/80 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="relative">
                  <Icon className="w-6 h-6 group-hover:scale-125 group-hover:-translate-y-1 transition-all duration-300" />
                  <div className="absolute inset-0 rounded-full blur-md bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                </div>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
