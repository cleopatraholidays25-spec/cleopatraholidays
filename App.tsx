
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import { AuthProvider } from './contexts/AuthContext';
import { supabase } from './services/supabaseClient';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import DestinationsPage from './pages/DestinationsPage';
import InteractiveMapPage from './pages/InteractiveMapPage';

// Admin Pages
import LoginPage from './pages/admin/LoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import MessagesPage from './pages/admin/MessagesPage';

// Component to log page views
const PageViewLogger: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    // Only log page views for non-admin pages
    if (!location.pathname.startsWith('/admin') && location.pathname !== '/login') {
      const logPageView = async () => {
        try {
          const { error } = await supabase.from('page_views').insert({ page: location.pathname });
          if (error && !error.message.includes('server is not configured')) {
            console.error('Error logging page view:', error);
          }
        } catch (e) {
          console.error('An unexpected error occurred while logging page view:', e);
        }
      };
      logPageView();
    }
  }, [location]);
  return null;
};

// Layout for public-facing pages
const PublicLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-white dark:bg-navy text-navy dark:text-gray-200 transition-colors duration-300">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <HashRouter>
            <ScrollToTop />
            <PageViewLogger />
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/map" element={<InteractiveMapPage />} />
                <Route path="/contact-us" element={<ContactPage />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<DashboardPage />} />
                  <Route path="messages" element={<MessagesPage />} />
                </Route>
              </Route>
            </Routes>
          </HashRouter>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default App;
