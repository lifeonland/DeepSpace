import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Planet } from '../types';
import PlanetCard from '../components/PlanetCard';

const Explorer: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPlanets()
      .then(setPlanets)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-t border-white animate-spin rounded-full" />
    </div>
  );

  return (
    <div className="relative min-h-screen">
      {/* Global shooting stars container */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="shooting-star animate-fall" style={{ top: '10%', left: '20%' }} />
        <div className="shooting-star animate-fall" style={{ top: '40%', left: '80%', animationDelay: '3s' }} />
        <div className="shooting-star animate-fall" style={{ top: '70%', left: '40%', animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 px-12 py-20 max-w-[1800px] mx-auto w-full fade-in">
        <Link to="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-colors mb-12 block">
          ← Back to Home
        </Link>
        <div className="flex justify-between items-end mb-24 border-b border-white/[0.05] pb-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-black italic tracking-tighter text-white">Planets</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
          {planets.map((planet) => (
            <PlanetCard key={planet.id} planet={planet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explorer;
