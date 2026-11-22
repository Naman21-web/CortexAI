import api from "../../utils/axios";

export const getConversations = async (userId) => {
    if (!userId) {
        return [];
    }

    try{
        const {data} = await api.get("/api/chat/conversations");
        return data;
    }
    catch(error){
        console.error("Failed to fetch conversations:", error);
        return [];
    }
}