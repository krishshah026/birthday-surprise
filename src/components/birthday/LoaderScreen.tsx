import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderScreenProps {
  onComplete: () => void;
}

const LoaderScreen = ({ onComplete }: LoaderScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 gradient-radial-glow" />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--glow-warm)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-20 -translate-x-32 translate-y-20"
        style={{
          background: "radial-gradient(circle, hsl(var(--glow-pink)) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Loading Text */}
        <motion.p
          className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Something special is loading…
        </motion.p>

        {/* Main Title */}
        <motion.h1
          className="text-gradient-gold text-4xl md:text-6xl font-serif mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          A Moment Made For You
        </motion.h1>

        {/* Progress Bar */}
        <div className="w-48 h-px bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Hearts floating up */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          {progress > 50 && [...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-secondary text-lg"
              initial={{ opacity: 0, y: 0, x: (i - 2) * 30 }}
              animate={{ opacity: [0, 1, 0], y: -100 }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            >
              ♥
            </motion.span>
          ))}
        </div>
      </div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
    </motion.div>
  );
};

export default LoaderScreen;
