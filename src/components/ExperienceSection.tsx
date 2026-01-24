import { motion, type Variants } from "framer-motion";
import { Briefcase } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";
import { 
  useScrollAnimation, 
  headerVariants, 
  cardVariants,
  listItemVariants,
  containerVariants
} from "@/hooks/useScrollAnimation";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
}

interface ExperienceSectionProps {
  experience: { items: ExperienceItem[] };
}

export const ExperienceSection = ({ experience }: ExperienceSectionProps) => {
  const { ref, isInView } = useScrollAnimation();

  const timelineVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: { 
      scaleY: 1, 
      opacity: 1,
      transition: { duration: 1, delay: 0.3 }
    }
  };

  const dotVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="experience" className="py-24 px-6" ref={ref}>
      <ParallaxSection speed={0.15} className="max-w-5xl mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <h2 className="section-title mb-4">Experience</h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        <div className="relative">
          {/* Timeline line - centered with animation */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2 origin-top"
            variants={timelineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experience.items.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center mb-16"
                variants={cardVariants}
              >
                {/* Timeline dot - centered */}
                <motion.div 
                  className="relative z-10 mb-6"
                  variants={dotVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  <motion.div 
                    className="absolute inset-0 w-4 h-4 rounded-full bg-primary"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Content - centered */}
                <motion.div 
                  className="w-full max-w-2xl"
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_30px_hsla(187,100%,50%,0.15)]">
                    <div className="flex flex-col items-center text-center gap-4 mb-4">
                      <motion.div 
                        className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
                      >
                        <Briefcase className="w-6 h-6" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-secondary font-medium">{item.company}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.period}</p>
                      </div>
                    </div>
                    <motion.ul 
                      className="space-y-2 text-left"
                      variants={containerVariants}
                    >
                      {item.description.map((desc, i) => (
                        <motion.li 
                          key={i} 
                          className="text-muted-foreground text-sm flex gap-2"
                          variants={listItemVariants}
                        >
                          <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                          <span>{desc}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ParallaxSection>
    </section>
  );
};
