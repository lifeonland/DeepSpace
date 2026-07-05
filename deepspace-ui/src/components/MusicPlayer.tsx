import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Using local mp3 file hosted in the /public folder
  const trackUrl = "/02 Cornfield Chase.mp3"; 

  // Note: Modern browsers (Chrome/Firefox) block autoplay unless the user has interacted with the document.
  // We will trigger play on the first global click if it hasn't started yet.
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log("Autoplay blocked, waiting for interaction", e));
      }
      document.removeEventListener('click', startAudio);
    };

    document.addEventListener('click', startAudio);
    return () => document.removeEventListener('click', startAudio);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-white/[0.05] backdrop-blur-md p-3 rounded-full border border-white/[0.1] shadow-2xl">
      <audio ref={audioRef} src={trackUrl} loop />
      <button 
        onClick={togglePlay}
        className="text-white hover:text-cyan transition-colors"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <div className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">
        {isPlaying ? 'Cornfield Chase' : 'Audio Paused'}
      </div>
    </div>
  );
};
