import { useState, useEffect, useCallback } from 'react';
import projectsApi from '../api/projectsApi';
import { initialProjectDetailState } from '../state/projectsState';

export const useProjectDetail = (slug) => {
  const [state, setState] = useState(initialProjectDetailState);

  const fetchDetail = useCallback(async () => {
    if (!slug) return;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await projectsApi.getProjectBySlug(slug);
      setState({
        project: data.project,
        navigation: data.navigation || { prev: null, next: null },
        loading: false,
        error: null,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setState({
        project: null,
        navigation: { prev: null, next: null },
        loading: false,
        error: err.response?.data?.message || 'Project not found or draft',
      });
    }
  }, [slug]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    ...state,
    refetch: fetchDetail,
  };
};

export default useProjectDetail;
