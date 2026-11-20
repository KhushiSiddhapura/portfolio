import React from 'react';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import useAdminAchievements from '../hook/useAdminAchievements';
import { achievementCategories } from '../state/adminAchievementsState';
import Modal from '../../../../shared/ui/Modal';
import ConfirmDialog from '../../../../shared/ui/ConfirmDialog';
import Button from '../../../../shared/ui/Button';
import Loader from '../../../../shared/ui/Loader';
import EmptyState from '../../../../shared/ui/EmptyState';

export const AchievementsManagementPage = () => {
  const {
    achievements,
    loading,
    modalOpen,
    setModalOpen,
    editingAch,
    deleteId,
    setDeleteId,
    saving,
    form,
    setForm,
    openAddModal,
    openEditModal,
    handleSubmit,
    confirmDelete,
  } = useAdminAchievements();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text)]">Achievements Management</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Manage academic ranks, hackathons, and UI/UX design contest awards.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
          Add Achievement
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading achievements..." className="py-12" />
      ) : achievements.length === 0 ? (
        <EmptyState
          title="No achievements yet"
          description="Record your first competition or academic milestone."
          actionText="Add Achievement"
          onAction={openAddModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((item) => (
            <div
              key={item._id}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[var(--surface-alt)] text-[var(--primary)] border border-[var(--primary-border)]">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-1 text-[var(--text-muted)] hover:text-[var(--primary)] cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteId(item._id)}
                      className="p-1 text-[var(--text-muted)] hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-[var(--text)] leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-3">
                  {item.description}
                </p>
              </div>

              {item.date && (
                <div className="pt-2 border-t border-[var(--border)] text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[var(--primary)]" />
                  <span>{item.date}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAch ? 'Edit Achievement' : 'Add Achievement'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Achievement Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Second highest score in HSC"
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              >
                {achievementCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Date / Event Context
              </label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                placeholder="e.g. FY IT / 2026"
                className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Description & Context
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Provide background, score, or competition placement..."
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3 text-[var(--text)] resize-y"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border)]">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={saving}>
              {editingAch ? 'Save Changes' : 'Create Achievement'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Achievement?"
        message="Are you sure you want to delete this achievement milestone?"
      />
    </div>
  );
};

export default AchievementsManagementPage;

