import axiosInstance from '../../../services/axiosInstance';

export const experienceApi = {
  getExperience: async () => {
    const res = await axiosInstance.get('/experience');
    return res.data.data;
  },
};

export default experienceApi;
