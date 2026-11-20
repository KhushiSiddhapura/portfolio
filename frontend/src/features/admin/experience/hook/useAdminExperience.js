import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import adminExperienceApi from '../api/adminExperienceApi';
import { initialExperienceForm } from '../state/adminExperienceState';

export const useAdminExperience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialExperienceForm);

  const fetchExperience = useCallback(async () => {
    setLoading(true);
    try {
      const items = await adminExperienceApi.getExperience();
      setExperience(items || []);
    } catch (err) {
      toast.error('Failed to load experience records');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  const openAddModal = () => {
    setEditingExp(null);
    setForm(initialExperienceForm);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingExp(item);
    setForm({
      position: item.position || '',
      organization: item.organization || '',
      employmentType: item.employmentType || 'Internship',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      currentlyWorking: Boolean(item.currentlyWorking),
      location: item.location || '',
      description: item.description || '',
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!form.position.trim() || !form.organization.trim() || !form.startDate.trim()) {
      toast.error('Position, organization, and start date are required');
      return;
    }

    setSaving(true);
    try {
      const techArray = form.technologies
        ? form.technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [];

      const payload = {
        ...form,
        technologies: techArray,
      };

      if (editingExp) {
        await adminExperienceApi.updateExperience(editingExp._id, payload);
        toast.success('Experience updated successfully');
      } else {
        await adminExperienceApi.createExperience(payload);
        toast.success('Experience entry created');
      }
      setModalOpen(false);
      fetchExperience();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save experience');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await adminExperienceApi.deleteExperience(deleteId);
      toast.success('Experience deleted successfully');
      setExperience(experience.filter((e) => e._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      toast.error('Failed to delete experience');
    }
  };

  return {
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
    refetch: fetchExperience,
  };
};

export default useAdminExperience;
