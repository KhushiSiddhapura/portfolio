import axiosInstance from '../../../services/axiosInstance';

export const achievementsApi = {
  getAchievements: async () => {
    const res = await axiosInstance.get('/achievements');
    return res.data.data;
  },
};

export default achievementsApi;
