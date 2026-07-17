import { Router } from "express";
import type { Request, Response } from "express";
import Chat from "../schema/chatSchema.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const allChats = await Chat.find().sort({ createdAt: -1 });

    const modelStats: Record<string, {
      name: string;
      provider: string;
      matches: number;
      wins: number;
      totalScore: number;
    }> = {};

    const modelProviders: Record<string, string> = {
      "Mistral Large": "Mistral AI",
      "Cohere Command R+": "Cohere",
      "Gemini 2.0 Flash": "Google",
    };

    for (const chat of allChats) {
      const m1 = chat.model_1 || "Model A";
      const m2 = chat.model_2 || "Model B";

      if (!modelStats[m1]) {
        modelStats[m1] = {
          name: m1,
          provider: modelProviders[m1] || "Unknown",
          matches: 0,
          wins: 0,
          totalScore: 0,
        };
      }
      if (!modelStats[m2]) {
        modelStats[m2] = {
          name: m2,
          provider: modelProviders[m2] || "Unknown",
          matches: 0,
          wins: 0,
          totalScore: 0,
        };
      }

      modelStats[m1].matches += 1;
      modelStats[m2].matches += 1;

      modelStats[m1].totalScore += chat.judge?.solution_1_score || 0;
      modelStats[m2].totalScore += chat.judge?.solution_2_score || 0;

      if (chat.winner === "solution_1") {
        modelStats[m1].wins += 1;
      } else if (chat.winner === "solution_2") {
        modelStats[m2].wins += 1;
      }
    }

    const models = Object.values(modelStats)
      .map((model, index) => {
        const avgScore = model.matches > 0
          ? parseFloat((model.totalScore / model.matches).toFixed(1))
          : 0;
        const winRate = model.matches > 0
          ? Math.round((model.wins / model.matches) * 100)
          : 0;
        const elo = 1000 + (winRate * 5) + (avgScore * 20);

        return {
          rank: 0,
          name: model.name,
          provider: model.provider,
          elo: Math.round(elo),
          matches: model.matches,
          winRate,
          avgScore,
          wins: model.wins,
          status: "Active",
        };
      })
      .sort((a, b) => b.elo - a.elo)
      .map((model, index) => ({
        ...model,
        rank: index + 1,
        badge: index === 0 ? "🏆" : index === 1 ? "🥈" : index === 2 ? "🥉" : "",
      }));

    const totalMatches = allChats.length;
    const totalModels = models.length;
    const avgRating = models.length > 0
      ? Math.round(models.reduce((sum, m) => sum + m.elo, 0) / models.length)
      : 1000;

    res.status(200).json({
      models,
      stats: {
        totalMatches,
        activeCompetitors: totalModels,
        averageRating: avgRating,
      },
    });
  } catch (error: any) {
    console.error("Leaderboard error:", error.message);
    res.status(500).json({ error: error.message || "Failed to get leaderboard" });
  }
});

export default router;
