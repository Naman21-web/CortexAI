import api from "../../utils/axios";

export const sendMessage = async (payload) => {
    const {data} = await api.post("api/agent/chat",payload);
    return data;
}