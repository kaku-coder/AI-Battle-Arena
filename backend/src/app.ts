import express from "express"
import type { Request, Response } from "express"
import graph from "./services/grap.ai.service.js"
import cors from 'cors'
import Chat from "./schema/chatSchema.js"

const app = express()

app.use(express.json())
app.use(cors())

app.post("/graph", async (req: Request, res: Response) => {
    try {
        const problem = req.body.problem || req.body.message;
        if (!problem) {
            return res.status(400).json({ error: "problem or message is required" })
        }

        const result = await graph(problem);

        const responseData = {
            ...result,
            model_1: "Mistral Large",
            model_2: "Cohere Command R+",
            judge_model: "Llama 3.3 (Groq)"
        };

        try {
            const newChat = new Chat({
                problem,
                userId: req.body.userId || "guest",
                solution_1: responseData.solution_1,
                solution_2: responseData.solution_2,
                model_1: responseData.model_1,
                model_2: responseData.model_2,
                judge_model: responseData.judge_model,
                winner: responseData.winner,
                judge: responseData.judge
            });
            await newChat.save();
        } catch (dbError) {
            console.error("Failed to save chat to database:", dbError);
        }

        res.status(200).json(responseData);
    } catch (error: any) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message || "An error occurred." })
    }
})

app.get("/history", async (req: Request, res: Response) => {
    try {
        const history = await Chat.find().sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error: any) {
        console.error("Failed to get history:", error);
        res.status(500).json({ error: error.message || "An error occurred." });
    }
});

export default app;