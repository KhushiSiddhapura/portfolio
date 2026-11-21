import axiosInstance from "../../../services/axiosInstance";

export const contactApi = {
  sendMessage: async (payload) => {
    const res = await axiosInstance.post("/messages", payload);
    return res.data;
  },
};

export default contactApi;
