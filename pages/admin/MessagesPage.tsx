import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useI18n } from '../../hooks/useI18n';

interface Message {
    id: number;
    created_at: string;
    name: string;
    email: string;
    message: string;
    language: string;
}

const MessagesPage: React.FC = () => {
    const { t, language } = useI18n();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data, error } = await supabase
                    .from('contacts')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    throw error;
                }
                setMessages(data || []);
            } catch (err: any) {
                setError(t('admin.messages.fetch_error'));
                console.error('Error fetching messages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [t]);

    return (
        <div>
            <h1 className={`text-3xl font-bold text-gold mb-6 ${headingFont}`}>{t('admin.messages.title')}</h1>
            <div className="bg-white dark:bg-navy shadow-md rounded-lg overflow-x-auto">
                {loading ? (
                    <p className="p-6">{t('admin.messages.loading')}</p>
                ) : error ? (
                    <p className="p-6 text-red-500">{error}</p>
                ) : messages.length === 0 ? (
                    <p className="p-6">{t('admin.messages.no_messages')}</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('admin.messages.date')}</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('admin.messages.name')}</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('admin.messages.email')}</th>
                                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('admin.messages.message')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-navy divide-y divide-gray-200 dark:divide-gray-700">
                            {messages.map((msg) => (
                                <tr key={msg.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(msg.created_at).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-navy dark:text-white">{msg.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{msg.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400"><p className="max-w-xs truncate" title={msg.message}>{msg.message}</p></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;
