import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Planet } from '../types';

// Original Wikimedia images with SVG fallbacks
export const planetImages: Record<string, string> = {
  'Mercury': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_in_color_-_Prockter07_centered.jpg',
  'Venus': 'https://upload.wikimedia.org/wikipedia/commons/8/85/Venus_globe.jpg',
  'Earth': 'https://upload.wikimedia.org/wikipedia/commons/c/cb/The_Blue_Marble_%28remastered%29.jpg',
  'Moon': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg',
  'Mars': 'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
  'Jupiter': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Jupiter_New_Horizons.jpg',
  'Saturn': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg',
  'Uranus': 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
  'Neptune': 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
  'Pluto': 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_High-Res.jpg'
};

// Local SVG fallbacks
const svgFallbacks: Record<string, string> = {
  'Mercury': '/planets/mercury.svg',
  'Venus': '/planets/venus.svg',
  'Earth': '/planets/earth.svg',
  'Moon': '/planets/moon.svg',
  'Mars': '/planets/mars.svg',
  'Jupiter': '/planets/jupiter.svg',
  'Saturn': '/planets/saturn.svg',
  'Uranus': '/planets/uranus.svg',
  'Neptune': '/planets/neptune.svg',
  'Pluto': '/planets/pluto.svg'
};
const planetColors: Record<string, string> = {
  'Mercury': '#8C7853',
  'Venus': '#FFC649',
  'Earth': '#4A90E2',
  'Moon': '#CCCCCC',
  'Mars': '#E27B58',
  'Jupiter': '#C88B3A',
  'Saturn': '#FAD5A5',
  'Uranus': '#4FD0E7',
  'Neptune': '#4166F5',
  'Pluto': '#A9A9A9'
};

const planetTaglines: Record<string, string> = {
  'Mercury': 'The Swift Messenger',
  'Venus': 'The Evening Star',
  'Earth': 'The Cradle of Life',
  'Moon': 'The Lunar Satellite',
  'Mars': 'The Red Planet',
  'Jupiter': 'The Gas Giant',
  'Saturn': 'The Ringed Beauty',
  'Uranus': 'The Sideways Ice Giant',
  'Neptune': 'The Windy World',
  'Pluto': 'The Distant Wanderer'
};

interface PlanetCardProps {
  planet: Planet;
}

const PlanetCard: React.FC<PlanetCardProps> = ({ planet }) => {
  const bgColor = planetColors[planet.name] || '#4A90E2';
  const [imageError, setImageError] = React.useState(false);
  
  return (
    <div className="group flex flex-col items-center space-y-8 glass-panel p-8 w-full max-w-sm mx-auto hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 cursor-pointer">
      <motion.div 
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        className="relative w-48 h-48 rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_var(--planet-color)] transition-shadow duration-700 cursor-grab active:cursor-grabbing animate-spin-slow"
        style={{ backgroundColor: bgColor, '--planet-color': bgColor } as React.CSSProperties}
      >
        <Link to={`/planets/${planet.id}`}>
          {!imageError ? (
            <img 
              src={planetImages[planet.name] || planetImages['Earth']} 
              alt={planet.name} 
              className="w-full h-full object-cover scale-[1.35] transition-transform duration-1000 group-hover:scale-[1.5]"
              onError={() => setImageError(true)}
            />
          ) : (
            <img 
              src={svgFallbacks[planet.name] || svgFallbacks['Earth']} 
              alt={planet.name} 
              className="w-full h-full object-cover scale-[1.35] transition-transform duration-1000 group-hover:scale-[1.5] opacity-90"
            />
          )}
        </Link>
      </motion.div>
      
      <div className="text-center space-y-2">
        <span className="text-[8px] font-black text-cyan drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] tracking-[0.5em] uppercase">{planetTaglines[planet.name] || 'Celestial Body'}</span>
        <h3 className="text-3xl font-black tracking-tighter text-white group-hover:neon-text-glow transition-all duration-300 italic font-serif">
          {planet.name}
        </h3>
      </div>
    </div>
  );
};

export default PlanetCard;
