
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import QuoteIcon from '../components/icons/QuoteIcon';
import ServiceCard from '../components/ServiceCard';
import AirplaneIcon from '../components/icons/AirplaneIcon';
import HotelIcon from '../components/icons/HotelIcon';
import InsuranceIcon from '../components/icons/InsuranceIcon';
import LicenseIcon from '../components/icons/LicenseIcon';
import CarIcon from '../components/icons/CarIcon';
import TransferIcon from '../components/icons/TransferIcon';
import FlightSearch from '@/components/FlightSearch';
import VisaIcon from '../components/icons/VisaIcon';

const allServices: { [key: string]: React.ReactElement } = {
    flights: <AirplaneIcon />,
    hotels: <HotelIcon />,
    visa: <VisaIcon />,
    travel_insurance: <InsuranceIcon />,
    driving_license: <LicenseIcon />,
    car_rental: <CarIcon />,
    transfers: <TransferIcon />,
};

const heroBackgrounds = [
    'hero-1.jpg',
    'paris.jpg',
    'italy.jpg',
    'moscow.jpg',
    'tajmahal.jpg'
];

const TestimonialCard: React.FC<{ quote: string; author: string; trip: string }> = ({ quote, author, trip }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 text-center relative h-full">
            <QuoteIcon className="absolute top-4 start-4 w-8 h-8 text-gold opacity-20" />
            <p className="text-gray-600 dark:text-gray-400 italic mb-6">"{quote}"</p>
            <h4 className="font-bold text-navy dark:text-white">{author}</h4>
            <p className="text-sm text-gold">{trip}</p>
        </div>
    );
};

const HomePage: React.FC = () => {
  const { t, language } = useI18n();
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Animation Refs & Observers
  const servicesRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);

  const servicesEntry = useIntersectionObserver(servicesRef, { threshold: 0.1, triggerOnce: true });
  const testimonialsEntry = useIntersectionObserver(testimonialsRef, { threshold: 0.15, triggerOnce: true });

  const isServicesVisible = servicesEntry?.isIntersecting;
  const isTestimonialsVisible = testimonialsEntry?.isIntersecting;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroBackgrounds.length > 1) {
        const intervalId = setInterval(() => {
            setCurrentBgIndex(prevIndex => (prevIndex + 1) % heroBackgrounds.length);
        }, 3000); 
        return () => clearInterval(intervalId);
    }
  }, []);

  const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
  const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';
  const handwritingFont = language === 'ar' ? headingFont : 'font-handwriting-en';

  const allServiceKeys = Object.keys(allServices);

  const testimonials = [
      { key: 't1', quote: t('home.testimonials.t1_quote'), author: t('home.testimonials.t1_author'), trip: t('home.testimonials.t1_trip') },
      { key: 't2', quote: t('home.testimonials.t2_quote'), author: t('home.testimonials.t2_author'), trip: t('home.testimonials.t2_trip') },
      { key: 't3', quote: t('home.testimonials.t3_quote'), author: t('home.testimonials.t3_author'), trip: t('home.testimonials.t3_trip') },
  ];
  
  return (
    <>
      <div
        className="relative h-[calc(90vh-80px)] flex items-start justify-center text-white overflow-hidden bg-navy pt-20 md:pt-32"
      >
        {/*<div
        className="relative h-[calc(100vh-80px)] flex items-center justify-center text-white overflow-hidden bg-navy"
      > */}

        <div className={`absolute inset-0 w-full h-full transition-transform duration-[8000ms] ease-in-out ${isHeroLoaded ? 'scale-105' : 'scale-100'}`}>
            {heroBackgrounds.map((bg, index) => (
                <img
                    key={bg}
                    src={bg}
                    alt="A serene, luxury travel destination"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out 
                                ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        {/* Arabic Pattern Overlay */}
        <div className="absolute inset-0 arabic-pattern opacity-25"></div>
        <div className={`relative z-10 text-center p-6 ${bodyFont}`}>
          <h1
            className={`text-4xl md:text-6xl font-bold mb-4 ${headingFont} transition-all duration-1000 ease-out flex flex-col ${isHeroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <span style={{textShadow: '2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000'}}>{t('hero.tagline1')}</span>
            <span className={`${handwritingFont} mt-4`} style={{textShadow: '2px 2px 0px #000000, -2px -2px 0px #000000, 2px -2px 0px #000000, -2px 2px 0px #000000'}}>{t('hero.tagline2')}</span>
          </h1>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <Link
              to="/contact-us"
              className={`px-8 py-3 bg-gold text-navy font-bold rounded-md shadow-lg transform transition-all duration-700 ease-out hover:scale-105 hover:bg-yellow-500 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 ${isHeroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: '300ms' }}
            >
              {t('hero.contact_cta')}
            </Link>
            <Link
              to="/about-us"
              className={`px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-md shadow-lg transform transition-all duration-700 ease-out hover:scale-105 hover:bg-white hover:text-navy focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 ${isHeroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: '500ms' }}
            >
              {t('hero.learn_more_cta')}
            </Link>
          </div>
          
        </div>
            </div> {/* End of hero section */}

      {/* Flight Search Section - Between Hero and Services */}
      <div className="relative z-20 -mt-16 md:-mt-20">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden outline outline-1 dark:outline-gray-700 outline-gray-300">
            <FlightSearch />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section ref={servicesRef} className={`py-16 md:py-24 bg-white dark:bg-navy ${bodyFont} overflow-hidden`}>
        <div className="container mx-auto px-6 text-center">
          <div className={`transition-all duration-700 ease-out ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className={`text-3xl md:text-4xl font-bold text-gold mb-4 ${headingFont}`}>{t('services.title')}</h2>
            <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 mb-12">
              {t('services.teaser')}
            </p>
          </div>

          <div 
            className={`relative group transition-all duration-500 ease-out ${isServicesVisible ? 'opacity-100' : 'opacity-0'}`}
          >
             <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white dark:from-navy to-transparent pointer-events-none z-10" />
             <div className="overflow-hidden">
                <div className="flex w-max animate-marquee rtl:animate-marquee-rtl group-hover:[animation-play-state:paused]">
                    {[...allServiceKeys, ...allServiceKeys].map((key, index) => (
                        <div key={`${key}-${index}`} className="flex-shrink-0 w-80 md:w-96 px-4">
                            <ServiceCard
                                icon={allServices[key]}
                                title={t(`services.${key}.title`)}
                                description={t(`services.${key}.desc`)}
                            />
                        </div>
                    ))}
                </div>
             </div>
             <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white dark:from-navy to-transparent pointer-events-none z-10" />
          </div>

          <div 
            className={`mt-12 transition-all duration-700 ease-out ${isServicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <Link
              to="/services"
              className="inline-block px-8 py-3 bg-transparent border-2 border-gold text-gold font-bold rounded-md shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-navy dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
            >
              {t('services.explore_all')}
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className={`py-16 md:py-24 bg-gray-50 dark:bg-gray-900 ${bodyFont}`}>
          <div className="container mx-auto px-6 text-center">
              <h2 className={`text-3xl md:text-4xl font-bold text-gold mb-12 ${headingFont} transition-all duration-700 ease-out ${isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>{t('home.testimonials.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                      <div
                          key={testimonial.key}
                          className={`transition-all duration-500 ease-out ${isTestimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                          style={{ transitionDelay: `${100 + index * 150}ms` }}
                      >
                          <TestimonialCard 
                              quote={testimonial.quote}
                              author={testimonial.author}
                              trip={testimonial.trip}
                          />
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </>
  );
};

export default HomePage;
