import axiosInstance from '../../../services/axiosInstance';

export const authApi = {
  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data;
  },
  getMe: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },
};

export default authApi;
