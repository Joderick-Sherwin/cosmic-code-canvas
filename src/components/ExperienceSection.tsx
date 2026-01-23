import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-6" ref={ref}>
      <ParallaxSection speed={0.15} className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title mb-4">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline line - centered */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2" />

          {experience.items.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Timeline dot - centered */}
              <motion.div 
                className="relative z-10 mb-6"
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
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_30px_hsla(187,100%,50%,0.15)]">
                  <div className="flex flex-col items-center text-center gap-4 mb-4">
                    <motion.div 
                      className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
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
                  <ul className="space-y-2 text-left">
                    {item.description.map((desc, i) => (
                      <motion.li 
                        key={i} 
                        className="text-muted-foreground text-sm flex gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                      >
                        <span className="text-primary mt-1.5 flex-shrink-0">•</span>
                        <span>{desc}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </ParallaxSection>
    </section>
  );
};
