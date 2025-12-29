import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getFoodNutritionAI } from "../controllers/nutritionLookup.controller.js";

const router = Router();

router.get("/ai", protect, getFoodNutritionAI);

export default router;
