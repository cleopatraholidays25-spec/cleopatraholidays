import React, { useState, useMemo, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useNavigate } from 'react-router-dom';
import MapView from '../components/map/MapView';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import {
  mapDestinations,
  MapDestination,
  Continent,
  TripType,
  BudgetRange,
  getContinents,
  getTripTypes,
  getBudgetRanges,
  tripTypeColors
} from '../data/mapDestinationsData';

// Add missing types for destination
interface Destination extends MapDestination {
  categories?: string[];
  longDescription?: string;
  included?: string[];
  notIncluded?: string[];
}

const InteractiveMapPage: React.FC = () => {
  const { t, language } = useI18n();
  const navigate = useNavigate();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'all'>('all');
  const [selectedTripTypes, setSelectedTripTypes] = useState<TripType[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [isTripTypeOpen, setIsTripTypeOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
  const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return mapDestinations.filter((dest) => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      // Continent filter
      const matchesContinent = selectedContinent === 'all' || dest.continent === selectedContinent;

      // Trip type filter
      const matchesTripType = selectedTripTypes.length === 0 || 
        selectedTripTypes.some(type => dest.tripTypes.includes(type));

      // Budget filter
      const matchesBudget = selectedBudget === 'all' || dest.budgetRange === selectedBudget;

      // Price range filter
      const matchesPrice = dest.price >= priceRange[0] && dest.price <= priceRange[1];

      return matchesSearch && matchesContinent && matchesTripType && matchesBudget && matchesPrice;
    });
  }, [searchQuery, selectedContinent, selectedTripTypes, selectedBudget, priceRange]);

  // Toggle trip type selection
  const toggleTripType = (type: TripType) => {
    setSelectedTripTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedContinent('all');
    setSelectedTripTypes([]);
    setSelectedBudget('all');
    setPriceRange([0, 50000]);
  };

  // Handle destination card click
  const handleCardClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDestination(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy py-10">
      {/* Hero Section */}
      <div className={` bg-white dark:bg-navy ${bodyFont} overflow-hidden`}>
        <div className="container mx-auto px-6">
          <div 
            className={`max-w-4xl mx-auto text-center mb-6 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className={`text-4xl md:text-5xl font-bold text-gold mb-4 ${headingFont}`}>{t('map.title')}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">{t('map.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Mobile Filter Toggle Button */}
        <button 
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="lg:hidden flex items-center justify-between w-full mb-4 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-navy dark:text-white font-medium"
        >
          <span>{t('map.filters')}</span>
          <svg 
            className={`w-5 h-5 transform transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${!isFiltersOpen ? 'hidden lg:block' : 'block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-navy dark:text-white">
                  {t('map.filters')}
                </h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-gold hover:text-navy transition-colors"
                >
                  {t('map.reset')}
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('map.search')}
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('map.search_placeholder')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Continent Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('map.continent')}
                </label>
                <select
                  value={selectedContinent}
                  onChange={(e) => setSelectedContinent(e.target.value as Continent | 'all')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">{t('map.all_continents')}</option>
                  {getContinents().map((continent) => (
                    <option key={continent} value={continent}>
                      {t(`map.continents.${continent}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trip Type Filter */}
              <div className="mb-6 relative z-10">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('map.trip_type')}
                </label>
                <button
                  onClick={() => setIsTripTypeOpen(!isTripTypeOpen)}
                  className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <span>{t('map.filter_by_type')} {selectedTripTypes.length > 0 && `(${selectedTripTypes.length})`}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isTripTypeOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isTripTypeOpen && (
                  <div className="absolute mt-1 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-20">
                    <div className="py-1 max-h-60 overflow-auto">
                      {getTripTypes().map((type) => (
                        <div
                          key={type}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                          onClick={() => toggleTripType(type)}
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded dark:border-gray-500"
                            checked={selectedTripTypes.includes(type)}
                            readOnly
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className="ml-3 flex items-center">
                            <span 
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: tripTypeColors[type] || '#6b7280' }}
                            />
                            {t(`map.trip_types.${type}`)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-600">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTripTypes([]);
                        }}
                        className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                      >
                        {t('map.clear_filters')}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Budget Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('map.budget')}
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value as BudgetRange | 'all')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-gold focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">{t('map.all_budgets')}</option>
                  {getBudgetRanges().map((budget) => (
                    <option key={budget} value={budget}>
                      {t(`map.budgets.${budget}`)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('map.price_range')}: QAR {priceRange[0].toLocaleString()} - QAR {priceRange[1].toLocaleString()}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>

              {/* Results Count */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('map.showing')} <span className="font-bold text-gold">{filteredDestinations.length}</span> {t('map.destinations')}
                </p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-4">
              {/* Mobile Filter Toggle Button Inside Map Section */}
              <button 
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="lg:hidden absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md text-navy dark:text-white"
                aria-label={t('map.filters')}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
                <div className="absolute inset-0">
                  <MapView destinations={filteredDestinations} />
                </div>
              </div>
            </div>

            {/* Destination Cards Grid */}
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredDestinations.map((destination) => (
                  <div 
                    key={destination.id}
                    onClick={() => handleCardClick(destination)}
                    className="cursor-pointer transition-transform duration-300 hover:scale-105"
                  >
                    <DestinationCard
                      image={destination.image}
                      title={destination.name}
                      description={destination.shortDescription}
                      price={destination.price}
                      nights={destination.nights}
                      tripTypes={destination.tripTypes}
                      tripTypeColors={tripTypeColors}
                      t={t}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  {t('map.no_results')}
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-gold hover:bg-navy text-navy hover:text-white px-6 py-2 rounded-md transition-colors duration-300 font-semibold"
                >
                  {t('map.reset_filters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <DestinationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        destination={selectedDestination}
      />
    </div>
  );
};

export default InteractiveMapPage;
