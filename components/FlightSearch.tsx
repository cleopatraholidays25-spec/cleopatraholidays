import React, { useState } from 'react';
import { useI18n } from '../hooks/useI18n';

const FlightSearch: React.FC = () => {
  const { t } = useI18n();
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabinClass, setCabinClass] = useState('economy');
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);

  const incrementPassenger = (type: 'adults' | 'children' | 'infants') => {
    setPassengers(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  const decrementPassenger = (type: 'adults' | 'children' | 'infants') => {
    if (passengers[type] > (type === 'adults' ? 1 : 0)) {
      setPassengers(prev => ({
        ...prev,
        [type]: prev[type] - 1
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Searching flights...');
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 -mt-16 relative z-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex space-x-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${tripType === 'round' ? 'bg-gold text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
              onClick={() => setTripType('round')}
            >
              {t('flight_search.round_trip')}
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${tripType === 'oneway' ? 'bg-gold text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
              onClick={() => setTripType('oneway')}
            >
              {t('flight_search.one_way')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('flight_search.from')}
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md pl-12 dark:bg-gray-700 dark:text-white"
                placeholder={t('flight_search.origin_placeholder')}
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('flight_search.to')}
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md pl-12 dark:bg-gray-700 dark:text-white"
              placeholder={t('flight_search.destination_placeholder')}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('flight_search.departure')}
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md pl-12 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {tripType === 'round' && (
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('flight_search.return')}
              </label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md pl-12 dark:bg-gray-700 dark:text-white"
                required={tripType === 'round'}
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('flight_search.passengers')}
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-left pl-12 dark:bg-gray-700 dark:text-white flex justify-between items-center"
              >
                <span>{passengers.adults + passengers.children + passengers.infants} {t('flight_search.passenger', { count: passengers.adults + passengers.children + passengers.infants })}</span>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isPassengerDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="font-medium">{t('flight_search.adults')}</div>
                      <div className="text-sm text-gray-500">12+ {t('flight_search.years')}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => decrementPassenger('adults')}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span>{passengers.adults}</span>
                      <button
                        type="button"
                        onClick={() => incrementPassenger('adults')}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="font-medium">{t('flight_search.children')}</div>
                      <div className="text-sm text-gray-500">2-11 {t('flight_search.years')}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => decrementPassenger('children')}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span>{passengers.children}</span>
                      <button
                        type="button"
                        onClick={() => incrementPassenger('children')}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{t('flight_search.infants')}</div>
                      <div className="text-sm text-gray-500">0-23 {t('flight_search.months')}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => decrementPassenger('infants')}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span>{passengers.infants}</span>
                      <button
                        type="button"
                        onClick={() => incrementPassenger('infants')}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('flight_search.cabin_class')}
            </label>
            <select
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md pl-4 pr-10 appearance-none bg-white dark:bg-gray-700 dark:text-white"
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
            >
              <option value="economy">{t('flight_search.economy')}</option>
              <option value="premium_economy">{t('flight_search.premium_economy')}</option>
              <option value="business">{t('flight_search.business')}</option>
              <option value="first">{t('flight_search.first_class')}</option>
            </select>
            <div className="absolute right-3 top-10 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold-dark text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
            >
              {t('flight_search.search_flights')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;
