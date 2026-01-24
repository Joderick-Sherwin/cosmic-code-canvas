import { motion, type Variants } from "framer-motion";
import { Code2 } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";
import { 
  useScrollAnimation, 
  headerVariants, 
  containerVariants, 
  cardVariants
} from "@/hooks/useScrollAnimation";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
}

interface ProjectsSectionProps {
  projects: { items: Project[] };
}

export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  const { ref, isInView } = useScrollAnimation();

  const techTagVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <ParallaxSection speed={0.15} className="max-w-6xl mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <h2 className="section-title mb-4">Featured Projects</h2>
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
          {projects.items.map((project, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsla(187,100%,50%,0.2)]"
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Project header */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-32 h-32 bg-primary/30 rounded-full blur-3xl"
                    animate={{
                      x: ["-50%", "-30%", "-50%"],
                      y: ["-50%", "-70%", "-50%"],
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-24 h-24 bg-secondary/30 rounded-full blur-2xl"
                    animate={{
                      x: ["-50%", "-70%", "-50%"],
                      y: ["-50%", "-30%", "-50%"],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                </div>

                {/* Icon - centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/30"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    whileHover={{ scale: 1.2, rotate: 10, transition: { duration: 0.3 } }}
                  >
                    <Code2 className="w-12 h-12 text-primary" />
                  </motion.div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Project content - centered */}
              <div className="p-6 text-center">
                <div className="flex flex-col items-center justify-center mb-4">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-secondary">{project.subtitle}</p>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <motion.div 
                  className="flex flex-wrap justify-center gap-2"
                  variants={containerVariants}
                >
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                      variants={techTagVariants}
                      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </ParallaxSection>
    </section>
  );
};
