import axiosInstance from '../../../services/axiosInstance';

export const aboutApi = {
  getProfile: async () => {
    const res = await axiosInstance.get('/profile');
    return res.data.data;
  },
  getExperience: async () => {
    const res = await axiosInstance.get('/experience');
    return res.data.data;
  },
  getAchievements: async () => {
    const res = await axiosInstance.get('/achievements');
    return res.data.data;
  },
};

export default aboutApi;

