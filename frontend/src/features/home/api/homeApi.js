import axiosInstance from "../../../services/axiosInstance";

export const homeApi = {
  getProfile: async () => {
    const res = await axiosInstance.get("/profile");
    return res.data.data;
  },
  getFeaturedProjects: async () => {
    const res = await axiosInstance.get("/projects/featured");
    return res.data.data;
  },
  getSkills: async () => {
    const res = await axiosInstance.get("/skills");
    return res.data;
  },
  getExperience: async () => {
    const res = await axiosInstance.get("/experience");
    return res.data.data;
  },
  getAchievements: async () => {
    const res = await axiosInstance.get("/achievements");
    return res.data.data;
  },
  sendMessage: async (messageData) => {
    const res = await axiosInstance.post("/messages", messageData);
    return res.data;
  },
};

export default homeApi;
