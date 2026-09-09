import redis from "../../../shared/redis/redis.js";
import { getMessages } from "../utils/getMessages.js";

export const getMemory = async (conversationId) => {
    try{
        const key = `messages-${conversationId}`;
        const cachedMemory = await redis.get(key);
        if(cachedMemory){
            return JSON.parse(cachedMemory);
        }
        const messages = await getMessages(conversationId);
        await redis.set(key,JSON.stringify(messages),"EX",24*60*60);
        return messages;
    }
    catch(error){
        console.log(error);
        return null;
    }     
}

export const addMessage = async (conversationId,role,content) => {
    const key = `messages-${conversationId}`;
    const cachedMemory = await redis.get(key);
    const messages = cachedMemory ? JSON.parse(cachedMemory) : [];
    messages.push({
        role,content
    });
    if(messages.length>20){
        messages.shift();
    }
    await redis.set(key,JSON.stringify(messages),"EX",24*60*60);
}