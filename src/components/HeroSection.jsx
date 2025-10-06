import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { DecoderText } from "./DecoderText";
import { Heading } from "./Heading";
import { Transition } from "./Transition";
import config from "../config.json";

export const HeroSection = () => {
  const [currentDiscipline, setCurrentDiscipline] = useState(0);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("entering");

  useEffect(() => {
    // Trigger visibility and status change after mount
    const timer = setTimeout(() => {
      setVisible(true);
      setStatus("entered");
    }, 100);

    // Rotate disciplines every 5 seconds
    const interval = setInterval(() => {
      setCurrentDiscipline((prev) => (prev + 1) % config.disciplines.length);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="intro-text w-full mx-auto z-10">
        {/* Name with Decoder Effect */}
        <h1
          className={`intro-name uppercase transition-opacity ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          data-visible={visible}
        >
          <DecoderText text={config.name} delay={500} />
        </h1>

        {/* Role + Rotating Disciplines - H0 Title */}
        <Heading level={0} as="h2" className="intro-title" weight="medium">
          {/* Role Line */}
          <div className="intro-row" aria-hidden="true">
            <span
              className="intro-word"
              data-status={status}
              style={{ "--delay": "var(--durationXS)" }}
            >
              {config.role}
            </span>
            <span className="intro-line" data-status={status} />
          </div>

          {/* Rotating Disciplines */}
          <div className="intro-row">
            {config.disciplines.map((item, index) => (
              <Transition
                key={item}
                in={index === currentDiscipline}
                timeout={{ enter: 3000, exit: 2000 }}
              >
                {({ status, nodeRef }) => (
                  <span
                    ref={nodeRef}
                    className="intro-word intro-discipline"
                    data-plus="true"
                    data-status={status}
                    style={{
                      "--delay": "var(--durationL)",
                    }}
                  >
                    {item}
                  </span>
                )}
              </Transition>
            ))}
          </div>
        </Heading>

        {/* Tagline */}
        <p className={`intro-tagline ${visible ? 'intro-visible' : ''}`}>
          {config.tagline}
        </p>

        {/* CTA Button */}
        <div className={`intro-button ${visible ? 'intro-visible' : ''}`}>
          <a href="#projects" className="cosmic-button inline-block">
            Discover My Builds
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm mb-2 text-[var(--textLight)]">
          Scroll
        </span>
        <ArrowDown className="h-5 w-5 text-[var(--accent)]" />
      </div>
    </section>
  );
};
