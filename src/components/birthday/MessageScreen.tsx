import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MessageScreenProps {
  message: string;
  senderName?: string;
}

const MessageScreen = ({ message, senderName = "With love" }: MessageScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Split message into paragraphs
  const paragraphs = message.split("\n\n").filter(Boolean);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Soft background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
        
        {/* Subtle warm glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[40rem] rounded-full opacity-10"
          style={{
            background: "radial-gradient(ellipse, hsl(var(--glow-warm)) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Decorative header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {/* <motion.span
            className="text-primary/60 text-4xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            This Is My Heart, In Words
          </motion.span> */}
          <h2 className="text-gradient-romantic text-2xl md:text-4xl lg:text-5xl font-serif">
          This Is My Heart, In Words
        </h2>
          <p className="text-muted-foreground text-sm tracking-[0.4em] uppercase mt-4">
            A Letter For You
          </p>
        </motion.div>

        {/* Message container - looks like elegant paper */}
        <motion.div
          className="relative glass-warm rounded-lg p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          {/* Decorative corner flourishes */}
          <div className="absolute top-4 left-4 text-primary/30 text-2xl">✦</div>
          <div className="absolute top-4 right-4 text-primary/30 text-2xl">✦</div>
          <div className="absolute bottom-4 left-4 text-primary/30 text-2xl">✦</div>
          <div className="absolute bottom-4 right-4 text-primary/30 text-2xl">✦</div>

          {/* Opening */}
          <motion.p
            className="text-secondary text-xl md:text-2xl font-serif italic mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            My Dearest...
          </motion.p>

          {/* Message paragraphs with staggered fade-in */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-foreground/90 text-base md:text-lg leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.7 + index * 0.3,
                  ease: "easeOut",
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            className="mt-12 text-right"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <p className="text-primary text-lg font-serif italic mb-2">{senderName}</p>
            <motion.span
              className="text-secondary/80 text-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ♥
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Decorative footer */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
        >
          <div className="section-divider" />
        </motion.div>
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-secondary/20 text-xl"
            style={{
              left: `${15 + i * 15}%`,
              bottom: "10%",
            }}
            animate={{
              y: [0, -window.innerHeight * 0.3],
              opacity: [0, 0.5, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeOut",
            }}
          >
            ♥
          </motion.span>
        ))}
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
    </motion.section>
  );
};

export default MessageScreen;
