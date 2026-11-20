import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Star,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import useAdminProjectsList from '../hook/useAdminProjectsList';
import Loader from '../../../../shared/ui/Loader';
import EmptyState from '../../../../shared/ui/EmptyState';
import ConfirmDialog from '../../../../shared/ui/ConfirmDialog';

export const ProjectsListPage = () => {
  const navigate = useNavigate();
  const {
    projects,
    loading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    deleteId,
    setDeleteId,
    deleting,
    confirmDelete,
    handleToggleStatus,
    handleToggleFeatured,
    handleDuplicate,
    refetch,
  } = useAdminProjectsList();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text)]">Project Management</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Create, edit, organize content blocks, and publish developer projects.
          </p>
        </div>
        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] pl-9 pr-4 py-2 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
          />
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
        </form>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published Only</option>
            <option value="draft">Drafts Only</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
          >
            <option value="All">All Categories</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="AI / ML">AI / ML</option>
            <option value="Academic">Academic</option>
            <option value="UI / UX">UI / UX</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader text="Loading projects..." className="py-12" />
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Create your first portfolio project or adjust filter criteria."
          actionText="Create Project"
          onAction={() => navigate('/admin/projects/new')}
        />
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[var(--text-secondary)]">
              <thead className="bg-[var(--surface)] border-b border-[var(--border)] text-[11px] font-semibold uppercase text-[var(--text-muted)]">
                <tr>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Featured</th>
                  <th className="py-3 px-4">Blocks</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-[var(--surface-alt)]/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-sm text-[var(--text)] block">
                          {project.title}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">
                          /{project.slug}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-[var(--text)]">
                      {project.category}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(project._id, project.status)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                          project.status === 'published'
                            ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/40'
                            : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-800/40'
                        }`}
                        title="Click to toggle status"
                      >
                        {project.status === 'published' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{project.status}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(project._id, project.featured)}
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                          project.featured
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                            : 'text-[var(--text-muted)] hover:text-amber-500'
                        }`}
                        title={project.featured ? 'Featured on homepage' : 'Not featured'}
                      >
                        <Star className={`w-4 h-4 ${project.featured ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-[var(--text-muted)]">
                      {project.contentBlocks?.length || 0} blocks
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {project.status === 'published' && (
                          <Link
                            to={`/projects/${project.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] transition-colors"
                            title="Preview Public Page"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          to={`/admin/projects/edit/${project._id}`}
                          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] transition-colors"
                          title="Edit in Project Builder"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDuplicate(project._id)}
                          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                          title="Duplicate as Draft"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteId(project._id)}
                          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Delete Project?"
        message="Are you sure you want to delete this project? This will permanently remove its dynamic details page and all associated content blocks."
      />
    </div>
  );
};

export default ProjectsListPage;
