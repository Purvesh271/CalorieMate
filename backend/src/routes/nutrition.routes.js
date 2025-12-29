import { Router } from "express";
import httpStatus from "http-status";
import { addFood, getTodayNutrition } from "../controllers/nutrition.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/add", protect, addFood);
router.get("/today", protect, getTodayNutrition);

export default router;
