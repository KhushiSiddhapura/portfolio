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
};

export default resumeApi;

