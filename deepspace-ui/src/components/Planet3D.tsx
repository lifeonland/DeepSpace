import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface Planet3DProps {
  color: string;
}

export const Planet3D = ({ color }: Planet3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshStandardMaterial 
        color={color} 
        roughness={0.4} 
        metalness={0.1} 
      />
    </Sphere>
  );
};
