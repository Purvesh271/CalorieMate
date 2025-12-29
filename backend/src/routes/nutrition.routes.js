import { Router } from "express";
import { addFood, getTodayNutrition, deleteFood } from "../controllers/nutrition.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/add", protect, addFood);
router.get("/today", protect, getTodayNutrition);
router.delete("/food/:foodId", protect, deleteFood);

export default router;
