import { useState, useEffect, useCallback } from 'react';
import projectsApi from '../api/projectsApi';
import { initialProjectsListState } from '../state/projectsState';

export const useProjects = (initialCategory = 'All') => {
  const [data, setData] = useState(initialProjectsListState);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);

  const fetchProjects = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const params = {
        page,
        limit: 9,
      };
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (search.trim()) params.search = search.trim();

      const res = await projectsApi.getProjects(params);
      setData({
        projects: res.data || [],
        total: res.total || 0,
        totalPages: res.pages || 1,
        currentPage: page,
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to load projects',
      }));
    }
  }, [selectedCategory, search, page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    ...data,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory: (cat) => {
      setSelectedCategory(cat);
      setPage(1);
    },
    page,
    setPage,
    refetch: fetchProjects,
  };
};

export default useProjects;
