import { motion } from "framer-motion";
import { ParallaxSection } from "./ParallaxSection";
import { 
  useScrollAnimation, 
  headerVariants, 
  cardVariants
} from "@/hooks/useScrollAnimation";

interface AboutSectionProps {
  summary: { text: string };
}

export const AboutSection = ({ summary }: AboutSectionProps) => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <ParallaxSection speed={0.2} className="max-w-4xl mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <h2 className="section-title mb-4">About Me</h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.2 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 0 40px hsla(187, 100%, 50%, 0.2)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Background decoration */}
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            } : {}}
            transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            } : {}}
            transition={{ duration: 10, repeat: Infinity, delay: 0.7 }}
          />
          
          <motion.div 
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
              {summary.text}
            </p>
          </motion.div>

          {/* Corner decorations with animation */}
          <motion.div 
            className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: [0.3, 0.6, 0.3], scale: 1 } : {}}
            transition={{ opacity: { duration: 3, repeat: Infinity }, scale: { duration: 0.5, delay: 0.6 } }}
          />
          <motion.div 
            className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-secondary/30 rounded-br-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: [0.3, 0.6, 0.3], scale: 1 } : {}}
            transition={{ opacity: { duration: 3, repeat: Infinity, delay: 1.5 }, scale: { duration: 0.5, delay: 0.7 } }}
          />
        </motion.div>
      </ParallaxSection>
    </section>
  );
};
