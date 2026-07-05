import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import type { Planet } from '../types';
import Planet3D from '../components/SolarSystem/Planet3D';
import { Loader2, Maximize, Minimize } from 'lucide-react';

const SolarSystem = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [isScaled, setIsScaled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.getPlanets()
      .then(setPlanets)
      .catch(err => console.error('Failed to load solar system:', err))
      .finally(() => setLoading(false));
  }, []);

  const handlePlanetClick = (id: number) => {
    navigate(`/planets/${id}`);
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-sky-400 mb-6" size={64} />
      <p className="text-slate-500 font-mono tracking-[0.3em] text-sm uppercase">Calculating orbital trajectories...</p>
    </div>
  );

  return (
    <div className="w-full h-[calc(100vh-120px)] relative bg-space-950 overflow-hidden group fade-in font-sans">
      {/* Refined Minimal Controls */}
      <div className="absolute top-12 left-12 z-10 space-y-2 pointer-events-none">
        <h2 className="text-[10px] font-black text-slate-700 uppercase tracking-[0.6em]">System Mapping</h2>
        <div className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none">Sol Cluster</div>
      </div>

      <div className="absolute top-12 right-12 z-10 flex flex-col items-end gap-6">
        <button 
          onClick={() => setIsScaled(!isScaled)}
          className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors duration-500 cursor-pointer"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.4em]">
            {isScaled ? 'Relative' : 'Absolute'}
          </span>
          {isScaled ? <Minimize size={12} /> : <Maximize size={12} />}
        </button>
      </div>

      <div className="absolute bottom-12 left-12 z-10 max-w-[280px] space-y-4 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
        <p className="text-[10px] text-slate-500 font-light leading-relaxed tracking-wide italic">
          Interface: modulation of depth via scroll. Rotation of coordinate space via drag. 
          Selection synchronizes planetary registry.
        </p>
      </div>

      <Canvas shadows camera={{ position: [0, 20, 60], fov: 45 }}>
        <Suspense fallback={null}>
          <OrbitControls 
            enablePan={false} 
            maxDistance={400} 
            minDistance={10}
            autoRotate={false}
          />
          
          <Stars radius={300} depth={100} count={3000} factor={4} saturation={0} fade speed={0.5} />
          
          {/* Refined Lighting */}
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 0, 0]} intensity={1200} color="#fff" decay={0} />
          
          {/* The Sun - Minimal White Core */}
          <mesh>
            <sphereGeometry args={[3.5, 64, 64]} />
            <meshStandardMaterial 
              emissive="#fff" 
              emissiveIntensity={2} 
              color="#fff"
              toneMapped={false}
            />
          </mesh>

          {planets.map((planet) => (
            <Planet3D 
              key={planet.id} 
              planet={planet} 
              isScaled={isScaled} 
              onClick={handlePlanetClick} 
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SolarSystem;

