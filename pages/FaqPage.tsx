import React, { useRef } from 'react';
import { useI18n } from '../hooks/useI18n';
import FaqItem from '../components/FaqItem';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FaqPage: React.FC = () => {
    const { t, language } = useI18n();
    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

    const headerRef = useRef<HTMLDivElement>(null);
    const faqsRef = useRef<HTMLDivElement>(null);

    const headerEntry = useIntersectionObserver(headerRef, { threshold: 0.1, triggerOnce: true });
    const faqsEntry = useIntersectionObserver(faqsRef, { threshold: 0.1, triggerOnce: true });

    const isHeaderVisible = headerEntry?.isIntersecting;
    const isFaqsVisible = faqsEntry?.isIntersecting;
    
    // Assuming 5 FAQ items in the locale files, named q1/a1, q2/a2, etc.
    const faqItems = Array.from({ length: 5 }, (_, i) => ({
        qKey: `faq.q${i + 1}`,
        aKey: `faq.a${i + 1}`,
    }));

    return (
        <div className={`py-16 md:py-24 bg-white dark:bg-navy ${bodyFont} overflow-hidden`}>
            <div className="container mx-auto px-6">
                <div 
                    ref={headerRef}
                    className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-700 ease-out ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <h1 className={`text-4xl md:text-5xl font-bold text-gold mb-4 ${headingFont}`}>{t('faq.title')}</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{t('faq.subtitle')}</p>
                </div>

                <div ref={faqsRef} className="max-w-4xl mx-auto">
                    {faqItems.map((item, index) => (
                        <FaqItem
                            key={index}
                            questionKey={item.qKey}
                            answerKey={item.aKey}
                            isVisible={!!isFaqsVisible}
                            transitionDelay={`${100 + index * 100}ms`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;