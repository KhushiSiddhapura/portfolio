import axiosInstance from '../../../../services/axiosInstance';

export const adminResumeApi = {
  getProfile: async () => {
    const res = await axiosInstance.get('/profile');
    return res.data.data;
  },
  updateProfile: async (data) => {
    const res = await axiosInstance.put('/admin/profile', data);
    return res.data.data;
  },
  uploadResume: async (formData) => {
    const res = await axiosInstance.post('/admin/resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

export default adminResumeApi;

