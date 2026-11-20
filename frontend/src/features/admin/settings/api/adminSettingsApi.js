import axiosInstance from '../../../../services/axiosInstance';

export const adminSettingsApi = {
  getSettings: async () => {
    const res = await axiosInstance.get('/settings');
    return res.data;
  },

  updateSettings: async (settingsData) => {
    const res = await axiosInstance.put('/admin/settings', settingsData);
    return res.data;
  },
};

export default adminSettingsApi;
