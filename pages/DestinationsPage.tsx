
import React, { useState, useMemo, useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';
import { destinationsData, Category, Destination } from '../data/destinationsData';
import DestinationCard from '../components/DestinationCard';
import Modal from '../components/Modal';
import CheckIcon from '../components/icons/CheckIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';

type FilterCategory = 'all' | Category;

const DestinationsPage: React.FC = () => {
    const { t, language } = useI18n();
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
    const [priceFilter, setPriceFilter] = useState<string>('any');
    const [nightsFilter, setNightsFilter] = useState<string>('any');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

    useEffect(() => {
        // Trigger animations shortly after the component mounts
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);
    
    const handleCardClick = (destination: Destination) => {
        setSelectedDestination(destination);
        setIsModalOpen(true);
    };

    const categories: FilterCategory[] = ['all', 'relaxation', 'adventure', 'cultural'];
    const priceRanges = ['any', 'under_15k', '15k_to_25k', 'over_25k'];
    const nightsRanges = ['any', 'short', 'medium', 'long'];

    const filteredDestinations = useMemo(() => {
        return destinationsData.filter(dest => {
            // Category filter
            if (activeFilter !== 'all' && !dest.categories.includes(activeFilter)) {
                return false;
            }

            // Price filter
            switch (priceFilter) {
                case 'under_15k':
                    if (dest.price >= 15000) return false;
                    break;
                case '15k_to_25k':
                    if (dest.price < 15000 || dest.price > 25000) return false;
                    break;
                case 'over_25k':
                    if (dest.price <= 25000) return false;
                    break;
                default: // 'any'
                    break;
            }

            // Nights filter
            switch (nightsFilter) {
                case 'short':
                    if (dest.nights < 5 || dest.nights > 7) return false;
                    break;
                case 'medium':
                    if (dest.nights < 8 || dest.nights > 12) return false;
                    break;
                case 'long':
                    if (dest.nights < 13) return false;
                    break;
                default: // 'any'
                    break;
            }
            
            return true;
        });
    }, [activeFilter, priceFilter, nightsFilter]);
    
    return (
        <>
            <div className={`py-12 bg-white dark:bg-navy ${bodyFont} overflow-hidden`}>
                <div className="container mx-auto px-6">
                    <div 
                        className={`max-w-4xl mx-auto text-center mb-6 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        <h1 className={`text-4xl md:text-5xl font-bold text-gold mb-4 ${headingFont}`}>{t('destinations_page.title')}</h1>
                        <p className="text-lg text-gray-700 dark:text-gray-300">{t('destinations_page.subtitle')}</p>
                    </div>

                    <div
                        className={`flex flex-col md:flex-row justify-center items-center flex-wrap gap-4 md:gap-6 mb-12 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '150ms' }}
                    >
                        <div className="flex justify-center flex-wrap gap-2 md:gap-4">
                            {categories.map(category => (
                                <button 
                                    key={category}
                                    onClick={() => setActiveFilter(category)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                                        activeFilter === category 
                                        ? 'bg-gold text-navy shadow-md' 
                                        : 'bg-transparent text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    {t(`destinations_page.categories.${category}`)}
                                </button>
                            ))}
                        </div>
                        
                        <div className="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-600"></div>

                        <div className="flex flex-col sm:flex-row gap-4">
                             <div>
                                <label htmlFor="price-filter" className="sr-only">{t('destinations_page.filter_by_price')}</label>
                                <select 
                                    id="price-filter" 
                                    value={priceFilter} 
                                    onChange={(e) => setPriceFilter(e.target.value)}
                                    className="px-4 py-2 w-full sm:w-auto rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-navy dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gold focus:border-gold transition"
                                >
                                    {priceRanges.map(range => (
                                        <option key={range} value={range}>{t(`destinations_page.price_ranges.${range}`)}</option>
                                    ))}
                                </select>
                             </div>
                              <div>
                                <label htmlFor="nights-filter" className="sr-only">{t('destinations_page.filter_by_nights')}</label>
                                <select 
                                    id="nights-filter" 
                                    value={nightsFilter} 
                                    onChange={(e) => setNightsFilter(e.target.value)}
                                    className="px-4 py-2 w-full sm:w-auto rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-navy dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-gold focus:border-gold transition"
                                >
                                     {nightsRanges.map(range => (
                                        <option key={range} value={range}>{t(`destinations_page.nights_ranges.${range}`)}</option>
                                    ))}
                                </select>
                             </div>
                        </div>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDestinations.map((dest, index) => (
                             <div
                                key={dest.slug}
                                className={`transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${300 + (index % 9) * 100}ms` }}
                            >
                                <DestinationCard
                                    image={dest.image}
                                    title={t(`destinations_page.${dest.slug}.title`)}
                                    description={t(`destinations_page.${dest.slug}.description`)}
                                    price={dest.price}
                                    nights={dest.nights}
                                    onCardClick={() => handleCardClick(dest)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedDestination ? t(`modal.inquire_title`) : ''}
            >
                {selectedDestination && (
                    <div>
                        <div className="max-h-[60vh] overflow-y-auto pr-4 -mr-4 custom-scrollbar">
                             <img src={selectedDestination.image} alt={t(`destinations_page.${selectedDestination.slug}.title`)} className="w-full h-48 object-cover rounded-md mb-4"/>
                            <h3 className={`text-2xl font-bold text-navy dark:text-white mb-2 ${headingFont}`}>{t(`destinations_page.${selectedDestination.slug}.title`)}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {t(`destinations_page.${selectedDestination.slug}.long_description`)}
                            </p>

                            <h3 className="text-lg font-bold text-navy dark:text-white mb-3">{t('destinations_page.whats_included')}</h3>
                            <ul className="space-y-2 mb-6">
                                {selectedDestination.included.map((itemKey, index) => (
                                     <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                                         <CheckIcon className="w-5 h-5 text-green-500 me-3 rtl:ms-3 flex-shrink-0" />
                                         <span>{t(`destinations_page.included_items.${itemKey}`)}</span>
                                     </li>
                                 ))}
                            </ul>
                            
                            <h3 className="text-lg font-bold text-navy dark:text-white mb-3">{t('destinations_page.gallery_title')}</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {selectedDestination.galleryImages.map((img, index) => (
                                    <img key={index} src={img} alt={`${t(`destinations_page.${selectedDestination.slug}.title`)} gallery ${index+1}`} className="w-full h-24 object-cover rounded-md"/>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                 <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('modal.price')}</p>
                                    <p className="text-3xl font-bold text-gold">QAR {selectedDestination.price.toLocaleString()}</p>
                                </div>
                                 <div className="flex flex-col space-y-2">
                                     <a 
                                        href="tel:+97455540596" 
                                        className="flex items-center justify-center w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-navy dark:text-white font-bold rounded-md shadow-md transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-lg text-sm"
                                    >
                                        <PhoneIcon className="w-4 h-4 me-2" />
                                        {t('modal.call_us')}
                                    </a>
                                    <a 
                                        href="https://wa.me/97455540596" 
                                        target="_blank" rel="noopener noreferrer" 
                                        className="flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white font-bold rounded-md shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg text-sm"
                                    >
                                        <WhatsAppIcon className="w-4 h-4 me-2" />
                                        {t('modal.whatsapp_us')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default DestinationsPage;
