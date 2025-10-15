import React, { useRef } from 'react';
import { useI18n } from '../hooks/useI18n';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const AboutPage: React.FC = () => {
    const { t, language } = useI18n();
    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

    // Animation Refs
    const headerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const whyUsRef = useRef<HTMLDivElement>(null);

    // Observers
    const headerEntry = useIntersectionObserver(headerRef, { threshold: 0.1, triggerOnce: true });
    const galleryEntry = useIntersectionObserver(galleryRef, { threshold: 0.1, triggerOnce: true });
    const whyUsEntry = useIntersectionObserver(whyUsRef, { threshold: 0.1, triggerOnce: true });
    
    const isHeaderVisible = headerEntry?.isIntersecting;
    const isGalleryVisible = galleryEntry?.isIntersecting;
    const isWhyUsVisible = whyUsEntry?.isIntersecting;

    const images = [
        { src: '/cleopatra0.jpg', alt: 'Luxury destination', className: '' },
        { src: '/cleopatra1.jpg', alt: 'Office aesthetics', className: 'mt-0 md:mt-8' },
        { src: '/cleopatra2.jpg', alt: 'Travel detail', className: '' },
    ];
    
    const reasons = ['reason1', 'reason2', 'reason3'];

    return (
        <div className={`py-14 md:py-14 bg-white dark:bg-navy ${bodyFont} overflow-hidden`}>
            <div className="container mx-auto px-6">
                <div 
                    ref={headerRef}
                    className={`max-w-4xl mx-auto text-center transition-all duration-700 ease-out ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <h1 className={`text-4xl md:text-5xl font-bold text-gold mb-6 ${headingFont}`}>{t('about.title')}</h1>
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
                        {t('about.paragraph1')}
                    </p>
                </div>

                <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                    {images.map((img, index) => (
                         <div 
                            key={index} 
                            className={`transition-all duration-500 ease-out ${isGalleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${img.className}`}
                            style={{ transitionDelay: `${100 + index * 150}ms` }}
                        >
                            <img src={img.src} alt={img.alt} className="rounded-lg shadow-xl object-cover w-full h-64 hover:scale-105 transition-transform duration-300"/>
                        </div>
                    ))}
                </div>

                <div ref={whyUsRef} className="max-w-4xl mx-auto text-center mt-16">
                    <h2 
                        className={`text-3xl md:text-4xl font-bold text-gold mb-8 ${headingFont} transition-all duration-700 ease-out ${isWhyUsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        {t('about.subtitle')}
                    </h2>
                    <ul className="space-y-6 text-start rtl:text-right text-gray-700 dark:text-gray-300">
                       {reasons.map((reason, index) => (
                           <li 
                                key={reason}
                                className={`flex items-start transition-all duration-500 ease-out ${isWhyUsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${100 + index * 150}ms` }}
                           >
                                <span className="text-gold me-4 rtl:ms-4 text-2xl">&#10003;</span>
                                <p>{t(`about.${reason}`)}</p>
                           </li>
                       ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;