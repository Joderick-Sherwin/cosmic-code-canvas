import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ParallaxSection } from "./ParallaxSection";

interface SkillCategory {
  name: string;
  items: string[];
}

interface SkillsSectionProps {
  skills: { categories: SkillCategory[] };
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="skills" className="py-24 px-6 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <ParallaxSection speed={0.2} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title mb-4">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skills.categories.map((category, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_30px_hsla(187,100%,50%,0.15)]"
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className="text-xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors text-center">
                {category.name}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {category.items.map((skill, i) => (
                  <motion.span
                    key={i}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    whileHover={{ 
                      scale: 1.1, 
                      boxShadow: "0 0 15px hsla(187, 100%, 50%, 0.4)",
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ParallaxSection>
    </section>
  );
};
