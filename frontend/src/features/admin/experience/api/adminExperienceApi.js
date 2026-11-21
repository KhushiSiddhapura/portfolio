import axiosInstance from "../../../../services/axiosInstance";

export const adminExperienceApi = {
  getExperience: async () => {
    const res = await axiosInstance.get("/admin/experience");
    return res.data.data;
  },
  createExperience: async (payload) => {
    const res = await axiosInstance.post("/admin/experience", payload);
    return res.data.data;
  },
  updateExperience: async (id, payload) => {
    const res = await axiosInstance.put(`/admin/experience/${id}`, payload);
    return res.data.data;
  },
  deleteExperience: async (id) => {
    const res = await axiosInstance.delete(`/admin/experience/${id}`);
    return res.data;
  },
};

export default adminExperienceApi;
