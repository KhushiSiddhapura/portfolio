import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Briefcase,
  Award,
  FileText,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { logoutAdmin } from '../features/auth/state/authSlice';
import ThemeToggle from '../shared/components/ThemeToggle';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Profile', path: '/admin/profile', icon: User },
    { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Skills', path: '/admin/skills', icon: Cpu },
    { name: 'Experience', path: '/admin/experience', icon: Briefcase },
    { name: 'Achievements', path: '/admin/achievements', icon: Award },
    { name: 'Resume', path: '/admin/resume', icon: FileText },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
    navigate('/admin/login');
  };

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  // Get current active title
  const currentNav = navItems.find((item) => isActive(item.path, item.exact));
  const pageTitle = currentNav ? currentNav.name : 'Admin Panel';

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text)] flex flex-col md:flex-row transition-colors">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between h-16 px-4 border-b border-[var(--border)] bg-[var(--card)] z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface)]"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-bold text-base text-[var(--text)]">CMS Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-xs rounded-lg text-[var(--primary)] bg-[var(--primary-soft)] flex items-center gap-1 font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[var(--card)] border-r border-[var(--border)] flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Admin Brand Header */}
          <div className="h-16 px-6 border-b border-[var(--border)] flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-[var(--text)] leading-none">
                  Portfolio CMS
                </span>
                <span className="text-[10px] font-medium text-[var(--text-muted)] mt-1 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5 text-[var(--primary)]" /> Admin Workspace
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-160px)]">
            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Content Management
            </div>
            {navItems.map((item) => {
              const active = isActive(item.path, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-medium rounded-lg transition-all ${
                    active
                      ? 'bg-[var(--primary-soft)] text-[var(--primary)] font-semibold border-l-3 border-[var(--primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`} />
                    <span>{item.name}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-[var(--primary)]" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: View Website & Logout */}
        <div className="p-3 border-t border-[var(--border)] bg-[var(--surface-alt)] space-y-2">
          {/* View Website Link */}
          <Link
            to="/"
            className="flex items-center justify-between px-3.5 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--card)] rounded-lg transition-colors border border-transparent hover:border-[var(--primary-border)]"
          >
            <span className="flex items-center gap-2.5">
              <ExternalLink className="w-4 h-4" />
              View Public Website
            </span>
          </Link>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <LogOut className="w-4 h-4" />
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex h-16 px-8 border-b border-[var(--border)] bg-[var(--card)] items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-bold text-[var(--text)] tracking-tight">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--surface)] border border-[var(--border)] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Website</span>
            </Link>
            <div className="h-5 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center justify-center">
                {user?.name?.[0] || 'A'}
              </div>
              <span className="text-xs font-medium text-[var(--text)]">
                {user?.name || 'Administrator'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1300px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;

