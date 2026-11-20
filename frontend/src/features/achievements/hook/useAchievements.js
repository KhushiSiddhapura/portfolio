import { useState, useEffect, useCallback } from 'react';
import achievementsApi from '../api/achievementsApi';
import { initialAchievementsState } from '../state/achievementsState';

export const useAchievements = () => {
  const [data, setData] = useState(initialAchievementsState);

  const fetchAchievements = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const items = await achievementsApi.getAchievements();
      setData({
        achievements: items || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to load achievements',
      }));
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return {
    ...data,
    refetch: fetchAchievements,
  };
};

export default useAchievements;
