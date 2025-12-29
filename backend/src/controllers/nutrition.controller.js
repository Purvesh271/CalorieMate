import { NutritionLog } from "../models/logs.model.js";
import httpStatus from "http-status";

/* =======================
   ADD FOOD
   ======================= */
export const addFood = async (req, res) => {
  try {
    const { foodName, calories, protein } = req.body;
    const userId = req.user._id;

    if (!foodName || calories == null) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid food data" });
    }

    // NORMALIZE DATE TO MIDNIGHT
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ONE LOG PER DAY
    let log = await NutritionLog.findOne({
      user: userId,
      date: today,
    });

    if (!log) {
      log = new NutritionLog({
        user: userId,
        date: today,
        foods: [],
        totalCalories: 0,
        totalProtein: 0,
      });
    }

    log.foods.push({
      foodName,
      calories,
      protein: protein || 0,
    });

    log.totalCalories += calories;
    log.totalProtein += protein || 0;

    await log.save();

    return res.status(httpStatus.CREATED).json({
      message: "Food added successfully",
      log,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

/* =======================
   GET TODAY'S NUTRITIONS
   ======================= */
export const getTodayNutrition = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = await NutritionLog.findOne({
      user: req.user._id,
      date: today,
    });

    return res.json({
      todayLog: log || null,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

/* =======================
   DELETE FOOD LOG
   ======================= */
export const deleteFood = async (req, res) => {
  try {
    const { foodId } = req.params;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = await NutritionLog.findOne({
      user: req.user._id,
      date: today,
    });

    if (!log) {
      return res.status(404).json({ message: "No nutrition log found" });
    }

    const food = log.foods.id(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // UPDATE TOTALS
    log.totalCalories -= food.calories;
    log.totalProtein -= food.protein || 0;

    // REMOVE FOOD
    food.deleteOne();

    await log.save();

    return res.json({ message: "Food deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
