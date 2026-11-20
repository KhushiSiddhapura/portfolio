import axiosInstance from '../../../../services/axiosInstance';

export const dashboardApi = {
  getStats: async () => {
    const res = await axiosInstance.get('/admin/dashboard');
    return res.data.data;
  },
};

export default dashboardApi;

