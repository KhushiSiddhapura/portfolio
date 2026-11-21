import {createBrowserRouter, Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Feature Pages (from feature 4-layer UI modules)
import HomePage from '../features/home/ui/HomePage';
import AboutPage from '../features/about/ui/AboutPage';
import ProjectsPage from '../features/projects/ui/ProjectsPage';
import ProjectDetailPage from '../features/projects/ui/ProjectDetailPage';
import ExperiencePage from '../features/experience/ui/ExperiencePage';
import AchievementsPage from '../features/achievements/ui/AchievementsPage';
import ContactPage from '../features/contact/ui/ContactPage';
import ResumePage from '../features/resume/ui/ResumePage';

// Admin Feature Pages (from admin feature 4-layer UI modules)
import AdminLoginPage from '../features/admin/auth/ui/AdminLoginPage';
import DashboardPage from '../features/admin/dashboard/ui/DashboardPage';
import ProfileManagementPage from '../features/admin/profile/ui/ProfilePage';
import ProjectsListPage from '../features/admin/projects/ui/ProjectsListPage';
import ProjectBuilderPage
  from '../features/admin/projects/ui/ProjectBuilderPage';
import SkillsManagementPage from '../features/admin/skills/ui/SkillsPage';
import ExperienceManagementPage
  from '../features/admin/experience/ui/ExperiencePage';
import AchievementsManagementPage
  from '../features/admin/achievements/ui/AchievementsPage';
import ResumeManagementPage from '../features/admin/resume/ui/ResumePage';
import MessagesManagementPage from '../features/admin/messages/ui/MessagesPage';
import WebsiteSettingsPage from '../features/admin/settings/ui/SettingsPage';

// Protected Route Guard for Admin Routes
const ProtectedAdminRoute = () => {
  const {isAuthenticated} = useSelector (state => state.auth);

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

export const router = createBrowserRouter ([
  // Public Website Experience
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {index: true, element: <HomePage />},
      {path: 'about', element: <AboutPage />},
      {path: 'projects', element: <ProjectsPage />},
      {path: 'projects/:slug', element: <ProjectDetailPage />},
      {path: 'experience', element: <ExperiencePage />},
      {path: 'achievements', element: <AchievementsPage />},
      {path: 'contact', element: <ContactPage />},
      {path: 'resume', element: <ResumePage />},
      {path: '*', element: <NotFoundPage />},
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
          {index: true, element: <DashboardPage />},
          {path: 'profile', element: <ProfileManagementPage />},
          {path: 'projects', element: <ProjectsListPage />},
          {path: 'projects/new', element: <ProjectBuilderPage />},
          {path: 'projects/edit/:id', element: <ProjectBuilderPage />},
          {path: 'skills', element: <SkillsManagementPage />},
          {path: 'experience', element: <ExperienceManagementPage />},
          {path: 'achievements', element: <AchievementsManagementPage />},
          {path: 'resume', element: <ResumeManagementPage />},
          {path: 'messages', element: <MessagesManagementPage />},
          {path: 'settings', element: <WebsiteSettingsPage />},
        ],
      },
    ],
  },
]);

export default router;
