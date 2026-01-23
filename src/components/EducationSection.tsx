import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-24 px-6" ref={ref}>
      <ParallaxSection speed={0.2} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title mb-4">Education & Certifications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-xl bg-primary/10 text-primary"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-6 h-6" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-foreground">Education</h3>
            </div>

            <div className="space-y-4">
              {education.items.map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_25px_hsla(187,100%,50%,0.15)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <h4 className="font-semibold text-foreground">{item.institution}</h4>
                  <p className="text-primary text-sm">{item.degree}</p>
                  <p className="text-muted-foreground text-sm mt-1">{item.period}</p>
                  {item.note && (
                    <p className="text-xs text-muted-foreground mt-2 italic">{item.note}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-xl bg-secondary/10 text-secondary"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Award className="w-6 h-6" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-foreground">Certifications</h3>
            </div>

            <motion.div 
              className="glass-card rounded-xl p-5 h-fit hover:shadow-[0_0_25px_hsla(270,70%,60%,0.15)] transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <ul className="space-y-3">
                {certifications.items.map((cert, index) => {
                  const certText = typeof cert === 'string' ? cert : cert.title || '';
                  return (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ x: 5 }}
                    >
                      <motion.span 
                        className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span>{certText}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </ParallaxSection>
    </section>
  );
};
