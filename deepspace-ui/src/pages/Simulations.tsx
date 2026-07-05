import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface Simulation {
  id: number;
  name: string;
  description: string;
  simulationType: string;
  status: string;
  createdAt: string;
}

const Simulations: React.FC = () => {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSimulations();
  }, []);

  const fetchSimulations = async () => {
    try {
      setLoading(true);
      const data = await api.getSimulations();
      setSimulations(data);
    } catch (err) {
      console.error('Failed to load simulations', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-slate-800" size={32} />
    </div>
  );

  return (
    <div className="px-12 py-20 max-w-[1600px] mx-auto w-full fade-in font-sans">
      <Link to="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-colors mb-12 block">
        ← Back to Home
      </Link>
      <div className="flex justify-between items-end mb-24 border-b border-white/[0.03] pb-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">Missions</h2>
          <div className="flex items-center gap-3 text-slate-600 font-mono text-[9px] uppercase tracking-[0.3em]">
            Sector Command Pathfinding Protocols
          </div>
        </div>
        <button className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white transition-colors cursor-pointer">
          New Protocol
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
          {simulations.length === 0 ? (
            <div className="p-20 text-center border border-dashed border-white/[0.03] rounded-xl">
              <p className="text-[10px] text-slate-700 uppercase tracking-[0.5em]">No active protocols in local buffer</p>
            </div>
          ) : (
            simulations.map((sim) => (
              <div key={sim.id} className="flex flex-col md:flex-row justify-between items-start md:items-center py-8 border-b border-white/[0.03] group hover:border-white/[0.08] transition-colors">
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <h3 className="text-xl font-bold text-white/90 italic tracking-tight uppercase">{sim.name}</h3>
                    <span className={`text-[8px] font-black tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity`}>
                      {sim.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed max-w-xl italic">"{sim.description}"</p>
                  <div className="flex items-center gap-8 text-[9px] font-mono text-slate-700 uppercase tracking-[0.2em]">
                    <span>Type: {sim.simulationType}</span>
                    <span>Buffer: {new Date(sim.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-12 mt-8 md:mt-0">
                  <button className="text-[9px] font-black text-slate-600 hover:text-white transition-colors uppercase tracking-[0.3em] cursor-pointer">
                    Sync
                  </button>
                  <button className="text-[9px] font-black text-slate-600 hover:text-red-500 transition-colors uppercase tracking-[0.3em] cursor-pointer">
                    Purge
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-16">
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em]">Core Status</h3>
            <div className="space-y-6">
              <StatusRow label="Link" value="Nominal" />
              <StatusRow label="Sync" value="14ms" />
              <StatusRow label="Buffer" value="98.2%" />
            </div>
          </div>

          <div className="space-y-6 pt-12 border-t border-white/[0.03]">
            <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em]">System Log</h3>
            <div className="space-y-4 font-mono text-[9px] text-slate-700 uppercase tracking-tighter leading-relaxed">
              <p>[09:14] Solar flare mitigation active.</p>
              <p>[10:02] ISS telemetry handshake verified.</p>
              <p>[11:45] Neural patterns successfully mapped.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-[10px] font-mono">
    <span className="text-slate-600 uppercase tracking-widest">{label}</span>
    <span className="text-white font-black uppercase tracking-tighter">{value}</span>
  </div>
);

export default Simulations;
