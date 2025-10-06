import { ArrowUpRight } from "lucide-react";
import { 
  SiPytorch, 
  SiTensorflow, 
  SiScikitlearn,
  SiPython,
  SiNumpy,
  SiReact, 
  SiFlask, 
  SiDjango, 
  SiNodedotjs,
  SiMongodb,
  SiGit,
  SiJavascript,
  SiFigma,
  SiEthereum
} from "react-icons/si";

export const WorkExperience = () => {
  const experiences = [
    {
      title: "Machine Learning Intern",
      company: "Centre for Defence: Advanced Materials (CDAM)",
      companyFull: "University of Alberta",
      period: "Jan 2025 - Present",
      description: "Built Graph Neural Networks for predicting material properties in advanced ceramics, achieving 40 meV/atom energy and 60 meV/Å force prediction errors. Engineered data pipeline with custom VASP parser for 2,200+ DFT structures, optimized training algorithms (40% loss reduction), and led hyperparameter tuning cutting validation MAE by 15%—outperforming baseline ML methods by 20%.",
      logo: "/CDAM.jpeg",
      tags: [
        { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
        { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
        { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
        { name: "NumPy", icon: SiNumpy, color: "#013243" },
        { name: "Python", icon: SiPython, color: "#3776AB" },
      ],
      url: "https://sites.ualberta.ca/~jdhogan/index.html"
    },
    {
      title: "Software Engineering Intern",
      company: "Connexix",
      companyFull: "Connexix",
      period: "Jun 2024 - Aug 2024",
      description: "Built scalable e-commerce platform with AI-driven recommendations and predictive inventory tracking, improving user engagement by 25% and reducing overstock by 30%. Implemented collaborative filtering algorithm boosting CTR by 8%.",
      logo: "/Connexix.png",
      tags: [
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
        { name: "Flask", icon: SiFlask, color: "#EF4444" },
        { name: "Python", icon: SiPython, color: "#3776AB" },
      ],
      url: "https://connexix.com/"
    },
    {
      title: "Fundraising Volunteer",
      company: "PSA @ UAlberta",
      companyFull: "University of Alberta",
      period: "Nov 2023 - Apr 2024",
      description: "Spearheaded fundraising campaigns for PSA UAlberta, leveraging strategic planning and creative initiatives to drive community engagement and secure financial support—amplifying the association's impact across campus.",
      logo: "/psa.jpeg",
      tags: [],
      url: "https://www.ualberta.ca/"
    },
    {
      title: "Co-Founder & Designer",
      company: "Pixelbyte",
      companyFull: "Pixelbyte",
      period: "Oct 2022 - Aug 2024",
      description: "Co-founded and scaled an NFT design business from scratch, building JavaScript-based minting systems that generated unique digital assets on-demand. Shipped 1,000+ NFT packs, managed revenue splits, and learned hard lessons in deadlines, stress, and teamwork. Currently on-hold (bearish market).",
      logo: "/pixelb.svg",
      tags: [],
      url: "https://www.pixelb.xyz/"
    }
  ];

  return (
    <section id="experience" className="pt-32 pb-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Work <span className="text-primary">Experience</span>
        </h2>

        <div className="space-y-6">
          {/* First two experiences - full width */}
          {experiences.slice(0, 2).map((exp, index) => (
            <a
              key={index}
              href={exp.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden block ${
                index === 0 
                  ? 'border-[#FF9500] border-2 hover:border-[#FF9500]' 
                  : 'border-primary/20 hover:border-primary/40'
              }`}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary to-transparent" />
              
              <div className="relative">
                {/* Header with logo, company, and period */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-background border border-border/40 flex items-center justify-center flex-shrink-0 overflow-hidden p-2">
                      <img 
                        src={exp.logo} 
                        alt={exp.company} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                        {exp.company}
                        <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                    </div>
                  </div>
                  <p className="text-base font-bold text-muted-foreground">{exp.period}</p>
                </div>

                {/* Job title */}
                <h4 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {exp.title}
                </h4>

                {/* Description */}
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Tech icons */}
                <div className="flex flex-wrap gap-3">
                  {exp.tags.map((tag, idx) => {
                    const Icon = tag.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-center w-10 h-10 bg-background/80 backdrop-blur-sm border border-border/40 rounded-xl"
                        title={tag.name}
                      >
                        <Icon style={{ color: tag.color }} className="w-5 h-5" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </a>
          ))}

          {/* Last two experiences - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.slice(2).map((exp, index) => (
              <a
                key={index + 2}
                href={exp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/40 rounded-3xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden block"
              >
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary to-transparent" />
                
                <div className="relative">
                  {/* Header with logo, company, and period */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-background border border-border/40 flex items-center justify-center flex-shrink-0 overflow-hidden p-2">
                        <img 
                          src={exp.logo} 
                          alt={exp.company} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                          {exp.company}
                          <ArrowUpRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-muted-foreground whitespace-nowrap ml-2">{exp.period}</p>
                  </div>

                  {/* Job title */}
                  <h4 className="text-xl font-bold text-foreground mb-3">
                    {exp.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Tech icons */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, idx) => {
                      const Icon = tag.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-center w-8 h-8 bg-background/80 backdrop-blur-sm border border-border/40 rounded-lg"
                          title={tag.name}
                        >
                          <Icon style={{ color: tag.color }} className="w-4 h-4" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

