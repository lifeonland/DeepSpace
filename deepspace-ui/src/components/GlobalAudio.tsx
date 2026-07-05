import React, { useRef, useEffect, useState } from 'react';

export const GlobalAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Using local mp3 file hosted in the /public folder
  const trackUrl = "/02 Cornfield Chase.mp3";

  useEffect(() => {
    const playAudio = async () => {
      if (isPlaying) return; // Already playing
      
      const audio = audioRef.current;
      if (audio) {
        try {
          audio.volume = 0.5;
          audio.loop = true;
          // Try to play immediately
          const playPromise = audio.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("✅ Audio successfully started on load.");
                setIsPlaying(true);
              })
              .catch(error => {
                console.log("⚠️ Autoplay blocked, will play on first user interaction:", error);
                // Fallback: play on user interaction
                const handleUserInteraction = async () => {
                  try {
                    await audio.play();
                    setIsPlaying(true);
                    console.log("✅ Audio started on user interaction.");
                  } catch (e) {
                    console.error("❌ Could not play audio:", e);
                  }
                  document.removeEventListener('click', handleUserInteraction);
                  document.removeEventListener('touchstart', handleUserInteraction);
                };
                
                document.addEventListener('click', handleUserInteraction, { once: true });
                document.addEventListener('touchstart', handleUserInteraction, { once: true });
              });
          }
        } catch (err) {
          console.error("❌ Audio playback failed:", err);
        }
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(playAudio, 500);
    return () => clearTimeout(timer);
  }, [isPlaying]);

  return (
    <audio 
      ref={audioRef} 
      src={trackUrl} 
      loop 
      preload="auto"
      crossOrigin="anonymous"
      className="hidden" 
    />
  );
};
