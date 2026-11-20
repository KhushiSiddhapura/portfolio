import axiosInstance from '../../../../services/axiosInstance';

export const adminAuthApi = {
  login: async (credentials) => {
    const res = await axiosInstance.post('/auth/login', credentials);
    return res.data;
  },
};

export default adminAuthApi;

