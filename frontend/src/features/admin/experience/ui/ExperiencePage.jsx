import React from 'react';
import { Plus, Edit, Trash2, Building, Calendar, MapPin } from 'lucide-react';
import useAdminExperience from '../hook/useAdminExperience';
import Modal from '../../../../shared/ui/Modal';
import ConfirmDialog from '../../../../shared/ui/ConfirmDialog';
import Button from '../../../../shared/ui/Button';
import Loader from '../../../../shared/ui/Loader';
import EmptyState from '../../../../shared/ui/EmptyState';

export const ExperienceManagementPage = () => {
  const {
    experience,
    loading,
    modalOpen,
    setModalOpen,
    editingExp,
    deleteId,
    setDeleteId,
    saving,
    form,
    setForm,
    openAddModal,
    openEditModal,
    handleSubmit,
    confirmDelete,
  } = useAdminExperience();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text)]">Experience Management</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Manage internships, software developer positions, and timelines.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
          Add Experience
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading experience entries..." className="py-12" />
      ) : experience.length === 0 ? (
        <EmptyState
          title="No experience records"
          description="Add your first internship or job role."
          actionText="Add Experience"
          onAction={openAddModal}
        />
      ) : (
        <div className="space-y-4">
          {experience.map((item) => (
            <div
              key={item._id}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[var(--text)]">{item.position}</span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--primary-border)]">
                    {item.employmentType || 'Internship'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1 text-[var(--primary)] font-medium">
                    <Building className="w-3.5 h-3.5" /> {item.organization}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {item.startDate} - {item.currentlyWorking ? 'Present' : item.endDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                  {item.description}
                </p>

                {item.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] rounded bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => openEditModal(item)}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(item._id)}
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingExp ? 'Edit Experience Entry' : 'Add Experience Entry'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Position / Role *
              </label>
              <input
                type="text"
                required
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                placeholder="Web Development Intern"
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Organization / Company *
              </label>
              <input
                type="text"
                required
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                placeholder="My Job Grow"
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Employment Type
              </label>
              <input
                type="text"
                value={form.employmentType}
                onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
                placeholder="Online Internship"
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Start Date *
              </label>
              <input
                type="text"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                placeholder="January 2026"
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                End Date
              </label>
              <input
                type="text"
                disabled={form.currentlyWorking}
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                placeholder={form.currentlyWorking ? 'Currently Working' : 'e.g. May 2026'}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] disabled:opacity-40"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-[var(--text)] cursor-pointer">
            <input
              type="checkbox"
              checked={form.currentlyWorking}
              onChange={(e) => setForm({ ...form, currentlyWorking: e.target.checked })}
              className="rounded border-[var(--border)] text-[var(--primary)]"
            />
            <span>Currently Working in this Role</span>
          </label>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Location
            </label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="Online / Remote"
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Description & Responsibilities
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Detail your responsibilities and developer outcomes..."
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)] resize-y"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              placeholder="HTML, CSS, JavaScript, React.js"
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border)]">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={saving}>
              {editingExp ? 'Save Changes' : 'Create Entry'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Experience Entry?"
        message="Are you sure you want to remove this experience record?"
      />
    </div>
  );
};

export default ExperienceManagementPage;

