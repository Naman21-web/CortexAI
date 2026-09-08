import api from "../../utils/axios";

export const getMessages = async (id) => {
    try{
        const {data} = await api.get(`api/chat/messages/${id}`);
        console.log("Fetched all Messages: ",data)
        return data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}