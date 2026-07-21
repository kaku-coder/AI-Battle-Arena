import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      default: "guest",
    },
    solution_1: String,
    solution_2: String,
    model_1: String,
    model_2: String,
    judge_model: String,
    winner: String,
    judge: {
      solution_1_score: Number,
      solution_2_score: Number,
      solution_1_response: String,
      solution_2_response: String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Chat", chatSchema);