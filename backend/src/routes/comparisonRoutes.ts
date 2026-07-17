import { Router } from "express";
import type { Response } from "express";
import Comparison from "../schema/comparisonSchema.js";

const router = Router();

router.get("/", async (req: any, res: Response) => {
  try {
    const comparisons = await (Comparison as any).find().sort({ createdAt: -1 });
    res.status(200).json(comparisons);
  } catch (error: any) {
    console.error("Get comparisons error:", error.message);
    res.status(500).json({ error: error.message || "Failed to get comparisons" });
  }
});

router.post("/", async (req: any, res: Response) => {
  try {
    const { name, model1, model2, judgeModel } = req.body;

    if (!name || !model1 || !model2) {
      return res.status(400).json({ error: "Name, model1, and model2 are required" });
    }

    const comparison = new Comparison({ name, model1, model2, judgeModel });
    await comparison.save();

    const all = await (Comparison as any).find().sort({ createdAt: -1 });
    res.status(201).json(all);
  } catch (error: any) {
    console.error("Save comparison error:", error.message);
    res.status(500).json({ error: error.message || "Failed to save comparison" });
  }
});

router.delete("/:id", async (req: any, res: Response) => {
  try {
    await (Comparison as any).findByIdAndDelete(req.params.id);
    const all = await (Comparison as any).find().sort({ createdAt: -1 });
    res.status(200).json(all);
  } catch (error: any) {
    console.error("Delete comparison error:", error.message);
    res.status(500).json({ error: error.message || "Failed to delete comparison" });
  }
});

export default router;
