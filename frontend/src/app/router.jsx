import React from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Feature Pages
import HomePage from '../features/home/HomePage';
import AboutPage from '../features/about/AboutPage';
import ProjectsPage from '../features/projects/ProjectsPage';
import ProjectDetailPage from '../features/projects/ProjectDetailPage';
import ExperiencePage from '../features/experience/ExperiencePage';
import AchievementsPage from '../features/achievements/AchievementsPage';
import ContactPage from '../features/contact/ContactPage';
import ResumePage from '../features/resume/ResumePage';

// Admin Pages
import AdminLoginPage from '../features/admin/auth/AdminLoginPage';
import DashboardPage from '../features/admin/dashboard/DashboardPage';
import ProfileManagementPage from '../features/admin/profile/ProfilePage';
import ProjectsListPage from '../features/admin/projects/ProjectsListPage';
import ProjectBuilderPage from '../features/admin/projects/ProjectBuilderPage';
import SkillsManagementPage from '../features/admin/skills/SkillsPage';
import ExperienceManagementPage from '../features/admin/experience/ExperiencePage';
import AchievementsManagementPage from '../features/admin/achievements/AchievementsPage';
import ResumeManagementPage from '../features/admin/resume/ResumePage';
import MessagesManagementPage from '../features/admin/messages/MessagesPage';
import WebsiteSettingsPage from '../features/admin/settings/SettingsPage';

// Protected Route Guard for Admin Routes
const ProtectedAdminRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

// 404 Page Component
const NotFoundPage = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center space-y-4">
    <span className="text-6xl font-extrabold text-[var(--primary)]">404</span>
    <h2 className="text-2xl font-bold text-[var(--text)]">Page Not Found</h2>
    <p className="text-sm text-[var(--text-muted)] max-w-sm">
      The requested page could not be located. It may have moved or no longer exists.
    </p>
    <div className="pt-2">
      <a
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors"
      >
        Return to Home
      </a>
    </div>
  </div>
);

export const router = createBrowserRouter([
  // Public Website Experience
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectDetailPage /> },
      { path: 'experience', element: <ExperiencePage /> },
      { path: 'achievements', element: <AchievementsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'resume', element: <ResumePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },

  // Admin Login (Standalone)
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },

  // Protected Admin CMS Experience
  {
    path: '/admin',
    element: <ProtectedAdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'profile', element: <ProfileManagementPage /> },
          { path: 'projects', element: <ProjectsListPage /> },
          { path: 'projects/new', element: <ProjectBuilderPage /> },
          { path: 'projects/edit/:id', element: <ProjectBuilderPage /> },
          { path: 'skills', element: <SkillsManagementPage /> },
          { path: 'experience', element: <ExperienceManagementPage /> },
          { path: 'achievements', element: <AchievementsManagementPage /> },
          { path: 'resume', element: <ResumeManagementPage /> },
          { path: 'messages', element: <MessagesManagementPage /> },
          { path: 'settings', element: <WebsiteSettingsPage /> },
        ],
      },
    ],
  },
]);

export default router;
