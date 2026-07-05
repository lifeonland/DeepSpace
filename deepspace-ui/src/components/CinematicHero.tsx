import { Canvas } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const COLORS = ['text-cyan-500', 'text-purple-500', 'text-pink-500', 'text-blue-500'];

export const CinematicHero = () => {
  const randomColor = useMemo(() => COLORS[Math.floor(Math.random() * COLORS.length)], []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 20]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 md:p-12">
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-8xl font-black italic tracking-tighter leading-none font-serif"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="inline-block text-white"
          >
            Deep
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className={`inline-block ${randomColor} neon-text-glow ml-4`}
          >
            Space
          </motion.span>
        </motion.h1>
        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="mt-12 group flex flex-col items-center gap-6 cursor-pointer focus:outline-none"
        >
          <span className="text-xl text-slate-400 font-light tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">
            Navigate the Unknown.
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-7 h-12 border-2 border-slate-500 rounded-full flex justify-center p-1 group-hover:border-cyan group-hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300"
          >
            <motion.div className="w-1.5 h-3 bg-slate-500 rounded-full group-hover:bg-cyan transition-colors duration-300" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};
