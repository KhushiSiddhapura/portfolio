import axiosInstance from '../../../../services/axiosInstance';

export const adminProfileApi = {
  getProfile: async () => {
    const res = await axiosInstance.get('/profile');
    return res.data.data;
  },
  updateProfile: async (profileData) => {
    const res = await axiosInstance.put('/admin/profile', profileData);
    return res.data.data;
  },
};

export default adminProfileApi;

