import React, { useState, useRef } from 'react';
import { useI18n } from '../hooks/useI18n';
import { supabase } from '../services/supabaseClient';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const ContactPage: React.FC = () => {
    const { t, language } = useI18n();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';
    
    // Animation refs
    const headerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    // Observers
    const headerEntry = useIntersectionObserver(headerRef, { threshold: 0.15, triggerOnce: true });
    const formEntry = useIntersectionObserver(formRef, { threshold: 0.15, triggerOnce: true });
    const infoEntry = useIntersectionObserver(infoRef, { threshold: 0.15, triggerOnce: true });

    const isHeaderVisible = headerEntry?.isIntersecting;
    const isFormVisible = formEntry?.isIntersecting;
    const isInfoVisible = infoEntry?.isIntersecting;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        const { data, error } = await supabase
            .from('contacts')
            .insert([{
                name: formData.name,
                email: formData.email,
                message: formData.message,
                language: language
            }]);

        if (error) {
            setStatus('error');
            setFeedbackMessage(t('contact.error_message'));
            console.error('Supabase error:', error);
        } else {
            setStatus('success');
            setFeedbackMessage(t('contact.success_message'));
            setFormData({ name: '', email: '', message: '' });
        }
    };

    return (
        <div className={`py-12 md:py-12 bg-white dark:bg-navy ${bodyFont} overflow-hidden`}>
            <div className="container mx-auto px-6">
                <div 
                    ref={headerRef}
                    className={`max-w-4xl mx-auto text-center mb-12 transition-all duration-700 ease-out ${isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    <h1 className={`text-4xl md:text-5xl font-bold text-gold mb-4 ${headingFont}`}>{t('contact.title')}</h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300">{t('contact.subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <form 
                        ref={formRef} 
                        onSubmit={handleSubmit} 
                        className={`space-y-6 transition-all duration-700 ease-out ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form_name')}</label>
                            <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-gold focus:border-gold" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form_email')}</label>
                            <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-gold focus:border-gold" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('contact.form_message')}</label>
                            <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 focus:ring-gold focus:border-gold"></textarea>
                        </div>
                        <button type="submit" disabled={status === 'loading'} className="w-full px-8 py-3 bg-gold text-navy font-bold rounded-md shadow-lg transition-all duration-300 hover:bg-yellow-500 hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {status === 'loading' ? 'Sending...' : t('contact.form_submit')}
                        </button>
                        {status === 'success' && <p className="text-green-600 mt-4">{feedbackMessage}</p>}
                        {status === 'error' && <p className="text-red-600 mt-4">{feedbackMessage}</p>}
                    </form>

                    <div 
                        ref={infoRef}
                        className={`space-y-8 transition-all duration-700 ease-out ${isInfoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <div>
                            <h3 className={`text-2xl font-bold text-gold mb-4 ${headingFont}`}>{t('contact.info_title')}</h3>
                            <p className="text-gray-700 dark:text-gray-300"><strong>{t('contact.phone')}:</strong> <a href="tel:+97450505033" className="hover:text-gold">{t('contact.phone2')}</a></p>
                            <p className="text-gray-700 dark:text-gray-300"><strong>{t('contact.phone')}:</strong> <a href="tel:+97455540596" className="hover:text-gold">{t('contact.phone1')}</a></p>
                            <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> <a href="mailto:contact@cleopatraholidays.com" className="hover:text-gold">{t('contact.email')}</a></p>
                            <p className="text-gray-700 dark:text-gray-300"><strong>{t('contact.whatsapp')}:</strong> <a href="https://wa.me/97450505033" target="_blank" rel="noopener noreferrer" className="hover:text-gold">{t('contact.phone2')}</a></p>
                        </div>
                        <div className="h-80 w-full rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.693757385501!2d51.5202816759163!3d25.28111112441908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45dc5d5b180861%3A0x6b8f8a452a8039c!2s9GPF%2B95%20Lusail!5e0!3m2!1sen!2sqa"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="dark:grayscale dark:invert"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;