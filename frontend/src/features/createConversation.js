import api from "../../utils/axios";

export const createConversation = async () => {
    try{
        console.log("Creating new Conversation...");
        const {data} = await api.post("/api/chat/conversation");
        console.log("Conversation crreated: ",data)
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}