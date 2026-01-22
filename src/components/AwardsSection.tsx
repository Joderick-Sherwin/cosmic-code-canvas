import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Users } from "lucide-react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="awards" className="py-24 px-6 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-center mb-4">Awards & Leadership</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Awards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Awards & Recognition</h3>
            </div>

            <div className="space-y-4">
              {awards.items.map((award, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {award.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1">{award.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Leadership & Activities</h3>
            </div>

            <div className="space-y-4">
              {leadership.items.map((item, index) => (
                <motion.div
                  key={index}
                  className="glass-card rounded-xl p-5 hover:border-secondary/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
