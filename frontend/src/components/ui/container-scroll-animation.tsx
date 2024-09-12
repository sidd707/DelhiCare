import  { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// InfiniteLogoSlider Component
export const InfiniteLogoSlider = ({
  logos,
  speed = "normal",
  className,
}: {
  logos: { name: string }[];
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (scrollerRef.current) {
      setScrollWidth(scrollerRef.current.scrollWidth);
    }
  }, []);

  const animationSpeed = speed === "fast" ? 10 : speed === "slow" ? 40 : 20; // adjust timing here

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden ${className}`}>
      <motion.ul
        ref={scrollerRef}
        initial={{ x: 0 }}
        animate={{ x: -scrollWidth / 2 }}
        transition={{
          repeat: Infinity,
          duration: animationSpeed,
          ease: "linear",
        }}
        className="flex gap-8 py-8 items-center"
      >
        {logos.map((logo, idx) => (
          <li
            key={idx}
            className="w-[300px] h-[120px] flex-shrink-0 bg-blue-600 rounded-lg border border-white flex items-center justify-center"
          >
            <span className="text-white text-lg">{logo.name}</span>
          </li>
        ))}
        {/* Duplicate the logos to create an infinite effect */}
        {logos.map((logo, idx) => (
          <li
            key={idx + logos.length}
            className="w-[200px] h-[120px] flex-shrink-0 bg-blue-600 rounded-lg border border-white flex items-center justify-center"
          >
            <span className="text-white text-lg">{logo.name}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

// ExampleComponent for testing the slider
export const SlideComponent = () => {
  const logos = [
    { name: "AIIMS Delhi" },
    { name: "Ambedkar Nagar Hospital" },
    { name: "Ram Manohar Lohia Hospital" },
    { name: "Lok Nayak Hospital" },
    { name: "Acharya Shree Bhikshu Hospital " },
    // Add more logos here
  ];

  return <InfiniteLogoSlider logos={logos} speed="normal" />;
};

// Properly export the components
export default SlideComponent;
