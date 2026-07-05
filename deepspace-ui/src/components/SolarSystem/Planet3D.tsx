import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Planet } from '../../types';

interface Planet3DProps {
  planet: Planet;
  isScaled: boolean;
  onClick: (id: number) => void;
}

const Planet3D = ({ planet, isScaled, onClick }: Planet3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Memoize values that don't change often
  const { distance, size, speed, rotationSpeed } = useMemo(() => {
    const distanceScale = isScaled ? 0.000002 : 0.4;
    const sizeScale = isScaled ? 0.0003 : 0.04;
    
    return {
      distance: planet.distanceFromSun * distanceScale + (isScaled ? 10 : planet.id * 8 + 8),
      size: Math.max(planet.size * sizeScale, 0.4),
      speed: 1 / (planet.orbitalPeriod * 0.05),
      rotationSpeed: 24 / (Math.abs(planet.rotationPeriod) || 24) * 0.05
    };
  }, [planet, isScaled]);
  
  // Animation: Orbit and Rotation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
      // Add a slight wobble for non-gas giants
      if (planet.type !== 'GAS_GIANT') {
        meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.02;
      }
    }
  });

  return (
    <group ref={orbitRef}>
      <group position={[distance, 0, 0]}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick(planet.id);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[size, 64, 64]} />
          <meshStandardMaterial 
            color={planet.colorHex} 
            emissive={planet.colorHex}
            emissiveIntensity={hovered ? 0.8 : 0.3}
            roughness={planet.type === 'GAS_GIANT' ? 0.8 : 0.4}
            metalness={planet.type === 'GAS_GIANT' ? 0.1 : 0.6}
          />
          
          {hovered && (
            <Html distanceFactor={15}>
              <div className="glass-card px-4 py-2 border-white/20 whitespace-nowrap pointer-events-none -translate-y-full mb-4 animate-in fade-in zoom-in duration-200">
                <strong style={{ color: planet.colorHex }} className="text-sm font-black uppercase tracking-widest">{planet.name}</strong>
                <div className="text-[10px] text-slate-400 font-mono mt-1">TELEMETRY LOCKED</div>
              </div>
            </Html>
          )}
        </mesh>

        {/* Planet Name Label (Persistent) */}
        {!hovered && (
          <Text
            position={[0, size + 0.8, 0]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.6}
          >
            {planet.name.toUpperCase()}
          </Text>
        )}

        {/* Planet Rings */}
        {planet.hasRings && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[size * 1.4, size * 2.2, 128]} />
            <meshStandardMaterial 
              color={planet.colorHex} 
              transparent 
              opacity={0.4} 
              side={THREE.DoubleSide}
              emissive={planet.colorHex}
              emissiveIntensity={0.2}
            />
          </mesh>
        )}
      </group>

      {/* Orbit Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.02, distance + 0.02, 256]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default Planet3D;

