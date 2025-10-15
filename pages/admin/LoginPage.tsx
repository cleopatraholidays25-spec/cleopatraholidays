import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useI18n } from '../../hooks/useI18n';
import LuxuryIcon from '../../components/icons/LuxuryIcon';

const LoginPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t, language } = useI18n();

    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(password);
        if (success) {
            navigate('/admin');
        } else {
            setError(t('admin.login.error'));
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 ${bodyFont}`}>
            <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-navy rounded-lg shadow-xl">
                <div className="text-center">
                    <LuxuryIcon className="w-16 h-16 mx-auto text-gold" />
                    <h1 className="mt-4 text-3xl font-bold text-navy dark:text-white">{t('admin.login.title')}</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('admin.login.subtitle')}</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">{t('admin.login.password')}</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-gold focus:border-gold text-navy dark:text-white"
                            placeholder={t('admin.login.password')}
                        />
                    </div>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full px-8 py-3 bg-gold text-navy font-bold rounded-md shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {t('admin.login.button')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
