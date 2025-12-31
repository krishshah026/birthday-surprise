import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
// import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

interface Video {
  src: string;
  poster?: string;
}

interface VideoMemoriesScreenProps {
  videos: Video[];
}

const VideoMemoriesScreen = ({ videos }: VideoMemoriesScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const currentVideo = videoRefs.current[currentIndex];

  const handleVideoEnd = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
    setProgress(0);
  }, [videos.length]);

  const handleTimeUpdate = useCallback(() => {
    if (currentVideo) {
      const progress = (currentVideo.currentTime / currentVideo.duration) * 100;
      setProgress(progress);
    }
  }, [currentVideo]);

  useEffect(() => {
    const video = videoRefs.current[currentIndex];
    if (video && isInView) {
      video.currentTime = 0;
      video.play().catch(() => {});
    setIsPlaying(true);
    }
    
    // Pause other videos
    videoRefs.current.forEach((v, i) => {
      if (v && i !== currentIndex) {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [currentIndex, isInView]);


  const togglePlay = () => {
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = !isMuted;
    });
    setIsMuted(!isMuted);
  };

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const nextVideo = () => {
  setCurrentIndex((prev) => (prev + 1) % videos.length);
  setProgress(0);
};

const prevVideo = () => {
  setCurrentIndex((prev) =>
    prev === 0 ? videos.length - 1 : prev - 1
  );
  setProgress(0);
};


  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen py-16 md:py-24 px-4 md:px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/80 to-background" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          style={{
            background: "radial-gradient(ellipse at center, hsl(var(--muted) / 0.3) 0%, transparent 60%)",
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
        <p className="text-muted-foreground text-xs md:text-sm tracking-[0.3em] uppercase mb-3 md:mb-4">
          From the hearts that know you best.
        </p>
        <h2 className="text-gradient-romantic text-2xl md:text-4xl lg:text-5xl font-serif">
          For You, From Us
        </h2>
      </motion.div>

      {/* Video Player */}
      <div className="relative z-10 flex flex-col items-center">
        {/* iPhone 16 Pro Max Frame */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Phone outer frame - iPhone 16 Pro Max style */}
          <div 
            className="relative rounded-[45px] md:rounded-[55px] p-[8px] md:p-[10px]"
            style={{
              background: "linear-gradient(145deg, #2a2a2f 0%, #1a1a1e 50%, #0f0f12 100%)",
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.1),
                0 25px 50px -12px rgba(0,0,0,0.8),
                inset 0 1px 0 rgba(255,255,255,0.1)
              `,
              width: "290px",
              height: "580px",
            }}
          >
            {/* Titanium side buttons - left */}
            <div 
              className="absolute -left-[3px] top-[100px] w-[3px] h-[30px] rounded-l-sm"
              style={{ background: "linear-gradient(180deg, #3a3a40 0%, #2a2a2f 100%)" }}
            />
            <div 
              className="absolute -left-[3px] top-[150px] w-[3px] h-[55px] rounded-l-sm"
              style={{ background: "linear-gradient(180deg, #3a3a40 0%, #2a2a2f 100%)" }}
            />
            <div 
              className="absolute -left-[3px] top-[220px] w-[3px] h-[55px] rounded-l-sm"
              style={{ background: "linear-gradient(180deg, #3a3a40 0%, #2a2a2f 100%)" }}
            />
            
            {/* Titanium side buttons - right */}
            <div 
              className="absolute -right-[3px] top-[160px] w-[3px] h-[70px] rounded-r-sm"
              style={{ background: "linear-gradient(180deg, #3a3a40 0%, #2a2a2f 100%)" }}
            />

            {/* Inner screen bezel */}
            <div 
              className="relative w-full h-full rounded-[38px] md:rounded-[46px] overflow-hidden"
              style={{
                background: "#000",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
              }}
            >
              {/* Dynamic Island */}
              <div 
                className="absolute top-[10px] md:top-[12px] left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2"
                style={{
                  width: "110px",
                  height: "32px",
                  background: "#000",
                  borderRadius: "20px",
                }}
              >
                {/* Front camera */}
                <div 
                  className="w-[10px] h-[10px] rounded-full"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #1a1a2e 0%, #0a0a0f 100%)",
                    boxShadow: "inset 0 0 2px rgba(255,255,255,0.1)",
                  }}
                />
              </div>

              {/* Video content area */}
              <div className="w-full h-full">
                <AnimatePresence mode="wait">
                  {videos.map((video, index) => (
                    <motion.div
                      key={index}
                      className={`absolute inset-0 ${index === currentIndex ? "z-10" : "z-0"}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ 
                        opacity: index === currentIndex ? 1 : 0,
                        x: index === currentIndex ? 0 : -50,
                      }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <video
                        ref={(el) => { videoRefs.current[index] = el; }}
                        src={video.src}
                        poster={video.poster}
                        muted={isMuted}
                        loop={false}
                        playsInline
                        // className="w-full h-full object-cover"
                        className="w-full h-full object-cover pointer-events-none"
                        onEnded={handleVideoEnd}
                        onTimeUpdate={handleTimeUpdate}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Progress bars at top (stories style) */}
                <div className="absolute top-[50px] left-4 right-4 z-20 flex gap-1">
                  {videos.map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 h-[2px] bg-white/20 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-white/90"
                        initial={{ width: 0 }}
                        animate={{
                          width: index < currentIndex
                            ? "100%"
                            : index === currentIndex
                            ? `${progress}%`
                            : "0%",
                        }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  ))}
                </div>

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-10" />

                {/* Play/Pause overlay */}
                {/* <motion.button
                  className="absolute inset-0 z-15 flex items-center justify-center"
                  onClick={togglePlay}
                  whileTap={{ scale: 0.95 }}
                > */}
                <div className="absolute inset-0 z-15 flex items-center justify-center pointer-events-none">

                  <AnimatePresence>
                    {!isPlaying && (
                      // <motion.div
                      //   initial={{ opacity: 0, scale: 0.5 }}
                      //   animate={{ opacity: 1, scale: 1 }}
                      //   exit={{ opacity: 0, scale: 0.5 }}
                      //   className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      // >
                      <motion.div
  onClick={togglePlay}
  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-auto cursor-pointer"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.5 }}
>
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 z-20">
                  <div 
                    className="w-[120px] h-[4px] rounded-full"
                    style={{ background: "rgba(255,255,255,0.3)" }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Reflection effect */}
          <div 
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[200px] h-[80px] opacity-20 blur-xl"
            style={{
              background: "radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Controls */}
        <motion.div
          // className="flex items-center gap-4 md:gap-6 mt-8"
          className="flex items-center gap-4 md:gap-6 mt-8 pointer-events-auto z-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={togglePlay}
            className="p-2.5 md:p-3 rounded-full border border-primary/30 text-primary hover:border-primary hover:bg-primary/10 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </motion.button>

          <motion.button
            onClick={toggleMute}
            className="p-2.5 md:p-3 rounded-full border border-primary/30 text-primary hover:border-primary hover:bg-primary/10 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>
        </motion.div>

        {/* Video indicators */}
        {/* Navigation (same as Photos screen) */}
{videos.length > 1 && (
  <div className="flex justify-center items-center gap-8 mt-12">

    {/* Previous */}
    <motion.button
      onClick={prevVideo}
      className="p-3 rounded-full border border-primary/30 text-primary/70
                 hover:border-primary hover:text-primary transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ChevronLeft size={24} />
    </motion.button>

    {/* Dots */}
    <div className="flex gap-2">
      {videos.map((_, i) => (
        <motion.button
          key={i}
          onClick={() => goToVideo(i)}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === currentIndex
              ? "bg-primary w-6"
              : "bg-primary/30 hover:bg-primary/50"
          }`}
          whileHover={{ scale: 1.2 }}
        />
      ))}
    </div>

    {/* Next */}
    <motion.button
      onClick={nextVideo}
      className="p-3 rounded-full border border-primary/30 text-primary/70
                 hover:border-primary hover:text-primary transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ChevronRight size={24} />
    </motion.button>

  </div>
)}

        {/* <div className="flex gap-2 md:gap-3 mt-5 md:mt-6">
          {videos.map((_, index) => (
            <motion.button
              key={index}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-5 md:w-6"
                  : "bg-primary/30 hover:bg-primary/50 w-1.5 md:w-2"
              }`}
              onClick={() => goToVideo(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div> */}
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
    </motion.section>
  );
};

export default VideoMemoriesScreen;
