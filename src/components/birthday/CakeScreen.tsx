import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface CakeScreenProps {
  onBlowCandles: () => void;
}

const CakeScreen = ({ onBlowCandles }: CakeScreenProps) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const handleBlowCandles = useCallback(() => {
    if (!candlesLit || isBlowing) return;
    
    setIsBlowing(true);
    setCandlesLit(false);
    
    setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => {
        onBlowCandles();
      }, 3000);
    }, 500);
  }, [candlesLit, isBlowing, onBlowCandles]);

  const confettiColors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--glow-gold))",
    "hsl(var(--glow-pink))",
  ];

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center md:justify-start overflow-hidden py-12 md:py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] rounded-full"
          style={{
            background: candlesLit
              ? "radial-gradient(circle, hsl(var(--glow-candle) / 0.3) 0%, transparent 50%)"
              : "radial-gradient(circle, hsl(var(--glow-gold) / 0.1) 0%, transparent 50%)",
          }}
          animate={{
            scale: candlesLit ? [1, 1.1, 1] : 1,
            opacity: candlesLit ? [0.5, 0.7, 0.5] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Title */}
      <motion.div
        className="text-center mb-6 md:mb-10 relative z-10 pt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-muted-foreground text-xs md:text-sm tracking-[0.3em] uppercase mb-2">
          Make a Wish
        </p>
        <h2 className="text-gradient-romantic text-2xl md:text-4xl lg:text-5xl font-serif">
          {candlesLit ? "Time to Celebrate" : "Your Wish is Made!✨"}
        </h2>
      </motion.div>

      {/* Premium 3D Cake */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
      >
        {/* Cake Container */}
        <div className="relative">
          {/* Cake Plate Glow */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 md:w-80 h-16 rounded-full blur-2xl"
            style={{ background: "hsl(var(--glow-warm) / 0.4)" }}
            animate={candlesLit ? {
              opacity: [0.4, 0.6, 0.4],
            } : { opacity: 0.2 }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Premium SVG Cake */}
          <svg
            width="260"
            height="240"
            viewBox="0 0 260 240"
            className="drop-shadow-2xl w-[220px] h-[200px] md:w-[260px] md:h-[240px]"
          >
            {/* Definitions for gradients */}
            <defs>
              {/* Cake tier gradients */}
              <linearGradient id="tierGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(340, 82%, 76%)" />
                <stop offset="100%" stopColor="hsl(340, 65%, 60%)" />
              </linearGradient>
              <linearGradient id="tierGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(320, 70%, 80%)" />
                <stop offset="100%" stopColor="hsl(320, 60%, 65%)" />
              </linearGradient>
              <linearGradient id="tierGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(350, 85%, 82%)" />
                <stop offset="100%" stopColor="hsl(350, 70%, 68%)" />
              </linearGradient>
              
              {/* Frosting gradient */}
              <linearGradient id="frostingGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(45, 100%, 96%)" />
                <stop offset="100%" stopColor="hsl(45, 80%, 88%)" />
              </linearGradient>
              
              {/* Plate gradient */}
              <linearGradient id="plateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(45, 50%, 90%)" />
                <stop offset="100%" stopColor="hsl(45, 40%, 80%)" />
              </linearGradient>
              
              {/* Gold decoration */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(45, 100%, 75%)" />
                <stop offset="50%" stopColor="hsl(45, 100%, 60%)" />
                <stop offset="100%" stopColor="hsl(45, 100%, 75%)" />
              </linearGradient>
            </defs>

            {/* Cake plate */}
            <ellipse cx="130" cy="225" rx="115" ry="12" fill="url(#plateGradient)" />
            <ellipse cx="130" cy="222" rx="105" ry="10" fill="hsl(45, 60%, 95%)" opacity="0.5" />
            
            {/* Bottom tier */}
            <rect x="25" y="160" width="210" height="60" rx="8" fill="url(#tierGradient1)" />
            {/* Bottom tier frosting top */}
            <ellipse cx="130" cy="160" rx="105" ry="8" fill="url(#frostingGradient)" />
            {/* Bottom tier decorative line */}
            <rect x="25" y="175" width="210" height="4" fill="hsl(45, 100%, 80%)" opacity="0.5" />
            
            {/* Frosting drips on bottom tier */}
            {[55, 85, 115, 145, 175, 205].map((x, i) => (
              <ellipse
                key={`drip1-${i}`}
                cx={x}
                cy={163}
                rx={6 + (i % 2) * 2}
                ry={10 + (i % 3) * 3}
                fill="url(#frostingGradient)"
              />
            ))}
            
            {/* Middle tier */}
            <rect x="50" y="105" width="160" height="55" rx="6" fill="url(#tierGradient2)" />
            {/* Middle tier frosting top */}
            <ellipse cx="130" cy="105" rx="80" ry="6" fill="url(#frostingGradient)" />
            {/* Middle tier decorative band */}
            <rect x="50" y="118" width="160" height="3" fill="url(#goldGradient)" opacity="0.7" />
            
            {/* Frosting drips on middle tier */}
            {[70, 100, 130, 160, 190].map((x, i) => (
              <ellipse
                key={`drip2-${i}`}
                cx={x}
                cy={108}
                rx={5 + (i % 2)}
                ry={8 + (i % 2) * 2}
                fill="url(#frostingGradient)"
              />
            ))}
            
            {/* Top tier */}
            <rect x="75" y="55" width="110" height="50" rx="5" fill="url(#tierGradient3)" />
            {/* Top tier frosting */}
            <ellipse cx="130" cy="55" rx="55" ry="5" fill="url(#frostingGradient)" />
            {/* Top tier decorative roses */}
            {[95, 130, 165].map((x, i) => (
              <g key={`rose-${i}`}>
                <circle cx={x} cy={75} r={6} fill="hsl(350, 80%, 65%)" />
                <circle cx={x - 2} cy={73} r={3} fill="hsl(350, 90%, 75%)" />
                <circle cx={x + 2} cy={77} r={2} fill="hsl(350, 70%, 55%)" />
              </g>
            ))}
            
            {/* Gold pearl decorations around middle */}
            {[60, 80, 100, 120, 140, 160, 180, 200].map((x, i) => (
              <circle
                key={`pearl-${i}`}
                cx={x}
                cy={190}
                r="3"
                fill="url(#goldGradient)"
              />
            ))}
            
            {/* Sparkle decorations */}
            <text x="40" y="140" fill="url(#goldGradient)" fontSize="10" opacity="0.8">✦</text>
            <text x="210" y="130" fill="url(#goldGradient)" fontSize="10" opacity="0.8">✦</text>
            <text x="60" y="185" fill="url(#goldGradient)" fontSize="8" opacity="0.6">✧</text>
            <text x="185" y="180" fill="url(#goldGradient)" fontSize="8" opacity="0.6">✧</text>
          </svg>

          {/* Candles */}
          <div className="absolute top-4 md:top-2 left-1/2 -translate-x-1/2 flex gap-4 md:gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative">
                {/* Candle body with stripe */}
                <div className="relative">
                  <motion.div
                    className="w-2.5 md:w-3 h-10 md:h-12 rounded-t-full rounded-b-sm overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, 
                        hsl(340, 80%, 70%) 0%, 
                        hsl(340, 90%, 80%) 50%, 
                        hsl(340, 80%, 70%) 100%)`,
                    }}
                    animate={candlesLit ? {
                      boxShadow: [
                        "0 0 10px hsl(var(--glow-candle) / 0.5)",
                        "0 0 20px hsl(var(--glow-candle) / 0.7)",
                        "0 0 10px hsl(var(--glow-candle) / 0.5)",
                      ],
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  >
                    {/* White stripe */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/40" />
                  </motion.div>
                </div>
                
                {/* Flame */}
                <AnimatePresence>
                  {candlesLit && (
                    <motion.div
                      className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2"
                      initial={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      {/* Outer glow */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 md:w-6 h-5 md:h-6 rounded-full blur-md"
                        style={{ background: "hsl(45, 100%, 60% / 0.6)" }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.8, 0.6] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                      {/* Flame shape */}
                      <motion.div
                        className="w-3 md:w-4 h-5 md:h-6 rounded-full"
                        style={{
                          background: "linear-gradient(180deg, #fff 0%, #ffee58 20%, #ffb74d 50%, #ff7043 80%, #ff5722 100%)",
                        }}
                        animate={{
                          scaleY: [1, 1.2, 0.9, 1.1, 1],
                          scaleX: [1, 0.9, 1.1, 0.95, 1],
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          delay: i * 0.08,
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Blow instruction - Now immediately below cake */}
      <motion.div
        className="mt-6 md:mt-10 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {candlesLit ? (
          <motion.button
            onClick={handleBlowCandles}
            className="btn-luxury group animate-glow-pulse px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="block text-center leading-none">
                Blow the Candles
            </span>

          </motion.button>
        ) : (
          <motion.p
            className="text-primary text-lg md:text-xl font-serif"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            May all your wishes come true ✨
          </motion.p>
        )}
      </motion.div>

      {/* Luxury Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  background: confettiColors[i % confettiColors.length],
                  boxShadow: `0 0 10px ${confettiColors[i % confettiColors.length]}`,
                }}
                initial={{
                  top: "-5%",
                  rotate: 0,
                  opacity: 1,
                }}
                animate={{
                  top: "110%",
                  rotate: Math.random() * 720,
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 3,
                  delay: Math.random() * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
            {/* Sparkle stars */}
            {[...Array(25)].map((_, i) => (
              <motion.span
                key={`star-${i}`}
                className="absolute text-xl md:text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  color: confettiColors[i % confettiColors.length],
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: 180,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 2,
                  repeat: 2,
                }}
              >
                ✦
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
    </motion.section>
  );
};

export default CakeScreen;
