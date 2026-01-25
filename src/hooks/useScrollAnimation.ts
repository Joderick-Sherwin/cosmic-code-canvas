import { useInView, type Variants, type Easing } from "framer-motion";
import { useRef } from "react";

// Smooth easing curve for natural feel
const easeOut: Easing = [0.25, 0.46, 0.45, 0.94];

// Animation variants for section headers with entry/exit
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
  },
  exit: {
    opacity: 0,
    y: -30,
    filter: "blur(8px)",
    transition: {
      duration: 0.5,
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
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Card animation variants with entry/exit
export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.92,
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
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.95,
    filter: "blur(6px)",
    transition: {
      duration: 0.4,
      ease: easeOut,
    }
  }
};

// List item variants for staggered lists with entry/exit
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
  },
  exit: {
    opacity: 0,
    x: 20,
    filter: "blur(4px)",
    transition: {
      duration: 0.3,
      ease: easeOut,
    }
  }
};

// Hook for scroll-triggered animations - now supports entry AND exit
export const useScrollAnimation = (margin: string = "-100px") => {
  const ref = useRef<HTMLElement>(null);
  // Changed once: false to allow exit animations
  const isInView = useInView(ref, { once: false, margin: margin as any, amount: 0.2 });
  
  return { ref, isInView };
};
