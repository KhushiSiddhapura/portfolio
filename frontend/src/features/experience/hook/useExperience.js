import { useQuery } from '@tanstack/react-query';
import experienceApi from '../api/experienceApi';

export const useExperience = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['experienceData'],
    queryFn: async () => {
      const items = await experienceApi.getExperience();
      return items || [];
    },
  });

  return {
    experience: data || [],
    loading: isLoading,
    error: error ? (error.response?.data?.message || error.message) : null,
    refetch,
  };
};

export default useExperience;
