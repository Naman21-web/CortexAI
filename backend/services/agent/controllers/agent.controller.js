import axios from 'axios';
import { graph } from '../graph/graph.js';

export const agent = async (req,res) => {
    try{
        const {prompt,conversationId} = req.body;
        await axios.post(`${process.env.CHAT_SERVICE}/message`,{
            conversationId,
            role:"user",
            content:prompt
        });
        const result = await graph.invoke({
            prompt,
            conversationId
        });
        const response=result.aiResponse;
        return res.status(200).json(response);
    }
    catch(error){
        console.error("Error while conversation:", error);
        res.status(500).json({ message: "Error while  conversation" });
    }
} 