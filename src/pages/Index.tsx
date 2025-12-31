import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoaderScreen from "@/components/birthday/LoaderScreen";
import IntroScreen from "@/components/birthday/IntroScreen";
import CakeScreen from "@/components/birthday/CakeScreen";
import MessageScreen from "@/components/birthday/MessageScreen";
import PhotosScreen from "@/components/birthday/PhotosScreen";
import VideoMemoriesScreen from "@/components/birthday/VideoMemoriesScreen";
import FinalScreen from "@/components/birthday/FinalScreen";

// Import memories
import K1 from "@/assets/K1.jpeg";
import K2 from "@/assets/K2.jpeg";
import K3 from "@/assets/K3.jpeg";
import N1 from "@/assets/N1.jpeg";
import N2 from "@/assets/N2.jpeg";
import N3 from "@/assets/N3.jpeg";
import KT1 from "@/assets/KT1.jpeg";
import R1 from "@/assets/R1.jpeg";
import R2 from "@/assets/R2.jpeg";

// Configuration - Easy to customize
const BIRTHDAY_CONFIG = {
  name: "My Love",
  message: `On this day… the day you came into this world…
I don’t just celebrate your birthday.
I celebrate the moment life quietly decided to change mine forever.

You may never truly understand this, but having you in my life feels like living inside a miracle I never asked for, yet can’t imagine surviving without. Every moment with you doesn’t feel like time passing — it feels like time finally making sense.

Your smile doesn’t just make me happy… it makes me feel safe.
Your laughter doesn’t just sound beautiful… it heals parts of me I never knew were broken.
And your love — your love is not something I have… it’s something I live inside.

You have this rare way of carrying everyone’s happiness so gently, even when your own heart is tired. You make people feel seen, cared for, loved — often without realizing how extraordinary that makes you. And I see it. I see you. Always.

I know I’m not perfect. I know there will be a thousand mistakes in me — moments where I fall short, moments where I struggle, moments where I don’t get things right. But there is one thing about me that has never wavered, not for a second:
I have never stopped loving you. Not once. Not even in silence. Not even in fear. Not even in the moments I didn’t know how to say it.

If you ever feel lost, I want you to remember this — you will always find me. In every place you need comfort. In every moment you need strength. In every version of life you choose to live. Loving you isn’t something I try to do… it’s something my heart does naturally, endlessly.

If I could, I would protect you from every hurt, carry every worry for you, and turn every tear into a reason to smile again. And even when I can’t do all of that… I promise I will never stop trying.

So today, on your birthday, I don’t wish you perfection.
I wish you peace.
I wish you a love that feels like home.
And I wish you a lifetime of moments where you feel as deeply loved as you truly are — especially by me.

Happy Birthday, my love.
You are not just a part of my life… you are my forever, in every sense of the word.`,
  senderName: "With All My Heart, Yours Only Kichuu ♥",
  photos: [
    { src: K1, caption: "Two heads, one heart." },
    { src: N3, caption: "Before Words" },
    { src: R1, caption: "Quirky Finds, Shared Laughs" },
    { src: KT1, caption: "My Favorite Recent Discovery." },
    { src: K2, caption: "Rooted Together" },
    { src: N1, caption: "Always Home" },
    { src: R2, caption: "Love Looks Like This." },
    { src: K3, caption: "Since 2021, Still Ascending." },
    { src: N2, caption: "Dancing Souls" },
  ],
  // Add your video URLs here - vertical mobile-style videos work best
  videos: [
    { src: "/videos/A1.mp4", }, 
    { src: "/videos/J1.mp4" }, 
    { src: "/videos/F1.mp4" },
    { src: "/videos/R1.mp4" },
    { src: "/videos/KT1.mp4" },
    { src: "/videos/N1.mp4" },
    { src: "/videos/K1.mp4" }
  ],
};

type Screen = "loader" | "intro" | "cake" | "message" | "photos" | "videos" | "final";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("loader");
  const [showAllSections, setShowAllSections] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setCurrentScreen("intro");
  }, []);

  const handleEnter = useCallback(() => {
    setShowAllSections(true);
    setCurrentScreen("cake");
    
    // Smooth scroll to cake section
    setTimeout(() => {
      document.getElementById("cake-section")?.scrollIntoView({ 
        behavior: "smooth" 
      });
    }, 100);
  }, []);

  const handleCakeComplete = useCallback(() => {
    setTimeout(() => {
      document.getElementById("photos-section")?.scrollIntoView({ 
        behavior: "smooth" 
      });
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden hide-scrollbar">
      {/* Loader Screen */}
      <AnimatePresence mode="wait">
        {currentScreen === "loader" && (
          <LoaderScreen onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {currentScreen !== "loader" && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Intro Section */}
            <section id="intro-section">
              <IntroScreen 
                name={BIRTHDAY_CONFIG.name} 
                onEnter={handleEnter} 
              />
            </section>

            {/* Rest of sections appear after clicking "Begin Your Journey" */}
            {showAllSections && (
              <>
                {/* Cake Section */}
                <section id="cake-section">
                  <CakeScreen onBlowCandles={handleCakeComplete} />
                </section>

                {/* Photos Section */}
                <section id="photos-section">
                  <PhotosScreen photos={BIRTHDAY_CONFIG.photos} />
                </section>

                {/* Video Memories Section */}
                {BIRTHDAY_CONFIG.videos.length > 0 && (
                  <section id="videos-section">
                    <VideoMemoriesScreen videos={BIRTHDAY_CONFIG.videos} />
                  </section>
                )}

                {/* Message Section - Last before Final */}
                <section id="message-section">
                  <MessageScreen 
                    message={BIRTHDAY_CONFIG.message}
                    senderName={BIRTHDAY_CONFIG.senderName}
                  />
                </section>

                {/* Final Section */}
                <section id="final-section">
                  <FinalScreen name={BIRTHDAY_CONFIG.name} />
                </section>
              </>
            )}
          </motion.main>
        )}
      </AnimatePresence>

      {/* Global ambient background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Corner glows */}
        <div 
          className="absolute top-0 left-0 w-96 h-96 opacity-5"
          style={{
            background: "radial-gradient(circle at top left, hsl(var(--glow-gold)), transparent 70%)",
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 opacity-5"
          style={{
            background: "radial-gradient(circle at bottom right, hsl(var(--glow-pink)), transparent 70%)",
          }}
        />
      </div>
    </div>
  );
};

export default Index;
