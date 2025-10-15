import React from 'react';
import { useI18n } from '../hooks/useI18n';
import MoonIcon from './icons/MoonIcon';

interface DestinationCardProps {
    image: string;
    title: string;
    description: string;
    price: number;
    nights: number;
    onCardClick: () => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ image, title, description, price, nights, onCardClick }) => {
    const { t } = useI18n();
    return (
        <div onClick={onCardClick} className="block relative rounded-lg shadow-xl overflow-hidden group aspect-[4/3] cursor-pointer">
            <img 
                src={image} 
                alt={title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
             <div className="absolute top-0 end-0 bg-gold text-navy font-bold py-1 px-4 m-3 rounded-full z-10 text-sm shadow-lg">
                <span>{t('destinations_page.starting_from')} QAR {price.toLocaleString()}</span>
            </div>
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
    );
};

export default DestinationCard;