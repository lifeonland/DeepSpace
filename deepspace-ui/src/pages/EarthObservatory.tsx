import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Use reliable unpkg CDN for Earth textures instead of raw.githubusercontent which fails due to CORS
  const texture = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  const specularMap = useLoader(THREE.TextureLoader, 'https://unpkg.com/three-globe/example/img/earth-water.png');

  useFrame(({ clock }) => {
    if (earthRef.current) earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <mesh ref={earthRef} castShadow receiveShadow>
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial 
        map={texture} 
        specularMap={specularMap}
        specular={new THREE.Color(0x333333)}
        shininess={15}
        emissive={new THREE.Color(0x112244)}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
};

const EarthObservatory: React.FC = () => {
  const [issPos, setIssPos] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const update = async () => {
      try {
        const data = await api.getISSPosition();
        setIssPos({ lat: data.latitude, lng: data.longitude });
      } catch (err) { console.error(err); }
    };
    update();
    const timer = setInterval(update, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-full bg-black relative fade-in flex flex-col">
      {/* Top Header - Unified Alignment */}
      <div className="flex justify-between items-center px-6 md:px-12 py-6 md:py-10 z-50">
        <Link to="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-colors">
          ← Back to Home
        </Link>
        <div className="text-right flex flex-col items-end">
          <h2 className="text-[10px] font-black italic uppercase text-white tracking-[0.4em]">Earth Observatory</h2>
          <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em]">ISS Live Link Active</div>
        </div>
      </div>

      <div className="flex-grow relative">
        {/* Main Canvas */}
        <div className="absolute inset-0">
          <Canvas shadows camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 3, 5]} intensity={1.5} />
            <Stars radius={100} depth={50} count={5000} factor={4} />
            <Suspense fallback={null}>
              <Earth />
            </Suspense>
            <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
          </Canvas>
        </div>

        {/* Telemetry Overlay */}
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 z-40 glass-panel p-6 md:p-8 min-w-[200px] md:min-w-[280px]">
          <div className="space-y-8">
            <TelemetryMetric label="Latitude" value={`${issPos.lat.toFixed(4)}°`} />
            <TelemetryMetric label="Longitude" value={`${issPos.lng.toFixed(4)}°`} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TelemetryMetric: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="space-y-1">
    <div className="text-[9px] font-black text-cyan uppercase tracking-[0.3em] drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">{label}</div>
    <div className="text-2xl font-black text-white tabular-nums tracking-tighter italic drop-shadow-md">{value}</div>
  </div>
);

export default EarthObservatory;
