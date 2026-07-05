import React from 'react';
import { CinematicHero } from '../components/CinematicHero';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TelemetryRibbon = () => (
  <div className="w-full bg-cyan/10 border-y border-cyan/20 py-4 overflow-hidden relative z-20">
    <div className="flex animate-[spin_20s_linear_infinite] [animation-direction:reverse] md:animate-none md:justify-center gap-12 text-cyan font-mono text-[9px] md:text-xs uppercase tracking-widest whitespace-nowrap">
      <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan animate-pulse"/> ACTIVE SATELLITES: 8,432</span>
      <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"/> DEEP SPACE PROBES: 14</span>
      <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"/> SOLAR ACTIVITY: HIGH</span>
      <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> DSN LINK: ESTABLISHED</span>
    </div>
  </div>
);

const GalleryCard: React.FC<{ title: string, subtitle: string, img: string, link: string }> = ({ title, subtitle, img, link }) => (
  <Link to={link}>
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative h-[420px] w-full rounded-[2rem] overflow-hidden shadow-2xl cursor-pointer border border-white/10 hover:border-cyan/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-500"
    >
      <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 pointer-events-none" />
      
      <div className="absolute inset-x-4 bottom-4 p-6 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 group-hover:bg-white/[0.08] group-hover:border-cyan/30 transition-all duration-500 flex flex-col items-start">
        <span className="text-[9px] font-black text-cyan tracking-[0.3em] uppercase mb-3 bg-cyan/10 px-4 py-1.5 rounded-full">{subtitle}</span>
        <h3 className="text-2xl font-bold text-white tracking-wide heading-font drop-shadow-lg">{title}</h3>
      </div>
    </motion.div>
  </Link>
);

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Global shooting stars container */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="shooting-star" style={{ top: '10%', left: '20%' }} />
        <div className="shooting-star" style={{ top: '40%', left: '80%', animationDelay: '3s' }} />
        <div className="shooting-star" style={{ top: '70%', left: '40%', animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 flex flex-col">
        <CinematicHero />
        
        <TelemetryRibbon />

        <main className="px-6 md:px-12 py-24 max-w-[1400px] mx-auto w-full space-y-32">
          
          {/* Featured Exploration Section */}
          <section className="space-y-16">
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="text-[10px] font-black text-cyan uppercase tracking-[0.5em] bg-cyan/10 px-6 py-2 rounded-full border border-cyan/20">Explore the Cosmos</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-widest heading-font uppercase pt-4">Deep Space Archives</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GalleryCard 
                title="Planet Registry" 
                subtitle="Orbital Database" 
                img="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800"
                link="/planets"
              />
              <GalleryCard 
                title="Universal Facts" 
                subtitle="Cosmic Knowledge" 
                img="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800"
                link="/facts"
              />
              <GalleryCard 
                title="Live Earth Feed" 
                subtitle="Real-Time Telemetry" 
                img="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"
                link="/observatory"
              />
            </div>
          </section>

          {/* Quick Access Dashboard */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Space Weather Widget */}
            <div className="glass-panel p-8 rounded-[2rem] flex flex-col relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 to-transparent" />
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                  <h3 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em]">Space Weather</h3>
                  <span className="animate-pulse w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Solar Flares</span>
                    <span className="text-white font-mono text-sm bg-white/5 px-3 py-1 rounded-md">Class M1.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Geomag Storms</span>
                    <span className="text-white font-mono text-sm bg-white/5 px-3 py-1 rounded-md">Kp 4 (Active)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Solar Wind</span>
                    <span className="text-white font-mono text-sm bg-white/5 px-3 py-1 rounded-md">410 km/s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Observation Log */}
            <div className="glass-panel p-8 rounded-[2rem] h-[400px] flex flex-col justify-between relative overflow-hidden group md:col-span-2 hover:-translate-y-2 transition-transform duration-500">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800')] bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity duration-1000" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="border-b border-white/5 pb-6 mb-8">
                  <h3 className="text-[10px] font-black text-cyan uppercase tracking-[0.3em]">Observation Log</h3>
                </div>
                <div className="space-y-6 flex-grow overflow-hidden">
                  <div className="flex items-center gap-6 group/log hover:bg-white/[0.02] p-3 rounded-xl transition-colors">
                    <span className="text-[10px] font-mono text-cyan bg-cyan/10 px-3 py-1.5 rounded-md">04:22 UTC</span>
                    <p className="text-sm text-gray-300 font-light group-hover/log:text-white transition-colors">Nebula core expansion detected in Orion.</p>
                  </div>
                  <div className="flex items-center gap-6 group/log hover:bg-white/[0.02] p-3 rounded-xl transition-colors">
                    <span className="text-[10px] font-mono text-cyan bg-cyan/10 px-3 py-1.5 rounded-md">01:15 UTC</span>
                    <p className="text-sm text-gray-300 font-light group-hover/log:text-white transition-colors">Pulsar J0437-4715 signal frequency drift.</p>
                  </div>
                  <div className="flex items-center gap-6 group/log hover:bg-white/[0.02] p-3 rounded-xl transition-colors">
                    <span className="text-[10px] font-mono text-cyan bg-cyan/10 px-3 py-1.5 rounded-md">22:10 UTC</span>
                    <p className="text-sm text-gray-300 font-light group-hover/log:text-white transition-colors">Webb Telescope alignment confirmed for deep field scan.</p>
                  </div>
                </div>
                <Link to="/facts" className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-cyan transition-colors mt-auto pt-6 text-center">
                  View Full Database →
                </Link>
              </div>
            </div>
          </section>

          {/* Satellite Tracker Callout Full Width */}
          <section className="glass-panel p-10 md:p-16 relative overflow-hidden group rounded-[2rem] hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
              <div className="space-y-6 max-w-xl">
                <div className="inline-flex items-center gap-3 bg-cyan/10 border border-cyan/20 px-4 py-2 rounded-full mb-4">
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]" />
                  <span className="text-[9px] font-black text-cyan uppercase tracking-[0.3em]">Live Connection</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white heading-font tracking-wide">Orbital Tracker</h3>
                <p className="text-gray-400 font-light text-base leading-relaxed">Monitor real-time telemetry and positional data of active orbital infrastructure, the International Space Station, and deep space probes dynamically.</p>
              </div>
              <Link to="/satellites" className="px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-black rounded-2xl hover:bg-cyan hover:scale-105 transition-all duration-300 text-center flex-shrink-0 shadow-[0_10px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(6,182,212,0.4)]">
                Access Network
              </Link>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default Home;
