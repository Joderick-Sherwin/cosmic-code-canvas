import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Phone, ChevronDown, Sparkles } from "lucide-react";
import { useRef } from "react";

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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div 
        className="max-w-4xl mx-auto text-center z-10"
        style={{ y, opacity, scale }}
      >
        {/* Animated sparkle icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
            animate={{ 
              boxShadow: [
                "0 0 20px hsla(187, 100%, 50%, 0.3)",
                "0 0 40px hsla(187, 100%, 50%, 0.5)",
                "0 0 20px hsla(187, 100%, 50%, 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>

        {/* Animated title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="inline-block text-sm md:text-base tracking-[0.3em] text-primary uppercase mb-4 font-medium"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ delay: 0.5, duration: 1 }}
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
          <motion.span 
            className="text-glow bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            {hero.name}
          </motion.span>
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

        {/* Contact info - centered */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 mb-12 text-muted-foreground"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-2 hover:text-primary transition-all duration-300 group px-4 py-2 rounded-full hover:bg-primary/10"
            whileHover={{ scale: 1.05 }}
          >
            <Mail className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_hsla(187,100%,50%,0.8)]" />
            <span className="text-sm md:text-base">{contact.email}</span>
          </motion.a>
          <motion.a
            href={`tel:${contact.phone}`}
            className="flex items-center gap-2 hover:text-primary transition-all duration-300 group px-4 py-2 rounded-full hover:bg-primary/10"
            whileHover={{ scale: 1.05 }}
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm md:text-base">{contact.phone}</span>
          </motion.a>
          <motion.div 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10"
            whileHover={{ scale: 1.05 }}
          >
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-sm md:text-base">{hero.location}</span>
          </motion.div>
        </motion.div>

        {/* CTA Buttons - centered */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={() => scrollToSection("projects")}
            className="btn-cosmic"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Explore My Work</span>
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-3 rounded-full font-semibold border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_hsla(187,100%,50%,0.3)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>

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
        whileHover={{ scale: 1.2 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-8 h-8 text-primary/60" />
        </div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-primary"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
          y: [0, -20, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-secondary"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 1, 0.4],
          y: [0, 15, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-[25%] w-1.5 h-1.5 rounded-full bg-accent"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 1, 0.3],
          x: [0, 10, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute top-2/3 right-[15%] w-2 h-2 rounded-full bg-primary/70"
        animate={{
          scale: [1, 1.6, 1],
          opacity: [0.3, 0.8, 0.3],
          y: [0, -15, 0],
        }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 2 }}
      />
    </section>
  );
};
