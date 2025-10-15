import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useI18n } from '../../hooks/useI18n';
import StatCard from '../../components/admin/StatCard';
import MessagesIcon from '../../components/icons/MessagesIcon';
import GlobeIcon from '../../components/icons/GlobeIcon';

const DashboardPage: React.FC = () => {
    const { t, language } = useI18n();
    const [stats, setStats] = useState({ pageViews: 0, messages: 0 });
    const [loading, setLoading] = useState(true);

    const headingFont = language === 'ar' ? 'font-serif-ar' : 'font-serif-en';

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const { count: pageViewsCount, error: pvError } = await supabase
                    .from('page_views')
                    .select('*', { count: 'exact', head: true });

                const { count: messagesCount, error: msgError } = await supabase
                    .from('contacts')
                    .select('*', { count: 'exact', head: true });
                
                if (pvError || msgError) {
                    console.error('Error fetching stats:', pvError || msgError);
                }

                setStats({
                    pageViews: pageViewsCount || 0,
                    messages: messagesCount || 0,
                });
            } catch (error) {
                console.error("An unexpected error occurred while fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1 className={`text-3xl font-bold text-gold mb-6 ${headingFont}`}>{t('admin.dashboard.title')}</h1>
            
            {loading ? (
                <p>{t('admin.dashboard.loading')}</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard 
                        icon={<GlobeIcon className="w-6 h-6" />}
                        title={t('admin.dashboard.total_views')}
                        value={stats.pageViews}
                        description={t('admin.dashboard.total_views_desc')}
                    />
                    <StatCard 
                        icon={<MessagesIcon className="w-6 h-6" />}
                        title={t('admin.dashboard.total_messages')}
                        value={stats.messages}
                        description={t('admin.dashboard.total_messages_desc')}
                    />
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
