import React, { useState, useMemo } from 'react';
import { useI18n } from '../hooks/useI18n';
import MapView from '../components/map/MapView';
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

const InteractiveMapPage: React.FC = () => {
  const { t } = useI18n();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<Continent | 'all'>('all');
  const [selectedTripTypes, setSelectedTripTypes] = useState<TripType[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | 'all'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-navy to-blue-900 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif-en">
            {t('map.title')}
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            {t('map.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-6">
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
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {t('map.trip_type')}
                </label>
                <div className="space-y-2">
                  {getTripTypes().map((type) => (
                    <label
                      key={type}
                      className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTripTypes.includes(type)}
                        onChange={() => toggleTripType(type)}
                        className="mr-2"
                      />
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: tripTypeColors[type] }}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {t(`map.trip_types.${type}`)}
                      </span>
                    </label>
                  ))}
                </div>
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
                  {t('map.price_range')}: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
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
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <div className="h-[600px] md:h-[700px]">
                <MapView destinations={filteredDestinations} />
              </div>
            </div>

            {/* Destination Cards Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-gold text-navy px-3 py-1 rounded-md font-bold">
                      ${destination.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-navy dark:text-white mb-1">
                      {destination.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {destination.country}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {destination.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {destination.tripTypes.map((type) => (
                        <span
                          key={type}
                          className="text-xs px-2 py-1 rounded-full text-white"
                          style={{ backgroundColor: tripTypeColors[type] }}
                        >
                          {t(`map.trip_types.${type}`)}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>🌙 {destination.nights} {t('map.nights')}</span>
                      <span className="capitalize">{destination.budgetRange.replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredDestinations.length === 0 && (
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
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
    </div>
  );
};

export default InteractiveMapPage;
