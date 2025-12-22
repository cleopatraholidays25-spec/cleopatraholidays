import React from 'react';
import { useI18n } from '../hooks/useI18n';
import MoonIcon from './icons/MoonIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface DestinationCardProps {
    image: string;
    title: string;
    description: string;
    nights: number;
    onCardClick: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ image, title, description, nights, onCardClick }) => {
    const { t } = useI18n();
    
    const handleWhatsAppClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open('https://wa.me/97455540596', '_blank');
    };

    return (
        <div className="block relative rounded-lg shadow-xl overflow-hidden group aspect-[4/3] cursor-pointer">
            <div 
                onClick={onCardClick}
                className="absolute inset-0 w-full h-full"
            >
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold font-serif-en mb-2">{title}</h3>
                    <div className="flex justify-between items-center text-sm opacity-90">
                        <p className="truncate pe-2">{description}</p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <MoonIcon className="w-4 h-4" />
                            <span>{t('destinations_page.nights_duration').replace('{count}', nights.toString())}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <button 
                onClick={handleWhatsAppClick}
                className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full z-10 shadow-lg hover:bg-green-600 transition-colors"
                aria-label="Contact us on WhatsApp"
            >
                <WhatsAppIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default DestinationCard;