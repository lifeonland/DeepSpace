import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Planet } from '../types';
import { Loader2 } from 'lucide-react';
import { planetImages } from '../components/PlanetCard';

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

const PlanetDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.getPlanet(id)
        .then(setPlanet)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-white" size={32} />
    </div>
  );

  if (!planet) return null;

  return (
    <div className="px-6 md:px-12 py-24 mx-auto w-full max-w-[1000px] fade-in flex flex-col items-center">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="shooting-star" style={{ top: '10%', left: '20%' }} />
        <div className="shooting-star" style={{ top: '40%', left: '80%', animationDelay: '3s' }} />
        <div className="shooting-star" style={{ top: '70%', left: '40%', animationDelay: '6s' }} />
      </div>

      <Link to="/planets" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-16 uppercase tracking-[0.4em] text-[9px] font-black w-full">
        ← Back to Registry
      </Link>
      
      <div className="flex flex-col items-center text-center space-y-16 w-full">
        
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-black shadow-2xl border border-white/[0.05] animate-spin-slow">
          <img 
            src={planetImages[planet.name] || planetImages['Earth']} 
            alt={planet.name} 
            className="w-full h-full object-cover scale-[1.35]"
            onError={(e) => { (e.target as HTMLImageElement).src = planetImages['Earth']; }}
          />
        </div>
        
        <div className="space-y-12 w-full">
          <div className="space-y-6">
            <span className="text-[10px] font-black text-cyan uppercase tracking-[0.5em] drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">{planetTaglines[planet.name] || 'Celestial Body'}</span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none font-serif italic drop-shadow-2xl neon-text-glow">
              {planet.name}
            </h1>
            <p className="text-lg text-gray-300 font-light leading-relaxed italic border-t border-white/[0.05] pt-8 max-w-2xl mx-auto drop-shadow-md">
              "{planet.description}"
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pt-8">
            <Detail label="Surface Temp" value={`${planet.surfaceTemperature}°C`} />
            <Detail label="Diameter" value={`${planet.size.toLocaleString()} km`} />
            <Detail label="Orbital Period" value={`${planet.orbitalPeriod} Days`} />
            <Detail label="Gravity" value={`${planet.gravity} m/s²`} />
            <Detail label="Moons" value={`${planet.moonsCount} bodies`} />
            <Detail label="Habitable" value={planet.isHabitable ? 'Confirmed' : 'Uninhabitable'} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="space-y-2 glass-panel p-6 flex flex-col items-center justify-center border-t-0 shadow-none">
    <div className="text-[9px] font-black text-cyan uppercase tracking-[0.3em]">{label}</div>
    <div className="text-xl font-bold text-white tracking-tighter drop-shadow-md">{value}</div>
  </div>
);

export default PlanetDetails;
