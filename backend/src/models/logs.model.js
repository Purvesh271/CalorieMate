import mongoose from "mongoose";

const nutritionLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    totalCalories: {
      type: Number,
      default: 0,
    },

    totalProtein: {
      type: Number,
      default: 0,
    },

    foods: [
      {
        foodName: {
          type: String,
          required: true,
        },
        calories: {
          type: Number,
          required: true,
        },
        protein: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

const NutritionLog = mongoose.model("NutritionLog", nutritionLogSchema);
export { NutritionLog };