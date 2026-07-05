import type { Planet, Quiz } from '../types';

const API_BASE_URL = '/api/v1';

export interface QuizSubmission {
  answers: Record<number, string>;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  feedback: {
    quizId: number;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    correct: boolean;
    explanation: string;
  }[];
}

export const api = {
  async getPlanets(): Promise<Planet[]> {
    const response = await fetch(`${API_BASE_URL}/planets`);
    if (!response.ok) throw new Error('Failed to fetch planets');
    return response.json();
  },

  async getPlanet(id: string | number): Promise<Planet> {
    const response = await fetch(`${API_BASE_URL}/planets/${id}`);
    if (!response.ok) throw new Error('Failed to fetch planet');
    return response.json();
  },

  async searchPlanets(query: string): Promise<Planet[]> {
    const response = await fetch(`${API_BASE_URL}/planets/search?q=${query}`);
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  },

  async getQuizzes(): Promise<Quiz[]> {
    const response = await fetch(`${API_BASE_URL}/quizzes`);
    if (!response.ok) throw new Error('Failed to fetch quizzes');
    return response.json();
  },

  async submitQuiz(submission: QuizSubmission): Promise<QuizResult> {
    const response = await fetch(`${API_BASE_URL}/quizzes/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    if (!response.ok) throw new Error('Failed to submit quiz');
    return response.json();
  },

  async getISSPosition(): Promise<{ latitude: number; longitude: number; velocity: number; altitude: number }> {
    const response = await fetch(`${API_BASE_URL}/satellites/iss`);
    if (!response.ok) throw new Error('Failed to fetch ISS position');
    return response.json();
  },

  async getFacts(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/facts`);
    if (!response.ok) throw new Error('Failed to fetch cosmic facts');
    return response.json();
  },

  async getSimulations(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/simulations`);
    if (!response.ok) throw new Error('Failed to fetch simulations');
    return response.json();
  },

  async getSatellites(): Promise<any[]> {
    // Mocking satellite data if backend endpoint is not yet defined
    return [
      { name: 'Starlink-1024', type: 'Communication', status: 'Active', launch: '2023-05-12', emoji: '🛰️' },
      { name: 'GPS BIIF-12', type: 'Navigation', status: 'Online', launch: '2016-02-05', emoji: '📍' },
      { name: 'GOES-18', type: 'Meteorology', status: 'Active', launch: '2022-03-01', emoji: '☁️' },
      { name: 'ISS', type: 'Research Station', status: 'Orbiting', launch: '1998-11-20', emoji: '🚀' },
    ];
  }
};
