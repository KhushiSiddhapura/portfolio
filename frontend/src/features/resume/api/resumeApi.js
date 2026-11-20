import axiosInstance from '../../../services/axiosInstance';

export const resumeApi = {
  getProfile: async () => {
    const res = await axiosInstance.get('/profile');
    return res.data.data;
  },
  getResume: async () => {
    const res = await axiosInstance.get('/resume');
    return res.data.data;
  },
  getExperience: async () => {
    const res = await axiosInstance.get('/experience');
    return res.data.data;
  },
  getSkills: async () => {
    const res = await axiosInstance.get('/skills');
    return res.data.data;
  },
  getProjects: async () => {
    const res = await axiosInstance.get('/projects');
    return res.data.data;
  },
  getAchievements: async () => {
    const res = await axiosInstance.get('/achievements');
    return res.data.data;
  },
};

export default resumeApi;

