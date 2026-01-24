import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { ParallaxSection } from "./ParallaxSection";
import { 
  useScrollAnimation, 
  headerVariants, 
  containerVariants, 
  cardVariants
} from "@/hooks/useScrollAnimation";

interface ContactData {
  email: string;
  phone: string;
  location: string;
}

interface ContactSectionProps {
  contact: ContactData;
}

export const ContactSection = ({ contact }: ContactSectionProps) => {
  const { ref, isInView } = useScrollAnimation();

  const contactItemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <ParallaxSection speed={0.2} className="max-w-4xl mx-auto">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <h2 className="section-title mb-4">Get In Touch</h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          />
          <motion.p 
            className="text-muted-foreground mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </motion.p>
        </motion.div>

        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{ 
            boxShadow: "0 0 50px hsla(187, 100%, 50%, 0.2)",
            transition: { duration: 0.3 }
          }}
        >
          {/* Background decoration */}
          <motion.div 
            className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            } : {}}
            transition={{ duration: 8, repeat: Infinity, delay: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            } : {}}
            transition={{ duration: 10, repeat: Infinity, delay: 0.7 }}
          />

          <motion.div 
            className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Email */}
            <motion.a
              href={`mailto:${contact.email}`}
              className="flex flex-col items-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 group"
              variants={contactItemVariants}
              whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="p-4 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors"
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <Mail className="w-8 h-8" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
              <p className="text-sm text-muted-foreground text-center break-all group-hover:text-primary transition-colors">{contact.email}</p>
            </motion.a>

            {/* Phone */}
            <motion.a
              href={`tel:${contact.phone}`}
              className="flex flex-col items-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 group"
              variants={contactItemVariants}
              whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="p-4 rounded-full bg-secondary/10 text-secondary mb-4 group-hover:bg-secondary/20 transition-colors"
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <Phone className="w-8 h-8" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground group-hover:text-secondary transition-colors">{contact.phone}</p>
            </motion.a>

            {/* Location */}
            <motion.div
              className="flex flex-col items-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 group"
              variants={contactItemVariants}
              whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="p-4 rounded-full bg-accent/10 text-accent mb-4 group-hover:bg-accent/20 transition-colors"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="w-8 h-8" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Location</h3>
              <p className="text-sm text-muted-foreground text-center">{contact.location}</p>
            </motion.div>
          </motion.div>

          {/* CTA - centered */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          >
            <motion.a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 btn-cosmic"
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Send Message</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </ParallaxSection>
    </section>
  );
};
