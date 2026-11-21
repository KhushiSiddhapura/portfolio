import axiosInstance from "../../../../services/axiosInstance";

export const adminAchievementsApi = {
  getAchievements: async () => {
    const res = await axiosInstance.get("/admin/achievements");
    return res.data.data;
  },
  createAchievement: async (payload) => {
    const res = await axiosInstance.post("/admin/achievements", payload);
    return res.data.data;
  },
  updateAchievement: async (id, payload) => {
    const res = await axiosInstance.put(`/admin/achievements/${id}`, payload);
    return res.data.data;
  },
  deleteAchievement: async (id) => {
    const res = await axiosInstance.delete(`/admin/achievements/${id}`);
    return res.data;
  },
};

export default adminAchievementsApi;
