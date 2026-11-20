import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import adminSkillsApi from '../api/adminSkillsApi';
import { initialSkillForm } from '../state/adminSkillsState';

export const useAdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialSkillForm);

  const fetchSkills = useCallback(async () => {
    setLoading(true);
    try {
      const items = await adminSkillsApi.getSkills();
      setSkills(items || []);
    } catch (err) {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const openAddModal = () => {
    setEditingSkill(null);
    setForm(initialSkillForm);
    setModalOpen(true);
  };

  const openEditModal = (skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency || 80,
      isVisible: skill.isVisible !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!form.name.trim()) {
      toast.error('Skill name is required');
      return;
    }

    setSaving(true);
    try {
      if (editingSkill) {
        await adminSkillsApi.updateSkill(editingSkill._id, form);
        toast.success('Skill updated successfully');
      } else {
        await adminSkillsApi.createSkill(form);
        toast.success('Skill added successfully');
      }
      setModalOpen(false);
      fetchSkills();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save skill');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisibility = async (skill) => {
    try {
      await adminSkillsApi.updateSkill(skill._id, {
        isVisible: !skill.isVisible,
      });
      setSkills((prev) =>
        prev.map((s) => (s._id === skill._id ? { ...s, isVisible: !s.isVisible } : s))
      );
      toast.success(`Skill visibility ${!skill.isVisible ? 'enabled' : 'disabled'}`);
    } catch (err) {
      toast.error('Failed to toggle visibility');
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await adminSkillsApi.deleteSkill(deleteId);
      toast.success('Skill deleted successfully');
      setSkills(skills.filter((s) => s._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      toast.error('Failed to delete skill');
    }
  };

  return {
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
    refetch: fetchSkills,
  };
};

export default useAdminSkills;

