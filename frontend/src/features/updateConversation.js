import api from "../../utils/axios";

export const updateConversation = async (payload,conversationId) => {
    try{
        console.log("Updating new Conversation...");
        const {data} = await api.put(`/api/chat/conversation/${conversationId}`,payload);
        console.log("Conversation updated: ",data)
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}