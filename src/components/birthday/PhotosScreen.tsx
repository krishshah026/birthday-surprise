import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  caption?: string;
}

interface PhotosScreenProps {
  photos: Photo[];
}

const PhotosScreen = ({ photos }: PhotosScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  // Generate random rotations for polaroid effect
  const rotations = photos.map((_, i) => (i % 2 === 0 ? -3 : 3) + Math.random() * 2);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen py-16 md:py-24 px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[50rem] rounded-full opacity-5"
          style={{
            background: "radial-gradient(ellipse, hsl(var(--glow-pink)) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
      >
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-2">
          Precious Moments
        </p>
        <h2 className="text-gradient-gold text-3xl md:text-5xl font-serif mb-4">
          Some Moments Deserve Forever…
        </h2>
        <motion.span
          className="text-primary/50 text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          ✦
        </motion.span>
      </motion.div>

      {/* Photos Carousel */}
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Main Photo Display */}
        <motion.div
          className="relative flex justify-center items-center min-h-[420px] md:min-h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Previous photos (faded) */}
          {photos.length > 1 && (
            <motion.div
              className="absolute left-0 md:left-10 z-0 opacity-30 scale-75 hidden md:block"
              style={{ rotate: rotations[(currentIndex - 1 + photos.length) % photos.length] }}
            >
              <div className="polaroid">
                <img
                  src={photos[(currentIndex - 1 + photos.length) % photos.length].src}
                  alt="Previous memory"
                  className="w-48 h-48 object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Current Photo */}
          <motion.div
            key={currentIndex}
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: rotations[currentIndex] }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02, rotate: 0 }}
          >
            <div className="polaroid glow-warm">
              <img
                src={photos[currentIndex].src}
                alt={photos[currentIndex].caption || "Memory"}
                className="w-64 md:w-80 h-64 md:h-80 object-cover"
              />
              {/* Caption */}
              {photos[currentIndex].caption && (
              <motion.p
                  className=" absolute bottom-3 left-0 right-0 text-center text-primary-foreground/100 text-base md:text-lg font-serif font-medium italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
              {photos[currentIndex].caption}
              </motion.p>
              )}
              
            </div>
          </motion.div>

          {/* Next photos (faded) */}
          {photos.length > 1 && (
            <motion.div
              className="absolute right-0 md:right-10 z-0 opacity-30 scale-75 hidden md:block"
              style={{ rotate: rotations[(currentIndex + 1) % photos.length] }}
            >
              <div className="polaroid">
                <img
                  src={photos[(currentIndex + 1) % photos.length].src}
                  alt="Next memory"
                  className="w-48 h-48 object-cover"
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation */}
        {photos.length > 1 && (
          <div className="flex justify-center items-center gap-8 mt-12">
            <motion.button
              onClick={prevPhoto}
              className="p-3 rounded-full border border-primary/30 text-primary/70 hover:border-primary hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Dots indicator */}
            <div className="flex gap-2">
              {photos.map((_, i) => (
                <motion.button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-primary w-6"
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                  onClick={() => setCurrentIndex(i)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextPhoto}
              className="p-3 rounded-full border border-primary/30 text-primary/70 hover:border-primary hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        )}
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10 text-6xl"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 2) * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            ✿
          </motion.div>
        ))}
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
    </motion.section>
  );
};

export default PhotosScreen;
