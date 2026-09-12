import api from "../../utils/axios";

export const updateConversation = async (payload) => {
    try{
        console.log("Updating new Conversation...");
        const {data} = await api.put("/api/chat/conversation",payload);
        console.log("Conversation updated: ",data)
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}