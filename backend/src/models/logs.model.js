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

// Ensure a user can have only one log per date
nutritionLogSchema.index(
  { user: 1, date: 1 },
  { unique: true }
);

const NutritionLog = mongoose.model("NutritionLog", nutritionLogSchema);
export { NutritionLog };