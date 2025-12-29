import { getNutritionFromGemini } from "../services/geminiNutrition.service.js";

export const getFoodNutritionAI = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Food query required" });
    }

    const nutrition = await getNutritionFromGemini(query);

    res.json({
      name: query,
      ...nutrition,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to analyze food",
      error: error.message,
    });
  }
};