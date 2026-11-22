import { getModel } from "../config/llmModels.js"
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { readFile, unlink } from "node:fs/promises";
import { deductCredits } from "../utils/deductCredits.js";

export const imageAmalyzer = async (state) => {
    try {
        const llm = await getModel("imageAnalyzer");
        const imageBuffer = await readFile(state.file.path);
        const base64image = imageBuffer.toString("base64");
        const messages = [
            new SystemMessage(
                `
                    You are CortexAi Image Analyzer Agent.
                    Rules:
                    - Analyze only the uploaded image.
                    - Answer the user question accurately.
                    - If text exists in the image,extract it.
                    - If charts or tables exist, explain them
                    -If something is unclear, say so.
                    - Use Markdown when helpful.
                    - Do not hallucinate. 
                `
            ),
            new HumanMessage(
                {
                    content:[
                        {
                            type:"text",
                            text:state.prompt ?? "Analyze the image"
                        },
                        {
                            type:"image_url",
                            image_url:{
                                url: `data:${state.file.mimetype};base64,${base64image}`
                            }
                        },
                    ]                        
                }
            )
        ]
        const response = await llm.invoke(messages);

        await deductCredits(state.userId,"vision");

        return {
            ...state,
            aiResponse: response.content 
        }
    } catch (err) {
        console.log(err);
        return {
            ...state,
            aiResponse: "Failed to anaalyze file"
        }
    }
    finally{
        if(state.file?.path){
            await unlink(state.file.path);
        }
    }
}