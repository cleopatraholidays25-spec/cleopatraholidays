import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { destinationsData } from '../data/destinationsData';
import PackageCard from '../components/PackageCard';
import BinocularsIcon from '../components/icons/BinocularsIcon';
import SpaIcon from '../components/icons/SpaIcon';
import Modal from '../components/Modal';
import PhoneIcon from '../components/icons/PhoneIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';

interface SelectedPackage {
    title: string;
    price: string;
}

const DestinationDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { t, language } = useI18n();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);

    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

    const destination = destinationsData.find(d => d.slug === slug);
    
    // Animation Refs
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const packagesRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    const headerEntry = useIntersectionObserver(headerRef, { threshold: 0.1, triggerOnce: true });
    const contentEntry = useIntersectionObserver(contentRef, { threshold: 0.1, triggerOnce: true });
    const packagesEntry = useIntersectionObserver(packagesRef, { threshold: 0.1, triggerOnce: true });
    const galleryEntry = useIntersectionObserver(galleryRef, { threshold: 0.1, triggerOnce: true });

    const isHeaderVisible = headerEntry?.isIntersecting;
    const isContentVisible = contentEntry?.isIntersecting;
    const isPackagesVisible = packagesEntry?.isIntersecting;
    const isGalleryVisible = galleryEntry?.isIntersecting;


    if (!destination) {
        return (
            <div className={`py-24 text-center ${bodyFont}`}>
                <h1 className={`text-3xl font-bold text-gold ${headingFont}`}>{t('destinations_page.not_found')}</h1>
                <Link to="/destinations" className="mt-8 inline-block text-gold hover:underline">
                    &larr; {t('destinations_page.back_to_destinations')}
                </Link>
            </div>
        );
    }
    
    // Package icons can be customized per package in a real app
    const packageIcons = [<BinocularsIcon />, <SpaIcon />];

    const handleInquire = (packageIndex: number) => {
        setSelectedPackage({
          title: t(`destinations_page.${destination.slug}.package${packageIndex}_title`),
          price: t(`destinations_page.${destination.slug}.package${packageIndex}_price`),
        });
        setIsModalOpen(true);
    };

    return (
        <>
            <div className={`bg-white dark:bg-navy ${bodyFont} overflow-hidden`}>
                {/* Hero Section */}
                <div ref={headerRef} className="relative h-80 md:h-96">
                    <img src={destination.image} alt={t(`destinations_page.${destination.slug}.title`)} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1 className={`text-4xl md:text-6xl font-bold text-white text-center ${headingFont}`}>
                            {t(`destinations_page.${destination.slug}.title`)}
                        </h1>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto">
                        {/* Long Description */}
                        <div 
                            ref={contentRef}
                            className={`transition-all duration-700 ease-out ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
                                {t(`destinations_page.${destination.slug}.long_description`)}
                            </p>
                        </div>

                        {/* Signature Experiences */}
                        <div ref={packagesRef} className="mb-16">
                            <h2 className={`text-3xl md:text-4xl font-bold text-gold mb-8 text-center ${headingFont} transition-all duration-700 ease-out ${isPackagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                {t('destinations_page.packages_title')}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[1, 2].map((i) => (
                                    <div
                                    key={i}
                                    className={`transition-all duration-500 ease-out ${isPackagesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                    style={{ transitionDelay: `${100 + i * 150}ms` }}
                                    >
                                    <PackageCard 
                                        icon={packageIcons[i-1]}
                                        title={t(`destinations_page.${destination.slug}.package${i}_title`)}
                                        description={t(`destinations_page.${destination.slug}.package${i}_desc`)}
                                        onInquire={() => handleInquire(i)}
                                    />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery */}
                        <div ref={galleryRef}>
                            <h2 className={`text-3xl md:text-4xl font-bold text-gold mb-8 text-center ${headingFont} transition-all duration-700 ease-out ${isGalleryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                {t('destinations_page.gallery_title')}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {destination.galleryImages.map((img, index) => (
                                    <div 
                                        key={index}
                                        className={`transition-all duration-500 ease-out ${isGalleryVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                                        style={{ transitionDelay: `${100 + index * 150}ms` }}
                                    >
                                        <img src={img} alt={`${t(`destinations_page.${destination.slug}.title`)} gallery image ${index + 1}`} className="w-full h-48 object-cover rounded-lg shadow-lg" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Back Link */}
                        <div className="text-center mt-16">
                            <Link to="/destinations" className="font-bold text-gold hover:underline">
                                &larr; {t('destinations_page.back_to_destinations')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={t('modal.inquire_title')}
            >
                {selectedPackage && (
                    <div className="space-y-6 text-center">
                        <h3 className="text-2xl font-bold text-navy dark:text-white">{selectedPackage.title}</h3>
                        <div>
                            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('modal.price')}</p>
                            <p className="text-3xl font-bold text-gold">{selectedPackage.price}</p>
                        </div>
                        <div className="flex flex-col space-y-3 pt-4">
                            <a 
                                href="tel:+97455540596" 
                                className="flex items-center justify-center w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 text-navy dark:text-white font-bold rounded-md shadow-md transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-lg"
                            >
                                <PhoneIcon className="w-5 h-5 me-3" />
                                {t('modal.call_us')}
                            </a>
                            <a 
                                href="https://wa.me/97455540596" 
                                target="_blank" rel="noopener noreferrer" 
                                className="flex items-center justify-center w-full px-6 py-3 bg-green-500 text-white font-bold rounded-md shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg"
                            >
                                <WhatsAppIcon className="w-5 h-5 me-3" />
                                {t('modal.whatsapp_us')}
                            </a>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default DestinationDetailPage;
