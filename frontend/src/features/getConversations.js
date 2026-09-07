import api from "../../utils/axios";

export const getConversations = async () => {
    try{
        const {data} = await api.get("/api/chat/conversations");
        console.log("Fetched all Conversations: ",data)
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}