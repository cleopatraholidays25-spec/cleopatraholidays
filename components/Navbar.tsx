
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useI18n } from '../hooks/useI18n';
import { Theme, Language } from '../types';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import GlobeIcon from './icons/GlobeIcon';
import HamburgerIcon from './icons/HamburgerIcon';
import XIcon from './icons/XIcon';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = () => {
    const newLang = language === Language.EN ? Language.AR : Language.EN;
    setLanguage(newLang);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-medium transition-colors duration-300 hover:text-gold after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-full after:h-[2px] after:bg-gold after:scale-x-0 after:origin-bottom-right rtl:after:origin-bottom-left after:transition-transform after:duration-300 ${
      isActive ? 'text-gold after:scale-x-100 after:origin-bottom-left rtl:after:origin-bottom-right' : 'text-navy dark:text-gray-200'
    }`;

  const navFontClass = language === Language.AR ? 'font-sans-ar' : 'font-sans-en';

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-navy/80 backdrop-blur-sm shadow-md border-b border-gray-80 dark:border-gray-700">
        <nav className={`container mx-auto px-6 py-4 flex justify-between items-center ${navFontClass}`}>
          <Link to="/" aria-label="Cleopatra Holidays Home">
            <img src="/logo.png" alt="Cleopatra Holidays" className="h-10 w-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <li><NavLink to="/" className={navLinkClasses}>{t('navbar.home')}</NavLink></li>
            <li><NavLink to="/about-us" className={navLinkClasses}>{t('navbar.about')}</NavLink></li>
            <li><NavLink to="/services" className={navLinkClasses}>{t('navbar.services')}</NavLink></li>
            <li><NavLink to="/destinations" className={navLinkClasses}>{t('navbar.destinations')}</NavLink></li>
            <li><NavLink to="/map" className={navLinkClasses}>{t('navbar.map')}</NavLink></li>
            <li><NavLink to="/contact-us" className={navLinkClasses}>{t('navbar.contact')}</NavLink></li>
          </ul>
          
          {/* Desktop Controls */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <button onClick={handleLanguageChange} className="flex items-center space-x-2 rtl:space-x-reverse text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold transition-colors duration-300">
              <GlobeIcon className="w-5 h-5" />
              <span className="text-sm font-medium">{language === Language.EN ? 'AR' : 'EN'}</span>
            </button>
            <button onClick={toggleTheme} className="text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold transition-colors duration-300">
              {theme === Theme.Light ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <HamburgerIcon className="w-6 h-6" />
          </button>
        </nav>
      </header>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={toggleMobileMenu}
        ></div>
        
        {/* Mobile Menu Panel */}
        <div className={`absolute top-0 ${language === Language.AR ? 'right-0' : 'left-0'} h-full w-80 max-w-sm bg-white dark:bg-navy shadow-xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : (language === Language.AR ? 'translate-x-full' : '-translate-x-full')}`}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <img src="/logo.png" alt="Cleopatra Holidays" className="h-8 w-auto" />
            <button 
              onClick={toggleMobileMenu}
              className="text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold transition-colors duration-300"
              aria-label="Close mobile menu"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Mobile Navigation Links */}
          <nav className="px-6 py-8">
            <ul className="space-y-6">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `block py-3 text-lg font-medium transition-colors duration-300 ${isActive ? 'text-gold' : 'text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold'}`}
                  onClick={toggleMobileMenu}
                >
                  {t('navbar.home')}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about-us" 
                  className={({ isActive }) => `block py-3 text-lg font-medium transition-colors duration-300 ${isActive ? 'text-gold' : 'text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold'}`}
                  onClick={toggleMobileMenu}
                >
                  {t('navbar.about')}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/services" 
                  className={({ isActive }) => `block py-3 text-lg font-medium transition-colors duration-300 ${isActive ? 'text-gold' : 'text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold'}`}
                  onClick={toggleMobileMenu}
                >
                  {t('navbar.services')}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/destinations" 
                  className={({ isActive }) => `block py-3 text-lg font-medium transition-colors duration-300 ${isActive ? 'text-gold' : 'text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold'}`}
                  onClick={toggleMobileMenu}
                >
                  {t('navbar.destinations')}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/map" 
                  className={({ isActive }) => `block py-3 text-lg font-medium transition-colors duration-300 ${isActive ? 'text-gold' : 'text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold'}`}
                  onClick={toggleMobileMenu}
                >
                  {t('navbar.map')}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact-us" 
                  className={({ isActive }) => `block py-3 text-lg font-medium transition-colors duration-300 ${isActive ? 'text-gold' : 'text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold'}`}
                  onClick={toggleMobileMenu}
                >
                  {t('navbar.contact')}
                </NavLink>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Controls */}
          <div className="px-6 py-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <div className="flex items-center justify-between">
              <button onClick={handleLanguageChange} className="flex items-center space-x-2 rtl:space-x-reverse text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold transition-colors duration-300">
                <GlobeIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{language === Language.EN ? 'العربية' : 'English'}</span>
              </button>
              <button onClick={toggleTheme} className="text-navy dark:text-gray-200 hover:text-gold dark:hover:text-gold transition-colors duration-300">
                {theme === Theme.Light ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
