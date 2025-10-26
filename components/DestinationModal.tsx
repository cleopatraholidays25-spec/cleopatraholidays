import React from 'react';
import { useI18n } from '../hooks/useI18n';
import Modal from './Modal';
import { destinationsData } from '../data/destinationsData';
import CheckIcon from './icons/CheckIcon';
import PhoneIcon from './icons/PhoneIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

export interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: {
    slug: string;
    [key: string]: any; // For any additional properties
  } | null;
}

const DestinationModal: React.FC<DestinationModalProps> = ({ isOpen, onClose, destination }) => {
  const { t } = useI18n();

  // Find the full destination data from destinationsData
  const fullDestination = React.useMemo(() => {
    if (!destination) return null;
    return destinationsData.find(d => d.slug === destination.slug) || destination;
  }, [destination]);

  if (!fullDestination) return null;

  // Get included items, defaulting to an empty array if not found
  const includedItems = fullDestination.included || [];
  const galleryImages = fullDestination.galleryImages || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('modal.inquire_title')}
    >
      <div>
        <div className="max-h-[60vh] overflow-y-auto pr-4 -mr-4 custom-scrollbar">
          <img 
            src={fullDestination.image} 
            alt={t(`destinations_page.${fullDestination.slug}.title`)} 
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">
            {t(`destinations_page.${fullDestination.slug}.title`)}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t(`destinations_page.${fullDestination.slug}.long_description`)}
          </p>

          {includedItems.length > 0 && (
            <>
              <h3 className="text-lg font-bold text-navy dark:text-white mb-3">
                {t('destinations_page.whats_included')}
              </h3>
              <ul className="space-y-2 mb-6">
                {includedItems.map((item: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                    <CheckIcon className="w-5 h-5 text-green-500 me-3 rtl:ms-3 flex-shrink-0" />
                    <span>{t(`destinations_page.included_items.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          
          {galleryImages.length > 0 && (
            <>
              <h3 className="text-lg font-bold text-navy dark:text-white mb-3">
                {t('destinations_page.gallery_title')}
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {galleryImages.map((img: string, index: number) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt={`${t(`destinations_page.${fullDestination.slug}.title`)} gallery ${index+1}`} 
                    className="w-full h-24 object-cover rounded-md"
                    loading="lazy"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('modal.price')}</p>
              <p className="text-3xl font-bold text-gold">
                {fullDestination.price 
                  ? `QAR ${fullDestination.price.toLocaleString()}` 
                  : t('modal.contact_for_price')
                }
              </p>
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
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center w-full px-4 py-2 bg-green-500 text-white font-bold rounded-md shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg text-sm"
              >
                <WhatsAppIcon className="w-4 h-4 me-2" />
                {t('modal.whatsapp_us')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DestinationModal;
