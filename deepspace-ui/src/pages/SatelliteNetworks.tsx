import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const allNetworks = [
  { name: 'Starlink v2 Mini', type: 'LEO Communications', status: 'Active', altitude: '530 km', velocity: '27,000 km/h', inclination: '53.0°', mass: '800 kg', desc: 'Providing high-speed, low-latency broadband internet across the globe via a massive satellite constellation.' },
  { name: 'GPS Block III', type: 'MEO Navigation', status: 'Active', altitude: '20,200 km', velocity: '14,000 km/h', inclination: '55.0°', mass: '4,400 kg', desc: 'Delivering precise positioning, navigation, and timing services to civil and military users worldwide.' },
  { name: 'James Webb (JWST)', type: 'L2 Halo Orbit Observatory', status: 'Active', altitude: '1,500,000 km', velocity: '0.2 km/s', inclination: 'N/A', mass: '6,161 kg', desc: 'The largest optical telescope in space, conducting infrared astronomy to see the universe\'s first galaxies.' },
  { name: 'Hubble (HST)', type: 'LEO Observatory', status: 'Active', altitude: '535 km', velocity: '27,300 km/h', inclination: '28.5°', mass: '11,110 kg', desc: 'A legendary space telescope that has revolutionized our understanding of astrophysics and cosmology.' },
  { name: 'GOES-19', type: 'GEO Meteorology', status: 'Testing', altitude: '35,786 km', velocity: '11,100 km/h', inclination: '0.0°', mass: '5,192 kg', desc: 'Providing critical continuous weather imagery and monitoring of meteorological events across the Americas.' },
  { name: 'ISS (Zarya)', type: 'LEO Research Station', status: 'Active', altitude: '418 km', velocity: '27,580 km/h', inclination: '51.6°', mass: '450,000 kg', desc: 'A modular space station in low Earth orbit, serving as a microgravity research laboratory.', link: '/tracker' },
  { name: 'Chandra X-ray', type: 'HEO Observatory', status: 'Active', altitude: '133,000 km', velocity: 'Varies', inclination: '28.5°', mass: '4,790 kg', desc: 'A flagship-class space telescope specially designed to detect X-ray emission from very hot regions of the Universe.' },
  { name: 'Galileo FOC', type: 'MEO Navigation', status: 'Active', altitude: '23,222 km', velocity: '13,000 km/h', inclination: '56.0°', mass: '733 kg', desc: 'Europe\'s global navigation satellite system, providing highly accurate global positioning services.' },
  { name: 'Landsat 9', type: 'LEO Earth Observation', status: 'Active', altitude: '705 km', velocity: '27,000 km/h', inclination: '98.2°', mass: '2,711 kg', desc: 'Provides continuous and vital observation of Earth\'s land surface for resource management.' },
  { name: 'Iridium NEXT', type: 'LEO Communications', status: 'Active', altitude: '780 km', velocity: '27,000 km/h', inclination: '86.4°', mass: '860 kg', desc: 'A constellation providing L-band voice and data information coverage to satellite phones and pagers globally.' },
  { name: 'Voyager 1', type: 'Interstellar Probe', status: 'Active', altitude: '24 Billion km', velocity: '61,000 km/h', inclination: 'N/A', mass: '722 kg', desc: 'The most distant human-made object, currently exploring the interstellar medium beyond the heliosphere.' },
  { name: 'Tiangong', type: 'LEO Research Station', status: 'Active', altitude: '390 km', velocity: '27,600 km/h', inclination: '41.5°', mass: '100,000 kg', desc: 'A space station operated by the China Manned Space Agency in low Earth orbit.' },
];

