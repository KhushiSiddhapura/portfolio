import axiosInstance from '../../../../services/axiosInstance';

export const adminMessagesApi = {
  getMessages: async (params = {}) => {
    const res = await axiosInstance.get('/admin/messages', { params });
    return res.data;
  },
  markRead: async (id, isRead) => {
    const res = await axiosInstance.patch(`/admin/messages/${id}/read`, { isRead });
    return res.data;
  },
  deleteMessage: async (id) => {
    const res = await axiosInstance.delete(`/admin/messages/${id}`);
    return res.data;
  },
};

export default adminMessagesApi;

