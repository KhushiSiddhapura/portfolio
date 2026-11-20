import axiosInstance from '../../../../services/axiosInstance';

export const adminProjectsApi = {
  getProjects: async (params = {}) => {
    const res = await axiosInstance.get('/admin/projects', { params });
    return res.data.data;
  },
  getProjectById: async (id) => {
    const res = await axiosInstance.get(`/admin/projects/${id}`);
    return res.data.data;
  },
  createProject: async (payload) => {
    const res = await axiosInstance.post('/admin/projects', payload);
    return res.data.data;
  },
  updateProject: async (id, payload) => {
    const res = await axiosInstance.put(`/admin/projects/${id}`, payload);
    return res.data.data;
  },
  deleteProject: async (id) => {
    const res = await axiosInstance.delete(`/admin/projects/${id}`);
    return res.data;
  },
  updateProjectStatus: async (id, statusPayload) => {
    const res = await axiosInstance.patch(`/admin/projects/${id}/status`, statusPayload);
    return res.data.data;
  },
  duplicateProject: async (id) => {
    const res = await axiosInstance.post(`/admin/projects/${id}/duplicate`);
    return res.data.data;
  },
};

export default adminProjectsApi;

