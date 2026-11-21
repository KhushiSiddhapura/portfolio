import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import { WebsiteSettingsProvider } from '../shared/context/WebsiteSettingsContext';

export const PublicLayout = () => {
  return (
    <WebsiteSettingsProvider>
      <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--text)] transition-colors duration-200">
        <Navbar />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </WebsiteSettingsProvider>
  );
};

export default PublicLayout;