const SatelliteNetworks: React.FC = () => {
  const [networks, setNetworks] = useState<typeof allNetworks>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    let filtered = [...allNetworks];
    
    if (filter === 'LEO') {
      filtered = filtered.filter(n => n.type.includes('LEO'));
    } else if (filter === 'MEO') {
      filtered = filtered.filter(n => n.type.includes('MEO'));
    } else if (filter === 'GEO') {
      filtered = filtered.filter(n => n.type.includes('GEO'));
    } else if (filter === 'Deep Space') {
      filtered = filtered.filter(n => n.type.includes('HEO') || n.type.includes('L2') || n.type.includes('Interstellar'));
    }

    // Shuffle and cap at 9
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setNetworks(shuffled.slice(0, 9));
  }, [filter]);

  const filterOptions = ['All', 'LEO', 'MEO', 'GEO', 'Deep Space'];

  return (
    <div className="px-6 md:px-12 py-12 md:py-24 max-w-[1600px] mx-auto w-full fade-in min-h-screen">
      <Link to="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-colors mb-12 block drop-shadow-md">
        ← Back to Home
      </Link>
      
      <div className="mb-12 border-b border-white/[0.05] pb-8 md:pb-12">
        <h2 className="text-4xl md:text-5xl font-black tracking-widest text-white uppercase leading-none heading-font neon-text-glow">Satellite Networks</h2>
        <div className="text-[9px] md:text-[10px] font-black text-cyan uppercase tracking-[0.4em] mt-4 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">Live Orbital Infrastructure Data</div>
      </div>

      <div className="flex flex-wrap gap-4 mb-12">
        {filterOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${
              filter === opt 
                ? 'bg-cyan text-black border-cyan shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                : 'bg-white/[0.02] text-gray-400 border-white/[0.1] hover:border-cyan hover:text-cyan'
            }`}
          >
            {opt === 'All' ? 'All Orbits' : opt}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {networks.map((net, index) => (
          <SatelliteCard key={net.name} net={net} index={index} />
        ))}
      </div>
    </div>
  );
};

const SatelliteCard: React.FC<{ net: any, index: number }> = ({ net, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="group h-[380px] cursor-pointer perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, rotateY: isFlipped ? 180 : 0 }}
        transition={{ delay: index * 0.1, duration: 0.8, type: 'spring' }}
        className="w-full h-full relative [transform-style:preserve-3d]"
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 flex flex-col p-8 md:p-10 glass-panel hover:-translate-y-4 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 overflow-hidden [backface-visibility:hidden]">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/0 to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-8 border-b border-white/[0.05] pb-6">
              <div className="text-[9px] font-black text-cyan tracking-[0.3em] uppercase mb-2 drop-shadow-md">{net.type}</div>
              <h3 className="text-3xl font-black text-white italic tracking-tighter leading-none group-hover:text-cyan transition-colors duration-300">{net.name}</h3>
            </div>
            <div className="space-y-4 flex-grow">
              <DataPoint label="Status" value={net.status} highlight={net.status === 'Active'} />
              <DataPoint label="Altitude" value={net.altitude} />
              <DataPoint label="Velocity" value={net.velocity} />
              <DataPoint label="Inclination" value={net.inclination} />
              <DataPoint label="Mass" value={net.mass} />
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 flex flex-col p-8 md:p-10 glass-panel hover:-translate-y-4 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-500 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col h-full justify-center text-center">
            <h3 className="text-2xl font-black text-white italic tracking-tighter mb-6">{net.name} Mission</h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">{net.desc}</p>
            
            {net.link && (
              <div className="mt-12">
                <Link to={net.link} onClick={(e) => e.stopPropagation()} className="px-6 py-3 border border-cyan/50 text-cyan text-[10px] uppercase tracking-[0.3em] font-black hover:bg-cyan hover:text-black transition-colors duration-300">
                  View Live Feed
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const DataPoint: React.FC<{ label: string, value: string, highlight?: boolean }> = ({ label, value, highlight }) => (
  <div className="flex justify-between items-center text-[10px] font-bold border-b border-white/[0.02] pb-3">
    <span className="text-gray-500 uppercase tracking-[0.3em]">{label}</span>
    <span className={`uppercase tracking-[0.1em] text-right ${highlight ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 'text-white'}`}>
      {value}
    </span>
  </div>
);

export default SatelliteNetworks;
