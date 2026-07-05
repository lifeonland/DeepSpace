import React from 'react';
import { motion } from 'framer-motion';

const Debris: React.FC = () => {
  const debrisItems = [
    { name: 'Apophis', type: 'Near-Earth Asteroid', size: '370m', velocity: '12.6 km/s' },
    { name: 'Bennu', type: 'Carbonaceous Asteroid', size: '490m', velocity: '10.1 km/s' },
    { name: '2024 MK', type: 'Potentially Hazardous', size: '150m', velocity: '9.2 km/s' },
    { name: 'Phaethon', type: 'Apollo Asteroid', size: '5.1 km', velocity: '35.4 km/s' },
  ];

  return (
    <div className="px-12 py-24 max-w-[1400px] mx-auto w-full fade-in">
      <div className="space-y-4 mb-24 border-b border-white/[0.05] pb-12">
        <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase">Cosmic Debris</h2>
        <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Monitoring Near-Earth Objects</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {debrisItems.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/[0.03] p-8 rounded-2xl border border-white/[0.05] hover:border-white/20 transition-all"
          >
            <h3 className="text-xl font-bold mb-4">{item.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-400">
              <p>Type: <span className="text-white">{item.type}</span></p>
              <p>Size: <span className="text-white">{item.size}</span></p>
              <p>Velocity: <span className="text-white">{item.velocity}</span></p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Debris;
