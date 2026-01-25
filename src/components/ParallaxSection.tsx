import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  fadeIn?: boolean;
  depth?: number;
}

export const ParallaxSection = ({ 
  children, 
  className = "", 
  speed = 0.3,
  fadeIn = true,
  depth = 0
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use springs for smoother animations (prevents glitching)
  const rawY = useTransform(scrollYProgress, [0, 1], [80 * speed, -80 * speed]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30, mass: 0.5 });
  
  const rawOpacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.8, 1], 
    fadeIn ? [0, 1, 1, 0.6] : [1, 1, 1, 1]
  );
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });
  
  const rawScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.96, 1, 1, 0.98]);
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  // 3D perspective transforms based on depth
  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [2 * depth, 0, -2 * depth]);
  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });
  
  const rawZ = useTransform(scrollYProgress, [0, 0.5, 1], [-20 * depth, 0, -20 * depth]);
  const z = useSpring(rawZ, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ 
        y, 
        opacity, 
        scale,
        rotateX,
        z,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative ${className}`}
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
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smoother parallax with spring physics
  const rawY = useTransform(scrollYProgress, [0, 1], [40 * depth, -40 * depth]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30, mass: 0.5 });
  
  // 3D depth effect
  const rawZ = useTransform(scrollYProgress, [0, 0.5, 1], [-30 * depth, 0, -30 * depth]);
  const z = useSpring(rawZ, { stiffness: 100, damping: 30 });
  
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ 
        y, 
        z,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

// New 3D depth container for entire page sections
interface Depth3DContainerProps {
  children: ReactNode;
  className?: string;
}

export const Depth3DContainer = ({ 
  children, 
  className = "" 
}: Depth3DContainerProps) => {
  return (
    <div 
      className={`relative ${className}`}
      style={{
        perspective: "1500px",
        perspectiveOrigin: "center center",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
};
