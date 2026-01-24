import { motion } from "framer-motion";
import { Trophy, Users } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";
import { 
  useScrollAnimation, 
  headerVariants, 
  containerVariants, 
  cardVariants
} from "@/hooks/useScrollAnimation";

interface AwardItem {
  title: string;
  description: string;
}

interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
}

interface AwardsSectionProps {
  awards: { items: AwardItem[] };
  leadership: { items: LeadershipItem[] };
}

export const AwardsSection = ({ awards, leadership }: AwardsSectionProps) => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="awards" className="py-24 px-6 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <ParallaxSection speed={0.15} className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <h2 className="section-title mb-4">Awards & Leadership</h2>
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
          {/* Awards */}
          <motion.div variants={cardVariants} className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-xl bg-primary/10 text-primary"
                whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.5 } }}
              >
                <Trophy className="w-6 h-6" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-foreground">Awards & Recognition</h3>
            </div>

            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {awards.items.map((award, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 group hover:shadow-[0_0_25px_hsla(187,100%,50%,0.15)]"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
                >
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {award.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">{award.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Leadership */}
          <motion.div variants={cardVariants} className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-xl bg-secondary/10 text-secondary"
                whileHover={{ rotate: 360, scale: 1.1, transition: { duration: 0.5 } }}
              >
                <Users className="w-6 h-6" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-foreground">Leadership & Activities</h3>
            </div>

            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              {leadership.items.map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl p-5 hover:border-secondary/50 transition-all duration-300 group hover:shadow-[0_0_25px_hsla(270,70%,60%,0.15)]"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
                >
                  <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                    {item.role}
                  </h4>
                  {item.organization && (
                    <p className="text-secondary text-sm">{item.organization}</p>
                  )}
                  {item.period && (
                    <p className="text-muted-foreground text-xs mt-1">{item.period}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </ParallaxSection>
    </section>
  );
};
