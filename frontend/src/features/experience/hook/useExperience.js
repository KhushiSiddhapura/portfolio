import { useState, useEffect, useCallback } from 'react';
import experienceApi from '../api/experienceApi';
import { initialExperienceState } from '../state/experienceState';

export const useExperience = () => {
  const [data, setData] = useState(initialExperienceState);

  const fetchExperience = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const items = await experienceApi.getExperience();
      setData({
        experience: items || [],
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || 'Failed to load experience',
      }));
    }
  }, []);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  return {
    ...data,
    refetch: fetchExperience,
  };
};

export default useExperience;
