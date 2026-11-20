import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import adminProjectsApi from '../api/adminProjectsApi';

export const useAdminProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (categoryFilter !== 'All') params.category = categoryFilter;
      if (search.trim()) params.search = search.trim();

      const items = await adminProjectsApi.getProjects(params);
      setProjects(items || []);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, search]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      await adminProjectsApi.updateProjectStatus(id, { status: newStatus });
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
      );
      toast.success(`Project changed to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update project status');
    }
  };

  const handleToggleFeatured = async (id, currentFeatured) => {
    try {
      await adminProjectsApi.updateProjectStatus(id, { featured: !currentFeatured });
      setProjects((prev) =>
        prev.map((p) => (p._id === id ? { ...p, featured: !currentFeatured } : p))
      );
      toast.success(
        `Project ${!currentFeatured ? 'marked as featured' : 'removed from featured'}`
      );
    } catch (err) {
      toast.error('Failed to update featured flag');
    }
  };

  const handleDuplicate = async (id) => {
    try {
      const cloned = await adminProjectsApi.duplicateProject(id);
      toast.success('Project duplicated successfully');
      setProjects((prev) => [cloned, ...prev]);
    } catch (err) {
      toast.error('Failed to duplicate project');
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminProjectsApi.deleteProject(deleteId);
      toast.success('Project deleted successfully');
      setProjects((prev) => prev.filter((p) => p._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      toast.error('Failed to delete project');
    } finally {
      setDeleting(false);
    }
  };

  return {
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
    refetch: fetchProjects,
  };
};

export default useAdminProjectsList;

