import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useInView } from 'react-intersection-observer';
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
  const mapRef = useRef<any>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [allTripTypes, setAllTripTypes] = useState<string[]>([]);

  // Get all unique trip types from destinations
  useEffect(() => {
    const types = new Set<string>();
    destinations.forEach(dest => {
      dest.tripTypes?.forEach(type => types.add(type));
    });
    setAllTripTypes(Array.from(types));
  }, [destinations]);

  // Filter destinations based on selected trip types
  const filteredDestinations = selectedTypes.length > 0
    ? destinations.filter(dest => 
        dest.tripTypes?.some(type => selectedTypes.includes(type))
      )
    : destinations;

  // Function to fit bounds to show all visible destinations
  const fitMapToDestinations = (map: any, dests: MapDestination[] = filteredDestinations) => {
    if (dests.length > 0) {
      const bounds = dests.map(dest => dest.coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  // Update map when filtered destinations change
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
      fitMapToDestinations(mapRef.current);
    }
  }, [selectedTypes]);

  // Handle initial load and resize
  useEffect(() => {
    if (inView && mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current?.invalidateSize();
        if (filteredDestinations.length > 0) {
          fitMapToDestinations(mapRef.current);
        }
      }, 100);
      
      const handleResize = () => {
        mapRef.current?.invalidateSize();
      };
      
      window.addEventListener('resize', handleResize);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [inView, filteredDestinations]);

  // Maintain 16:9 aspect ratio
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg z-0">
      {/* Filter Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
      </div>

      {/* Map container with 16:9 aspect ratio */}
      <div 
        ref={containerRef}
        className="relative w-full"
        style={{ 
          paddingBottom: '56.25%' /* 16:9 Aspect Ratio */
        }}
      >
        <div className="absolute inset-0">
          <MapContainer
            ref={mapRef}
            center={center}
            zoom={zoom}
            className="w-full h-full relative z-0"
            zoomControl={true}
            scrollWheelZoom={true}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            whenCreated={(map) => {
              mapRef.current = map;
              setTimeout(() => {
                map.invalidateSize();
                if (filteredDestinations.length > 0) {
                  fitMapToDestinations(map);
                }
              }, 0);
            }}
          >
            <style jsx global>{`
              .leaflet-container {
                background: #f8f9fa;
                z-index: 0 !important;
                transition: none !important;
              }
              .leaflet-top, .leaflet-bottom {
                z-index: 0 !important;
              }
              .leaflet-tile {
                will-change: auto !important;
              }
              .city-marker {
                background: #1e40af;
                border-radius: 50%;
                width: 12px !important;
                height: 12px !important;
                margin: -6px 0 0 -6px !important;
                position: relative;
                transition: all 0.2s ease;
              }
              .city-marker::after {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(30, 64, 175, 0.3);
                border-radius: 50%;
                top: -4px;
                left: -4px;
                animation: pulse 2s infinite;
              }
              @keyframes pulse {
                0% { transform: scale(0.8); opacity: 0.7; }
                70% { transform: scale(1.3); opacity: 0; }
                100% { transform: scale(0.8); opacity: 0; }
              }
            `}</style>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MapUpdater center={center} zoom={zoom} />

            {filteredDestinations.map((destination) => (
              <DestinationMarker 
                key={destination.id} 
                destination={destination}
                className="city-marker"
              />
            ))}
          </MapContainer>
        </div>
      </div>
      {/* Custom CSS for markers */}
      <style jsx global>{`
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
