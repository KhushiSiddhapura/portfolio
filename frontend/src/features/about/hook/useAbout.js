import { useState, useEffect, useCallback } from 'react';
import aboutApi from '../api/aboutApi';
import { initialAboutState } from '../state/aboutState';

export const useAbout = () => {
  const [data, setData] = useState(initialAboutState);

  const fetchAboutData = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [profile, experience, achievements] = await Promise.all([
        aboutApi.getProfile().catch(() => null),
        aboutApi.getExperience().catch(() => []),
        aboutApi.getAchievements().catch(() => []),
      ]);

      setData({
        profile,
        experience: experience || [],
        achievements: achievements || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to load about details',
      }));
    }
  }, []);

  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]);

  return {
    ...data,
    refetch: fetchAboutData,
  };
};

export default useAbout;
