import { getModel } from "../config/llmModels.js"

export const codingAgent = async (state) => {
    const intentLlm = await getModel("intent");
    const codingLlm = await getModel("coding");
    const intentRes = await intentLlm.invoke(`
        You are an intent classifier.
        Return ONLY one of these values.
        CODE_GENERATION
        CODE_REVIEW
        CODE_EXPLANATION
        DEBUGGING
        OPTIMIZATION
        CONVERSION
        DOCUMENTATION

        User Request:
        ${state.prompt}
    `);
    const intent = intentRes.content;
    if(intent=="CODE_GENERATION"){
        const prompt = `
            You are CortexAi Coding Agent.
            Generate the requested project.
            
            Default stack:
            - HTML
            - CSS
            - Javascript

            Use React / Next.js / Vue ON;Y if explicitly requested.

            Rules:
            - Responsive
            - Modern UI
            - CSS Variables
            - Flexbox/Grid
            - Smooth Scroll
            - Hover Effects
            - Beautiful Spacing
            - Single page unless user asks otherwise.

            IMAGES
            ======================
            Always use real working unsplash images.
            Never use placeholders.

            Return ONLY valid JSON.

            Schema:
            {
                "files":[
                    {
                        "name":"index.html",
                        "content":"..."
                    },
                    {
                        "name":"style.css",
                        "content":"..."
                    },
                    {
                        "name":"script.js",
                        "content":"..."
                    },
                ]
            }
            
            Rules:
            - Output must start   with {
            - Output must end with }
            - No markdown
            -  No Explanation
            - No extra text
            - No "\"\"
            - Never mention intent

            User Request:
            ${state.prompt}
        `
        const res = await codingLlm.invoke(prompt);
        const data = await JSON.parse(res?.content);
        console.log("Coding Agent Res: ",data);
        return {
            ...state,
            aiResponse: "Code Generated Successfully",
            artifacts: [
              {
                id: Date.now(),
                type: "Project",
                files: data.files ?? [],
                title: state.prompt
              }  
            ]
        }
    }
    const res = await codingLlm.invoke(`
        The user's request is:
        ${intent}
        Return Markdown only.
        Use headings like:
        # Overview
        ## Explanation
        ## Problems
        ## Imporvements
        ## Best Practices
        ## Optimized Code(if needed)
        User Request:
        ${state.prompt}
    `);
    const data = res.content;
    return {
        ...state,
        aiResponse: data,
        artifacts: []
    }
}