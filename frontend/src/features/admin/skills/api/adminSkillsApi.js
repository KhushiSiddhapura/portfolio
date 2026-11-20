import axiosInstance from '../../../../services/axiosInstance';

export const adminSkillsApi = {
  getSkills: async () => {
    const res = await axiosInstance.get('/admin/skills');
    return res.data.data;
  },
  createSkill: async (skillData) => {
    const res = await axiosInstance.post('/admin/skills', skillData);
    return res.data.data;
  },
  updateSkill: async (id, skillData) => {
    const res = await axiosInstance.put(`/admin/skills/${id}`, skillData);
    return res.data.data;
  },
  deleteSkill: async (id) => {
    const res = await axiosInstance.delete(`/admin/skills/${id}`);
    return res.data;
  },
};

export default adminSkillsApi;

