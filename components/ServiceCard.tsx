import React from 'react';

interface ServiceCardProps {
    icon: React.ReactElement<{ className?: string }>;
    title: string;
    description: string;
    stats?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, stats }) => {
    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div className="flex justify-center mb-4">
                {React.cloneElement(icon, { className: "w-12 h-12 text-gold" })}
            </div>
            <h3 className="text-2xl font-bold text-navy dark:text-white mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{description}</p>
            {stats && (
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gold dark:text-gold-light">{stats}</p>
                </div>
            )}
        </div>
    );
};
export default ServiceCard;
