import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  fadeIn?: boolean;
}

export const ParallaxSection = ({ 
  children, 
  className = "", 
  speed = 0.3,
  fadeIn = true 
}: ParallaxSectionProps) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.85, 1], 
    fadeIn ? [0, 1, 1, 0.5] : [1, 1, 1, 1]
  );
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export const ParallaxLayer = ({ 
  children, 
  className = "", 
  depth = 1 
}: ParallaxLayerProps) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 * depth, -50 * depth]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
