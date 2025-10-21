import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { MapDestination } from '../../data/mapDestinationsData';
import DestinationMarker from './DestinationMarker';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  destinations: MapDestination[];
  center?: [number, number];
  zoom?: number;
}

// Component to handle map updates
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1
    });
  }, [center, zoom, map]);

  return null;
};

const MapView: React.FC<MapViewProps> = ({ 
  destinations, 
  center = [20, 0], 
  zoom = 2 
}) => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={center} zoom={zoom} />

        {destinations.map((destination) => (
          <DestinationMarker key={destination.id} destination={destination} />
        ))}
      </MapContainer>

      {/* Custom CSS for markers */}
      <style>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        
        .destination-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .destination-popup .leaflet-popup-content {
          margin: 0;
          width: 100% !important;
        }
        
        .destination-popup .leaflet-popup-tip {
          background: white;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MapView;
