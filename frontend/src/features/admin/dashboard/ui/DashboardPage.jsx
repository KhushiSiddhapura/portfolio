import React from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Cpu,
  Briefcase,
  Award,
  Mail,
  Plus,
  ExternalLink,
} from 'lucide-react';
import useDashboard from '../hook/useDashboard';
import Loader from '../../../../shared/ui/Loader';

export const DashboardPage = () => {
  const { counts, recentProjects, recentMessages, loading } = useDashboard();

  if (loading) {
    return <Loader text="Loading dashboard metrics..." className="min-h-[50vh]" />;
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: counts.totalProjects || 0,
      sub: `${counts.publishedProjects || 0} Published • ${counts.draftProjects || 0} Draft`,
      icon: FolderGit2,
      link: '/admin/projects',
      color: 'text-[var(--primary)]',
      bg: 'bg-[var(--surface-alt)]',
    },
    {
      title: 'Technical Skills',
      value: counts.totalSkills || 0,
      sub: 'Categorized competencies',
      icon: Cpu,
      link: '/admin/skills',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    },
    {
      title: 'Experience & Internships',
      value: counts.experienceCount || 0,
      sub: 'Timeline records',
      icon: Briefcase,
      link: '/admin/experience',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
    },
    {
      title: 'Honors & Achievements',
      value: counts.achievementsCount || 0,
      sub: 'Competitions & academic',
      icon: Award,
      link: '/admin/achievements',
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-950/20',
    },
    {
      title: 'Contact Messages',
      value: counts.totalMessages || 0,
      sub: `${counts.unreadMessages || 0} Unread inquiries`,
      icon: Mail,
      link: '/admin/messages',
      color: counts.unreadMessages > 0 ? 'text-rose-500' : 'text-[var(--text-muted)]',
      bg: 'bg-rose-50 dark:bg-rose-950/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <div>
          <h2 className="text-xl font-bold text-[var(--text)]">CMS Overview & Controls</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Real-time synchronization with public portfolio website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Project</span>
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-[var(--text)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] border border-[var(--border)] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Site</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary-border)] hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--text-muted)]">{card.title}</span>
                <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-extrabold text-[var(--text)]">{card.value}</span>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{card.sub}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Projects and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[var(--primary)]" />
              Recent Projects
            </h3>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-[var(--primary)] hover:underline"
            >
              Manage All
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] py-4 text-center">No projects created yet.</p>
          ) : (
            <div className="space-y-3">
              {recentProjects.map((p) => (
                <div
                  key={p._id}
                  className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs"
                >
                  <div className="space-y-1 max-w-[70%]">
                    <p className="font-semibold text-[var(--text)] truncate">{p.title}</p>
                    <span className="text-[10px] text-[var(--text-muted)] block">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded ${
                        p.status === 'published'
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                          : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                      }`}
                    >
                      {p.status}
                    </span>
                    <Link
                      to={`/admin/projects/edit/${p._id}`}
                      className="text-[var(--primary)] hover:underline font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--primary)]" />
              Recent Inquiries
            </h3>
            <Link
              to="/admin/messages"
              className="text-xs font-semibold text-[var(--primary)] hover:underline"
            >
              View Inbox ({counts.unreadMessages || 0} unread)
            </Link>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] py-4 text-center">No messages received yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div
                  key={m._id}
                  className={`p-3 rounded-lg border text-xs space-y-1 transition-colors ${
                    !m.isRead
                      ? 'border-[var(--primary-border)] bg-[var(--surface-alt)]'
                      : 'border-[var(--border)] bg-[var(--surface)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--text)]">{m.name}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] truncate">
                    {m.subject || m.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
