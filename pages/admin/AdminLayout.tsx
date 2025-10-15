import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useI18n } from '../../hooks/useI18n';

const AdminLayout: React.FC = () => {
    const { language } = useI18n();
    const bodyFont = language === 'ar' ? 'font-sans-ar' : 'font-sans-en';
    
    return (
        <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 text-navy dark:text-gray-200 ${bodyFont}`}>
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
