import { useQuery } from "@tanstack/react-query";
import achievementsApi from "../api/achievementsApi";

export const useAchievements = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["achievementsData"],
    queryFn: async () => {
      const items = await achievementsApi.getAchievements();
      return items || [];
    },
  });

  return {
    achievements: data || [],
    loading: isLoading,
    error: error ? error.response?.data?.message || error.message : null,
    refetch,
  };
};

export default useAchievements;
