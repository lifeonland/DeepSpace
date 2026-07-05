import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Radio } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { api } from '../services/api';

const ISSIcon = L.divIcon({
  html: '<div style="background-color: #22d3ee; width: 16px; height: 16px; border-radius: 50%; box-shadow: 0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.4); border: 2px solid white;"></div>',
  className: 'iss-marker',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

// Component to handle map panning when ISS moves
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { animate: true, duration: 1.5 });
  }, [center, map]);
  return null;
};

const SatelliteTracker: React.FC = () => {
  const [issPos, setIssPos] = useState<[number, number]>([0, 0]);
  const [issData, setIssData] = useState<any>(null);
  
  const fetchISS = useCallback(async () => {
    try {
      const data = await api.getISSPosition();
      setIssPos([data.latitude, data.longitude]);
      setIssData(data);
    } catch (err) {
      console.error('Error fetching ISS:', err);
    }
  }, []);

  useEffect(() => {
    fetchISS();
    const interval = setInterval(fetchISS, 3000);
    return () => clearInterval(interval);
  }, [fetchISS]);

  return (
    <div className="px-6 md:px-12 py-10 md:py-20 max-w-[1600px] mx-auto w-full fade-in min-h-screen">
      <Link to="/" className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-colors mb-12 block">
        ← Back to Home
      </Link>
      
      <div className="mb-24">
        <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none font-serif">ISS Live Feed</h2>
        <div className="flex items-center gap-3 text-cyan font-mono text-[9px] uppercase tracking-[0.3em] mt-4">
          <Radio size={10} className="animate-pulse" />
          Active Satellite Link
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-12 min-h-[400px] lg:min-h-[600px] relative z-10">
        <div className="lg:col-span-3 h-[400px] lg:h-[600px] rounded-3xl border border-white/[0.1] overflow-hidden shadow-neon-cyan">
          <MapContainer center={issPos} zoom={4} className="h-full w-full">
            <TileLayer
              attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            {issPos[0] !== 0 && <Marker position={issPos} icon={ISSIcon} />}
            <MapUpdater center={issPos} />
          </MapContainer>
        </div>
        
        <div className="space-y-6 flex flex-col justify-center">
          <TelemetryMetric label="Latitude" value={`${issPos[0].toFixed(4)}°`} />
          <TelemetryMetric label="Longitude" value={`${issPos[1].toFixed(4)}°`} />
          <TelemetryMetric label="Velocity" value={`${Math.round(issData?.velocity || 0).toLocaleString()} km/h`} />
          <TelemetryMetric label="Altitude" value={`${issData?.altitude?.toFixed(2)} km`} />
        </div>
      </div>
    </div>
  );
};

const TelemetryMetric: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="glass-panel p-6 flex flex-col justify-center">
    <div className="text-[9px] font-black text-cyan uppercase tracking-[0.3em] drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] mb-2">{label}</div>
    <div className="text-3xl font-black text-white tabular-nums tracking-tighter italic drop-shadow-md">{value}</div>
  </div>
);

export default SatelliteTracker;
