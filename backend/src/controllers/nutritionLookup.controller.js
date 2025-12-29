import { getNutritionFromGemini } from "../services/geminiNutrition.service.js";
import httpStatus from "http-status";

export const getFoodNutritionAI = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Food query required" });
    }

    const nutrition = await getNutritionFromGemini(query);

    return res.json({
      name: query,
      calories: nutrition.calories,
      protein: nutrition.protein,
    });
  } catch (error) {
    console.error("Nutrition AI Error:", error.message);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to analyze food",
      error: error.message,
    });
  }
};