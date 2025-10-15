import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../hooks/useI18n';
import { useTheme } from '../../hooks/useTheme';
import { Theme, Language } from '../../types';

import DashboardIcon from '../icons/DashboardIcon';
import MessagesIcon from '../icons/MessagesIcon';
import LogoutIcon from '../icons/LogoutIcon';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import GlobeIcon from '../icons/GlobeIcon';

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { t, language, setLanguage } = useI18n();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleLanguageChange = () => {
      const newLang = language === Language.EN ? Language.AR : Language.EN;
      setLanguage(newLang);
    };

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
            isActive
                ? 'bg-gold text-navy'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`;

    return (
        <aside className="w-64 flex-shrink-0 bg-white dark:bg-navy border-e dark:border-gray-700 flex flex-col">
            <div className="px-6 py-4 border-b dark:border-gray-700">
                <h2 className="text-xl font-bold font-serif-en text-gold tracking-wider">Admin Panel</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Cleopatra Holidays</p>
            </div>
            <nav className="flex-grow p-4 space-y-2">
                <NavLink to="/admin" end className={navLinkClasses}>
                    <DashboardIcon className="w-5 h-5 me-3 rtl:ms-3" />
                    <span>{t('admin.sidebar.dashboard')}</span>
                </NavLink>
                <NavLink to="/admin/messages" className={navLinkClasses}>
                    <MessagesIcon className="w-5 h-5 me-3 rtl:ms-3" />
                    <span>{t('admin.sidebar.messages')}</span>
                </NavLink>
            </nav>
            <div className="p-4 border-t dark:border-gray-700">
              <div className="flex justify-around items-center mb-4">
                <button onClick={handleLanguageChange} className="text-gray-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors duration-300">
                  <GlobeIcon className="w-5 h-5" />
                </button>
                <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors duration-300">
                  {theme === Theme.Light ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </button>
              </div>
              <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors duration-200"
              >
                  <LogoutIcon className="w-5 h-5 me-3 rtl:ms-3" />
                  <span>{t('admin.sidebar.logout')}</span>
              </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
