import React from 'react';
import { useI18n } from '../hooks/useI18n';
import ServiceCard from '../components/ServiceCard';
import AirplaneIcon from '../components/icons/AirplaneIcon';
import HotelIcon from '../components/icons/HotelIcon';
import InsuranceIcon from '../components/icons/InsuranceIcon';
import LicenseIcon from '../components/icons/LicenseIcon';
import CarIcon from '../components/icons/CarIcon';
import TransferIcon from '../components/icons/TransferIcon';

const serviceIcons: { [key: string]: React.ReactElement } = {
    flights: <AirplaneIcon />,
    hotels: <HotelIcon />,
    travel_insurance: <InsuranceIcon />,
    driving_license: <LicenseIcon />,
    car_rental: <CarIcon />,
    transfers: <TransferIcon />,
};

const ServicesPage: React.FC = () => {
    const { t, language } = useI18n();
    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

    const serviceKeys = Object.keys(serviceIcons);

    return (
        <div className={`py-12 bg-white dark:bg-navy ${bodyFont}`}>
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className={`text-4xl md:text-5xl font-bold text-gold mb-4 ${headingFont}`}>{t('services.title')}</h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12">
                        {t('services.teaser')}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {serviceKeys.map((key) => (
                        <ServiceCard
                            key={key}
                            icon={serviceIcons[key]}
                            title={t(`services.${key}.title`)}
                            description={t(`services.${key}.desc`)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;
