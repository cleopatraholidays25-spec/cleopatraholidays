import React from 'react';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description }) => {
    return (
        <div className="bg-white dark:bg-navy p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
                <div className="p-3 rounded-full bg-gold/20 text-gold">
                    {icon}
                </div>
                <div className="ms-4 rtl:me-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
                    <p className="text-2xl font-semibold text-navy dark:text-white">{value}</p>
                </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">{description}</p>
        </div>
    );
};

export default StatCard;
