export interface Planet {
  id: number;
  name: string;
  type: string;
  size: number;
  distanceFromSun: number;
  surfaceTemperature: number;
  gravity: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  description: string;
  hasRings: boolean;
  moonsCount: number;
  colorHex: string;
  isHabitable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
}
