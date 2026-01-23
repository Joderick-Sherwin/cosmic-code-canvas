import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code2 } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-6" ref={ref}>
      <ParallaxSection speed={0.15} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="section-title mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.items.map((project, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_hsla(187,100%,50%,0.2)]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.02 }}
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
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
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

                <div className="flex flex-wrap justify-center gap-2">
                  {project.technologies.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ParallaxSection>
    </section>
  );
};
