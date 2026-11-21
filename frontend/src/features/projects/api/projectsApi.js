import axiosInstance from "../../../services/axiosInstance";

export const projectsApi = {
  getProjects: async (params = {}) => {
    const res = await axiosInstance.get("/projects", { params });
    return res.data;
  },
  getFeaturedProjects: async () => {
    const res = await axiosInstance.get("/projects/featured");
    return res.data.data;
  },
  getProjectBySlug: async (slug) => {
    const res = await axiosInstance.get(`/projects/${slug}`);
    return res.data.data;
  },
};

export default projectsApi;
