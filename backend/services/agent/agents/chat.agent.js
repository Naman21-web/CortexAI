import { getModel } from "../config/llmModels"

export const chatAgent = async (state) => {
    const llm = await getModel("chat");
    const systemPrompt = "You are CortexAI, an intelligent AI assistant.";
    const response = await llm.invoke([
        {
            "role":"system",
            "content":systemPrompt
        },
        {
            "role":"human",
            "content":state.prompt
        }
    ])

    console.log("Chat Agent Res: ",response);

    return {
        ...state,
        aiResponse: response.content
    }
}