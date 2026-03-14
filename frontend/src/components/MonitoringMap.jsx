import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const stations = [
  { id: 1, name: 'Pandri Air Quality Station', lat: 21.252, lng: 81.629, aqi: 142, type: 'Air' },
  { id: 2, name: 'Tatibandh Industrial Monitoring', lat: 21.245, lng: 81.579, aqi: 185, type: 'Air' },
  { id: 3, name: 'Kharun River Water Station', lat: 21.215, lng: 81.565, aqi: 6.5, type: 'Water' }, // pH/DO
  { id: 4, name: 'Raipur Railway Station Noise', lat: 21.258, lng: 81.637, aqi: 72, type: 'Noise' }, // dB
];

const MonitoringMap = () => {
  const raipurCenter = [21.2514, 81.6296];

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden glass-morphism border border-white/10 z-0">
      <MapContainer center={raipurCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {stations.map(station => (
          <Marker key={station.id} position={[station.lat, station.lng]}>
            <Popup className="custom-popup">
              <div className="p-2">
                <h3 className="font-bold text-sm">{station.name}</h3>
                <p className="text-xs text-slate-500 mt-1">Type: {station.type}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${station.aqi > 150 ? 'bg-rose-500' : 'bg-amber-500'}`}></div>
                  <span className="font-bold">{station.aqi} {station.type === 'Noise' ? 'dB' : station.type === 'Water' ? 'pH' : 'AQI'}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MonitoringMap;
