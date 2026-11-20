import { useState, useEffect, useCallback } from 'react';
import resumeApi from '../api/resumeApi';
import { initialResumeState } from '../state/resumeState';

export const useResume = () => {
  const [data, setData] = useState(initialResumeState);

  const fetchResumeData = useCallback(async () => {
    setData((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const [profile, resumeInfo, experience, skills, projects, achievements] = await Promise.all([
        resumeApi.getProfile().catch(() => null),
        resumeApi.getResume().catch(() => null),
        resumeApi.getExperience().catch(() => []),
        resumeApi.getSkills().catch(() => []),
        resumeApi.getProjects().catch(() => []),
        resumeApi.getAchievements().catch(() => []),
      ]);
      setData({
        profile,
        resumeInfo,
        experience: Array.isArray(experience) ? experience : [],
        skills: Array.isArray(skills) ? skills : [],
        projects: Array.isArray(projects) ? projects : [],
        achievements: Array.isArray(achievements) ? achievements : [],
        loading: false,
        error: null,
      });
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to load resume details',
      }));
    }
  }, []);

  useEffect(() => {
    fetchResumeData();
  }, [fetchResumeData]);

  const downloadOrPrint = () => {
    if (data.resumeInfo?.resumeUrl) {
      window.open(data.resumeInfo.resumeUrl, '_blank');
    } else {
      window.print();
    }
  };

  return {
    ...data,
    downloadOrPrint,
    refetch: fetchResumeData,
  };
};

export default useResume;

