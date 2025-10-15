import React from 'react';

interface ServiceCardProps {
    // FIX: The `icon` prop's type is made more specific to ensure it accepts a `className`.
    // This resolves a TypeScript error where `React.cloneElement` could not verify that
    // `className` was a valid prop for the provided icon element.
    icon: React.ReactElement<{ className?: string }>;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-center transform transition-transform duration-300 hover:-translate-y-2">
            <div className="flex justify-center mb-6">
                {React.cloneElement(icon, { className: "w-12 h-12 text-gold" })}
            </div>
            <h3 className="text-2xl font-bold text-navy dark:text-white mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 flex-grow">{description}</p>
        </div>
    );
};

export default ServiceCard;
