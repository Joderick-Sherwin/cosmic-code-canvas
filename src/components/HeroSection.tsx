import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ChevronDown } from "lucide-react";

interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  location: string;
}

interface ContactData {
  email: string;
  phone: string;
}

interface HeroSectionProps {
  hero: HeroData;
  contact: ContactData;
}

export const HeroSection = ({ hero, contact }: HeroSectionProps) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center z-10">
        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-block text-sm md:text-base tracking-[0.3em] text-primary uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome to my Universe
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-glow bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {hero.name}
          </span>
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground/90 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {hero.title}
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* Contact info */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mb-12 text-muted-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 hover:text-primary transition-colors group"
          >
            <Mail className="w-4 h-4 group-hover:glow-cyan" />
            <span className="text-sm md:text-base">{contact.email}</span>
          </a>
          <a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-2 hover:text-primary transition-colors group"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm md:text-base">{contact.phone}</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-sm md:text-base">{hero.location}</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="btn-cosmic"
          >
            <span className="relative z-10">Explore My Work</span>
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3 rounded-full font-semibold border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 2 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        onClick={() => scrollToSection("about")}
      >
        <ChevronDown className="w-8 h-8 text-primary/60" />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/3 left-10 w-2 h-2 rounded-full bg-primary"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-16 w-3 h-3 rounded-full bg-secondary"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-20 w-1.5 h-1.5 rounded-full bg-accent"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      />
    </section>
  );
};
