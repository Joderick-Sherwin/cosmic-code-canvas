import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  offset?: [string, string];
  speed?: number;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { offset = ["start end", "end start"], speed = 0.5 } = options;
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  return { ref, y, opacity, scale, scrollYProgress };
};

export const useMouseParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    ref.current.style.setProperty("--mouse-x", `${x * 20}px`);
    ref.current.style.setProperty("--mouse-y", `${y * 20}px`);
  };

  return { ref, handleMouseMove };
};
