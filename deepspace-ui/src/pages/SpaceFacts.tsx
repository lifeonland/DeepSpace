import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SpaceFacts: React.FC = () => {
  const [facts, setFacts] = useState<string[]>([]);

  useEffect(() => {
    const fetchRealFacts = async () => {
      try {
        const fallbackFacts = [
          "A day on Venus is longer than a year on Venus.",
          "Space is completely silent; there is no atmosphere, so sound has no way to travel.",
          "There is a volcano on Mars three times the height of Mount Everest.",
          "The footprints on the Moon will stay there for 100 million years.",
          "One day on Mars is only 40 minutes longer than a day on Earth.",
          "There are more stars in the universe than grains of sand on all the beaches on Earth.",
          "Neutron stars can spin 600 times per second.",
          "The sun accounts for 99.86% of the mass in our solar system.",
          "If two pieces of the same metal touch in space, they will bond and be permanently stuck together.",
          "A full NASA space suit costs $12,000,000.",
          "One million Earths could fit inside the Sun.",
          "There is a planet made of diamonds twice the size of Earth."
        ];
        // Shuffle the array to ensure dynamic cards on every refresh
        const shuffledFacts = fallbackFacts.sort(() => 0.5 - Math.random());
        // Display all 12 facts for a robust grid layout
        setFacts(shuffledFacts);
      } catch (err) {
        console.error('Fact fetch failed', err);
      }
    };
    fetchRealFacts();
  }, []);

  return (
    <div className="relative py-24 px-12 fade-in min-h-screen">
      {/* Fixed Background Image for the entire page */}
      <div 
        className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2500)' }}
      />
      {/* Gradient overlay to ensure text remains readable */}
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-black/80 via-black/40 to-black/90 pointer-events-none" />

      <Link to="/" className="relative z-10 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 hover:text-white transition-colors mb-24 block drop-shadow-md">
        ← Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1400px] mx-auto">
        {facts.map((fact, index) => (
          <FactCard key={index} initialFact={fact} index={index} allFacts={facts} />
        ))}
      </div>
    </div>
  );
};

const FactCard: React.FC<{ initialFact: string; index: number; allFacts: string[] }> = ({ initialFact, index, allFacts }) => {
  const [fact, setFact] = useState(initialFact);
  const [rotation, setRotation] = useState(0);

  const spaceBackgrounds = [
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800',
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800',
    'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800',
    'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=800',
    'https://images.unsplash.com/photo-1614729939124-03290b8edea9?q=80&w=800',
    'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800'
  ];
  const bgImage = spaceBackgrounds[index % spaceBackgrounds.length];

  const flip = () => {
    setRotation(r => r + 360);
    setTimeout(() => {
      const randomFact = allFacts[Math.floor(Math.random() * allFacts.length)];
      setFact(randomFact);
    }, 600); // Wait until the card is roughly halfway through its spin
  };

  return (
    <div className="h-64 cursor-pointer" onClick={flip}>
      <motion.div 
        animate={{ rotateY: rotation }}
        transition={{ type: 'spring', stiffness: 35, damping: 15, mass: 1.5 }}
        className="w-full h-full relative [transform-style:preserve-3d]"
      >
        <div className="absolute inset-0 glass-panel p-8 md:p-10 flex flex-col justify-center overflow-hidden group">
          {/* Space colored gradient and Image background */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
            style={{ backgroundImage: `url(${bgImage})` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-black/40 to-cyan-900/50 mix-blend-overlay pointer-events-none" />
          
          <p className="relative z-10 text-lg md:text-xl font-medium text-white leading-relaxed italic text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{fact}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SpaceFacts;
