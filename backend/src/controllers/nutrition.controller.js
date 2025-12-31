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

/* ======================================================
   GET WEEKLY HISTORY (LAST 7 DAYS)
====================================================== */
export const getWeeklyHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);
    startDate.setHours(0, 0, 0, 0);

    const logs = await NutritionLog.find({
      user: userId,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .sort({ date: 1 })
      .select("date totalCalories totalProtein foods");

    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: logs,
    });
  } catch (error) {
    console.error("Weekly History Error:", error.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to fetch weekly history",
    });
  }
};