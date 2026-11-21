import { useQuery } from "@tanstack/react-query";
import aboutApi from "../api/aboutApi";

export const useAbout = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["aboutData"],
    queryFn: async () => {
      const [profile, experience, achievements] = await Promise.all([
        aboutApi.getProfile().catch(() => null),
        aboutApi.getExperience().catch(() => []),
        aboutApi.getAchievements().catch(() => []),
      ]);

      return {
        profile,
        experience: experience || [],
        achievements: achievements || [],
      };
    },
  });

  return {
    profile: data?.profile || null,
    experience: data?.experience || [],
    achievements: data?.achievements || [],
    loading: isLoading,
    error: error ? error.message : null,
    refetch,
  };
};

export default useAbout;
