import express from "express"
import type { Request, Response } from "express"
import graph from "./services/grap.ai.service.js"

const app = express()

app.use(express.json())

app.post("/graph", async (req: Request, res: Response) => {
    try {
        const problem = req.body.problem || req.body.message;
        if (!problem) {
            return res.status(400).json({ error: "problem or message is required" })
        }

        const result = await graph(problem);
        res.status(200).json(result);
    } catch (error: any) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message || "An error occurred." })
    }
})

export default app;