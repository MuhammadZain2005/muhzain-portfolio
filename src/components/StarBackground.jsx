import { useEffect, useState } from "react";

// id, size, x, y, opacity, animationDuration
// id, size, x, y, delay, animationDuration

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.min(
      Math.floor((window.innerWidth * window.innerHeight) / 15000), // More stars - reduced divisor
      250 // Cap at 250 stars max
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
        glowIntensity: Math.random() * 0.8 + 1, // Random glow intensity (0.2-1.0)
        glowColor: Math.random() > 0.7 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255,255,255,0.4)', // 30% chance for orange glow
        flickerSpeed: Math.random() * 2 + 0.5, // Random flicker speed (0.5-2.5s)
        colorChangeChance: Math.random() * 0.3 + 0.1, // 10-40% chance to change colors
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100, // Changed from 100 to 50 (0-50% from left)
        y: Math.random() * 20,
        delay: Math.random() * 15,
        animationDuration: Math.random() * 3 + 3,
      });
    }

    setMeteors(newMeteors);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden', perspective: '1000px' }}>
      {stars.map((star) => {
        return (
          <div
            key={star.id}
            className="star animate-pulse-subtle"
            style={{
              width: star.size + "px",
              height: star.size + "px",
              left: star.x + "%",
              top: star.y + "%",
              opacity: star.opacity,
              animationDuration: star.flickerSpeed + "s",
              boxShadow: `0 0 ${star.glowIntensity * 10}px ${star.glowIntensity * 3}px ${star.glowColor}`,
            }}
          />
        );
      })}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 50 + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay,
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}
    </div>
  );
};
