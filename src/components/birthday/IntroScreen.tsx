import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface IntroScreenProps {
  name: string;
  onEnter: () => void;
}

const IntroScreen = ({ name, onEnter }: IntroScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Background with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        
        {/* Floating glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(var(--glow-gold)) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, hsl(var(--glow-pink)) 0%, transparent 60%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/20 text-4xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-8 max-w-4xl"
        style={{ opacity }}
      >
        {/* Decorative top line */}
        <motion.div
          className="w-16 h-px mx-auto mb-8"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Greeting */}
        <motion.p
          className="text-muted-foreground text-sm md:text-base tracking-[0.4em] uppercase mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          A celebration of
        </motion.p>

        {/* Name */}
        <motion.h1
          className="text-gradient-gold text-5xl md:text-7xl lg:text-8xl font-serif mb-6"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          {name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-secondary text-xl md:text-2xl font-serif italic mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Happiest Birthday, Beautiful Soul
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Today is not just another day. It's a celebration of the most 
          wonderful person who makes the world brighter just by being in it.
        </motion.p>

        {/* Enter Button */}
        <motion.button
          onClick={onEnter}
          className="btn-luxury group"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Begin Your Journey
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border border-primary/30 flex justify-center pt-2"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-primary/50 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
    </motion.section>
  );
};

export default IntroScreen;
