import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import adminAchievementsApi from '../api/adminAchievementsApi';
import { initialAchievementForm } from '../state/adminAchievementsState';

export const useAdminAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(initialAchievementForm);

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    try {
      const items = await adminAchievementsApi.getAchievements();
      setAchievements(items || []);
    } catch (err) {
      toast.error('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const openAddModal = () => {
    setEditingAch(null);
    setForm(initialAchievementForm);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingAch(item);
    setForm({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'Academic',
      date: item.date || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Achievement title is required');
      return;
    }

    setSaving(true);
    try {
      if (editingAch) {
        await adminAchievementsApi.updateAchievement(editingAch._id, form);
        toast.success('Achievement updated successfully');
      } else {
        await adminAchievementsApi.createAchievement(form);
        toast.success('Achievement created successfully');
      }
      setModalOpen(false);
      fetchAchievements();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save achievement');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await adminAchievementsApi.deleteAchievement(deleteId);
      toast.success('Achievement deleted successfully');
      setAchievements(achievements.filter((a) => a._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      toast.error('Failed to delete achievement');
    }
  };

  return {
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
    refetch: fetchAchievements,
  };
};

export default useAdminAchievements;

