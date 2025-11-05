import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L, { DivIcon } from 'leaflet';
import { useI18n } from '../../hooks/useI18n';
import { MapDestination } from '../../data/mapDestinationsData';
import { useNavigate } from 'react-router-dom';
import DestinationModal from '../DestinationModal';

// Define trip type colors
const tripTypeColors: Record<string, string> = {
  beach: '#FFC107',
  adventure: '#4CAF50',
  cultural: '#9C27B0',
  luxury: '#2196F3',
  family: '#FF5722',
  default: '#607D8B'
};

interface DestinationMarkerProps {
  destination: MapDestination;
}

const DestinationMarker: React.FC<DestinationMarkerProps> = ({ destination }) => {
  const navigate = useNavigate();
  const { t } = useI18n();

  // Create custom marker icon based on trip type
  const primaryTripType = destination.tripTypes[0];
  const markerColor = tripTypeColors[primaryTripType];

  const customIcon = new DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${markerColor};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 16px;
          font-weight: bold;
        ">📍</div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Marker position={destination.coordinates} icon={customIcon}>
      <Popup className="destination-popup" maxWidth={320}>
        <div className="p-3 w-80" style={{ height: '240px' }}>
          {/* Image */}
          <div className="relative h-32 mb-3 rounded-lg overflow-hidden shadow-md">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-gold text-navy px-2 py-1 rounded-md text-xs font-bold">
              ${destination.price.toLocaleString()}
            </div>
          </div>

          {/* Content */}
          <div className="mb-2 overflow-y-auto" style={{ maxHeight: 'calc(240px - 11rem)' }}>
            <div className="flex justify-between items-start gap-2 mb-1">
              <div>
                <h3 className="text-lg font-bold text-navy mb-0.5">{destination.name}</h3>
                <p className="text-sm text-gray-600">{destination.country}</p>
              </div>
              <div className="bg-gold text-navy px-2 py-1 rounded-md text-sm font-bold whitespace-nowrap">
                ${destination.price.toLocaleString()}
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mt-2 mb-3 line-clamp-2">
              {destination.shortDescription}
            </p>

            {/* Trip Types */}
            <div className="flex flex-wrap gap-2 mb-3">
              {destination.tripTypes.slice(0, 3).map((type) => (
                <span
                  key={type}
                  className="text-xs px-3 py-1 rounded-full text-white font-medium"
                  style={{ 
                    backgroundColor: tripTypeColors[type],
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                >
                  {t(`map.trip_types.${type}`)}
                </span>
              ))}
            </div>

            {/* Highlights */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                {t('map.highlights')}:
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                {destination.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold mr-2 mt-0.5">•</span>
                    <span className="flex-1">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
            <span>🌙 {destination.nights} {t('map.nights')}</span>
            <span className="capitalize">{destination.budgetRange.replace('_', ' ')}</span>
          </div>

          {/* View More Button */}
          <button
            onClick={handleViewMore}
            className="w-full bg-gold hover:bg-opacity-90 text-navy font-semibold py-2.5 px-4 rounded-md transition-all duration-200 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            {t('map.view_more')} →
          </button>
        </div>
      </Popup>

      {/* Destination Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg text-navy dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <DestinationModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              destination={{
                ...destination,
                // Ensure all required fields are present
                categories: destination.tripTypes || [],
                included: [],
                galleryImages: [destination.image],
                price: 0,
                nights: destination.nights || 7
              }}
            />
          </div>
        </div>
      )}
    </Marker>
  );
};

export default DestinationMarker;
