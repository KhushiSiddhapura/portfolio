import { useQuery } from '@tanstack/react-query';
import projectsApi from '../api/projectsApi';

export const useProjectDetail = (slug) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['projectDetail', slug],
    queryFn: async () => {
      if (!slug) return null;
      const res = await projectsApi.getProjectBySlug(slug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return res;
    },
    enabled: Boolean(slug),
  });

  return {
    project: data?.project || null,
    navigation: data?.navigation || { prev: null, next: null },
    loading: isLoading,
    error: error ? (error.response?.data?.message || error.message) : null,
    refetch,
  };
};

export default useProjectDetail;
