import { getModel } from "../config/llmModels.js"

export const router = async (state) => {

    if(state.agent && state.agent!=="auto"){
        return {
            ...state,
            agent: state.agent
        }
    }

    console.log("state.file.mimetype: ",state.file.mimetype)
    if(state.file){
        if(state.file.mimetype === "application/pdf"){
            return {
                ...state,
                agent: "pdfRag"
            }
        }

        if(state.file.mimetype.startsWith("image/")){
            return {
                ...state,
                agent: "imageAnalyzer"
            }
        }
    }

    const llm = await getModel("router");
    const prompt = `
You are an agent router.

Available agents:
- chat
- search
- coding
- pdf
- ppt
- vision

Rules:

chat:
General conversation,
explanations,
learning,
questions.

search:
Current events,
latest information,
news,
recent developments,
internet lookup.

coding:
Generate code,
build projects code,
API Design,
technical architecture,
programming questions.

pdf:
PDF generation,
document creation,
formatted reports.

ppt:
Presentation creation,
slide deck generation.

vision:
Image generation,
visual creation.

Task:
Analyze the user input and determine which agent is best suited.
Respond ONLY with the agent name.

User Query:
    ${state.prompt}
    `
    const response = await llm.invoke(prompt);
    console.log("Router Agent Res: ",response);

    return {
        ...state,
        agent: response.content.trim().toLowerCase()
    }
}