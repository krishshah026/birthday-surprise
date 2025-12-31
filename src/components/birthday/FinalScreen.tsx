import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface FinalScreenProps {
  name?: string;
}

const FinalScreen = ({ name = "you" }: FinalScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    if (isInView) {
      // Create floating hearts periodically
      const interval = setInterval(() => {
        setHearts((prev) => [...prev, Date.now()]);
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Clean up old hearts
  useEffect(() => {
    if (hearts.length > 20) {
      setHearts((prev) => prev.slice(-15));
    }
  }, [hearts]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Rich gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
        
        {/* Multiple glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/3 w-[40rem] h-[40rem] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--glow-gold)) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-[35rem] h-[35rem] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, hsl(var(--glow-pink)) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, hsl(var(--glow-warm)) 0%, transparent 40%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((id, i) => (
          <motion.span
            key={id}
            className="absolute text-secondary/60"
            style={{
              left: `${10 + Math.random() * 80}%`,
              bottom: "0%",
              fontSize: `${16 + Math.random() * 16}px`,
            }}
            initial={{ opacity: 0, y: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: -window.innerHeight,
              scale: [0, 1, 1, 0.5],
              rotate: [0, Math.random() * 30 - 15],
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              ease: "easeOut",
            }}
          >
            {i % 3 === 0 ? "♥" : i % 3 === 1 ? "🤍" : "💫"}
          </motion.span>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-8 max-w-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Decorative element */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
        >
          <span className="text-5xl">✨</span>
        </motion.div>

        {/* Main message */}
        <motion.h2
          className="text-gradient-gold text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          This Was Made
          <br />
          Just For {name}
        </motion.h2>

        {/* Heart */}
        <motion.div
          className="text-4xl mb-8"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: [0, 1.2, 1] } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🤍
          </motion.span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-muted-foreground text-lg md:text-xl font-light mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
        >
          May this year bring you endless joy,
          <br />
          beautiful moments, and all your heart desires.
        </motion.p>

        {/* Final signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 2 }}
        >
          <div className="section-divider mb-8" />
          <p className="text-primary/70 text-sm tracking-[0.4em] uppercase">
            With all my love <br></br>
            Krish Shah
          </p>
        </motion.div>

        {/* Sparkles */}
        <div className="absolute -inset-20 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              ✦
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />

      {/* Fade out gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </motion.section>
  );
};

export default FinalScreen;
