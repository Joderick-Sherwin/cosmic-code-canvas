import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Code2 } from "lucide-react";

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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title text-center mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-12 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.items.map((project, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
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
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-24 h-24 bg-secondary/30 rounded-full blur-2xl"
                    animate={{
                      x: ["-50%", "-70%", "-50%"],
                      y: ["-50%", "-30%", "-50%"],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  />
                </div>

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-primary/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Code2 className="w-12 h-12 text-primary" />
                  </motion.div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Project content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-secondary">{project.subtitle}</p>
                  </div>
                  <motion.button
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
