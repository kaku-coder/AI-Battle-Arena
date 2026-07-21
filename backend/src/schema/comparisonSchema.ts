import mongoose from "mongoose";

const comparisonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model1: {
      type: String,
      required: true,
    },
    model2: {
      type: String,
      required: true,
    },
    judgeModel: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comparison", comparisonSchema);
