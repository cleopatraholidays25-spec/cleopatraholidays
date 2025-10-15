import React from 'react';
import { useI18n } from '../hooks/useI18n';

interface PackageCardProps {
    icon: React.ReactElement<{ className?: string }>;
    title: string;
    description: string;
    onInquire: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ icon, title, description, onInquire }) => {
    const { t } = useI18n();
    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-start">
            <div className="flex-shrink-0 mb-4">
                {React.cloneElement(icon, { className: "w-10 h-10 text-gold" })}
            </div>
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={onInquire}
                    className="w-full px-6 py-2 bg-gold text-navy font-bold rounded-md shadow-md transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
                >
                    {t('modal.inquire_now')}
                </button>
            </div>
        </div>
    );
};

export default PackageCard;
