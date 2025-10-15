import React, { useState } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';
import { useI18n } from '../hooks/useI18n';

interface FaqItemProps {
    questionKey: string;
    answerKey: string;
    transitionDelay: string;
    isVisible: boolean;
}

const FaqItem: React.FC<FaqItemProps> = ({ questionKey, answerKey, isVisible, transitionDelay }) => {
    const { t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);

    const question = t(questionKey);
    const answer = t(answerKey);

    return (
        <div
            className={`border-b border-gray-200 dark:border-gray-700 py-4 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-start focus:outline-none"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-medium text-navy dark:text-white">{question}</h3>
                <ChevronDownIcon
                    className={`w-6 h-6 text-gold transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="text-gray-600 dark:text-gray-400">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FaqItem;