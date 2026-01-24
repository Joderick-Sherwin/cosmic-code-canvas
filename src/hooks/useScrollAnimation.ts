import { useInView, type Variants, type Easing } from "framer-motion";
import { useRef } from "react";

// Smooth easing curve for natural feel
const easeOut: Easing = [0.25, 0.46, 0.45, 0.94];

// Animation variants for section headers
export const headerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easeOut,
    }
  }
};

// Container variants with staggered children
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Card animation variants
export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
    filter: "blur(8px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easeOut,
    }
  }
};

// List item variants for staggered lists
export const listItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20,
    filter: "blur(4px)"
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: easeOut,
    }
  }
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (margin: string = "-100px") => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as any });
  
  return { ref, isInView };
};
