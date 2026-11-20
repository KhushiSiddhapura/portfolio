import React from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import useAdminSkills from '../hook/useAdminSkills';
import { skillCategories } from '../state/adminSkillsState';
import Modal from '../../../../shared/ui/Modal';
import ConfirmDialog from '../../../../shared/ui/ConfirmDialog';
import Button from '../../../../shared/ui/Button';
import Loader from '../../../../shared/ui/Loader';

export const SkillsManagementPage = () => {
  const {
    skills,
    loading,
    modalOpen,
    setModalOpen,
    editingSkill,
    deleteId,
    setDeleteId,
    saving,
    form,
    setForm,
    openAddModal,
    openEditModal,
    handleSubmit,
    handleToggleVisibility,
    confirmDelete,
  } = useAdminSkills();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--text)]">Skills Management</h2>
          <p className="text-xs text-[var(--text-muted)]">
            Add, update, categorize, and control visibility of your technical skills.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
          Add New Skill
        </Button>
      </div>

      {loading ? (
        <Loader text="Loading technical skills..." className="py-12" />
      ) : (
        <div className="space-y-8">
          {skillCategories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat);
            return (
              <div key={cat} className="space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                  <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[var(--primary)] rounded-full" />
                    {cat} ({catSkills.length})
                  </h3>
                </div>

                {catSkills.length === 0 ? (
                  <p className="text-xs text-[var(--text-muted)] italic py-2">
                    No skills in this category yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {catSkills.map((skill) => (
                      <div
                        key={skill._id}
                        className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                          skill.isVisible
                            ? 'bg-[var(--card)] border-[var(--border)]'
                            : 'bg-[var(--surface-alt)] border-[var(--border)] opacity-60'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="font-semibold text-xs text-[var(--text)] block">
                            {skill.name}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)]">
                            Proficiency: {skill.proficiency}%
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleToggleVisibility(skill)}
                            className="p-1 text-[var(--text-muted)] hover:text-[var(--text)] cursor-pointer"
                            title={skill.isVisible ? 'Visible (Click to hide)' : 'Hidden (Click to show)'}
                          >
                            {skill.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-amber-500" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(skill)}
                            className="p-1 text-[var(--text-muted)] hover:text-[var(--primary)] cursor-pointer"
                            title="Edit Skill"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteId(skill._id)}
                            className="p-1 text-[var(--text-muted)] hover:text-red-600 cursor-pointer"
                            title="Delete Skill"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingSkill ? 'Edit Technical Skill' : 'Add New Skill'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. React.js, TypeScript, PostgreSQL"
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full text-xs rounded-lg bg-[var(--surface)] border border-[var(--border)] px-3 py-2 text-[var(--text)] focus:border-[var(--primary)]"
            >
              {skillCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
              Proficiency ({form.proficiency}%)
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={form.proficiency}
              onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
              className="w-full accent-[var(--primary)] cursor-pointer"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-[var(--text)] cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={form.isVisible}
              onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
              className="rounded border-[var(--border)] text-[var(--primary)]"
            />
            <span>Visible on Public Portfolio</span>
          </label>

          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border)]">
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" loading={saving}>
              {editingSkill ? 'Update Skill' : 'Create Skill'}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Skill?"
        message="Are you sure you want to delete this technical skill from the portfolio?"
      />
    </div>
  );
};

export default SkillsManagementPage;

