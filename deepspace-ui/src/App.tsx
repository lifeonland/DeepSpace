import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { GlobalAudio } from './components/GlobalAudio';
import { Loader2 } from 'lucide-react';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Explorer = lazy(() => import('./pages/Explorer'));
const PlanetDetails = lazy(() => import('./pages/PlanetDetails'));
const SatelliteTracker = lazy(() => import('./pages/SatelliteTracker'));
const SpaceFacts = lazy(() => import('./pages/SpaceFacts'));
const Simulations = lazy(() => import('./pages/Simulations'));
const EarthObservatory = lazy(() => import('./pages/EarthObservatory'));
const Debris = lazy(() => import('./pages/Debris'));
const SatelliteNetworks = lazy(() => import('./pages/SatelliteNetworks'));

const LoadingFallback = () => (
  <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh]">
    <Loader2 className="animate-spin text-sky-400 mb-4" size={48} />
    <span className="text-slate-500 font-mono text-xs tracking-[0.3em] uppercase">Initializing Neural Link...</span>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-black text-white font-sans overflow-x-hidden">
        <Navbar />
        <GlobalAudio />
        
        <main className="flex-grow flex flex-col w-full relative z-10">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/planets" element={<Explorer />} />
              <Route path="/planets/:id" element={<PlanetDetails />} />
              <Route path="/tracker" element={<SatelliteTracker />} />
              <Route path="/networks" element={<SatelliteNetworks />} />
              <Route path="/debris" element={<Debris />} />
              <Route path="/facts" element={<SpaceFacts />} />
              <Route path="/observatory" element={<EarthObservatory />} />
              <Route path="/simulations" element={<Simulations />} />
            </Routes>
          </Suspense>
        </main>
        
        <footer className="px-12 py-12 text-slate-600 text-[10px] mt-auto border-t border-white/[0.05] relative z-10">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center uppercase tracking-widest font-bold">
            <div className="flex flex-col gap-1">
              <span>DeepSpace</span>
            </div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-white transition-colors">Telemetry</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
