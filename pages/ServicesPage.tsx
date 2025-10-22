import React from 'react';
import { useI18n } from '../hooks/useI18n';
import ServiceCard from '../components/ServiceCard';
import AirplaneIcon from '../components/icons/AirplaneIcon';
import HotelIcon from '../components/icons/HotelIcon';
import InsuranceIcon from '../components/icons/InsuranceIcon';
import LicenseIcon from '../components/icons/LicenseIcon';
import CarIcon from '../components/icons/CarIcon';
import TransferIcon from '../components/icons/TransferIcon';
import VisaIcon from '../components/icons/VisaIcon';

interface ServiceData {
    icon: React.ReactElement;
    stats: string;
}

const serviceData: { [key: string]: ServiceData } = {
    flights: {
        icon: <AirplaneIcon />,
        stats: '50,000+ Flights Monthly'
    },
    hotels: {
        icon: <HotelIcon />,
        stats: '500+ Hotels Worldwide'
    },
     visa: {
        icon: <VisaIcon />,
        stats: '50+ Countries'
    },
    travel_insurance: {
        icon: <InsuranceIcon />,
        stats: '24/7 Emergency Support'
    },
    driving_license: {
        icon: <LicenseIcon />,
        stats: 'Fast Processing'
    },
    car_rental: {
        icon: <CarIcon />,
        stats: '100+ Car Models'
    },
    transfers: {
        icon: <TransferIcon />,
        stats: 'Global Coverage'
    }
   
};

const ServicesPage: React.FC = () => {
    const { t, language } = useI18n();
    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

    const serviceKeys = Object.keys(serviceData);

    return (
        <div className={`py-12 bg-white dark:bg-navy ${bodyFont}`}>
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className={`text-4xl md:text-5xl font-bold text-gold mb-4 ${headingFont}`}>
                        {t('services.title')}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12">
                        {t('services.teaser')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceKeys.map((key, index) => {
                        const service = serviceData[key];
                        const isSingleCard = serviceKeys.length % 3 === 1 && index === serviceKeys.length - 1;
                        return (
                            <div 
                                key={key}
                                className={isSingleCard ? "sm:col-start-2 lg:col-start-2" : ""}
                            >
                                <ServiceCard
                                    icon={service.icon}
                                    title={t(`services.${key}.title`)}
                                    description={t(`services.${key}.desc`)}
                                    stats={t(`services.${key}.stats`, { defaultValue: service.stats })}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
