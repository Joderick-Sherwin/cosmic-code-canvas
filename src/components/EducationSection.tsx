import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";
import { 
  useScrollAnimation, 
  headerVariants, 
  containerVariants, 
  cardVariants,
  listItemVariants
} from "@/hooks/useScrollAnimation";

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  note?: string;
}

interface CertificationItem {
  title?: string;
  description?: string;
}

interface EducationSectionProps {
  education: { items: EducationItem[] };
  certifications: { items: (string | CertificationItem)[] };
}

export const EducationSection = ({ education, certifications }: EducationSectionProps) => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="education" className="py-24 px-6" ref={ref}>
      <ParallaxSection speed={0.2} className="max-w-6xl mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <h2 className="section-title mb-4">Education & Certifications</h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Education */}
          <motion.div variants={cardVariants} className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-xl bg-primary/10 text-primary"
                whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.5 } }}
              >
                <GraduationCap className="w-6 h-6" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-foreground">Education</h3>
            </div>

            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {education.items.map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_25px_hsla(187,100%,50%,0.15)]"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
                >
                  <h4 className="font-semibold text-foreground">{item.institution}</h4>
                  <p className="text-primary text-sm">{item.degree}</p>
                  <p className="text-muted-foreground text-sm mt-1">{item.period}</p>
                  {item.note && (
                    <p className="text-xs text-muted-foreground mt-2 italic">{item.note}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Certifications */}
          <motion.div variants={cardVariants} className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-xl bg-secondary/10 text-secondary"
                whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.5 } }}
              >
                <Award className="w-6 h-6" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-foreground">Certifications</h3>
            </div>

            <motion.div 
              className="glass-card rounded-xl p-5 h-fit hover:shadow-[0_0_25px_hsla(270,70%,60%,0.15)] transition-all duration-300"
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <motion.ul 
                className="space-y-3"
                variants={containerVariants}
              >
                {certifications.items.map((cert, index) => {
                  const certText = typeof cert === 'string' ? cert : cert.title || '';
                  return (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                      variants={listItemVariants}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <motion.span 
                        className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span>{certText}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </ParallaxSection>
    </section>
  );
};
