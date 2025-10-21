import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import { MapDestination, tripTypeColors } from '../../data/mapDestinationsData';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';

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

  const handleViewMore = () => {
    navigate(`/destinations#${destination.slug}`);
  };

  return (
    <Marker position={destination.coordinates} icon={customIcon}>
      <Popup className="destination-popup" maxWidth={300}>
        <div className="p-2">
          {/* Image */}
          <div className="relative h-40 mb-3 rounded-lg overflow-hidden">
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
          <h3 className="text-lg font-bold text-navy mb-1">{destination.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{destination.country}</p>
          
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {destination.shortDescription}
          </p>

          {/* Trip Types */}
          <div className="flex flex-wrap gap-1 mb-3">
            {destination.tripTypes.slice(0, 3).map((type) => (
              <span
                key={type}
                className="text-xs px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: tripTypeColors[type] }}
              >
                {t(`map.trip_types.${type}`)}
              </span>
            ))}
          </div>

          {/* Highlights */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">{t('map.highlights')}:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              {destination.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gold mr-1">✓</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
            <span>🌙 {destination.nights} {t('map.nights')}</span>
            <span className="capitalize">{destination.budgetRange.replace('_', ' ')}</span>
          </div>

          {/* View More Button */}
          <button
            onClick={handleViewMore}
            className="w-full bg-navy hover:bg-gold text-white hover:text-navy py-2 px-4 rounded-md transition-colors duration-300 text-sm font-semibold"
          >
            {t('map.view_more')}
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default DestinationMarker;
