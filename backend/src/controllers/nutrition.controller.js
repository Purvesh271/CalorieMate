import httpStatus from "http-status";
import { NutritionLog } from "../models/logs.model.js";

export const addFood = async (req, res) => {
  try {
    const { foodName, calories, protein = 0 } = req.body;
    const userId = req.user._id;

    if (!foodName || !calories) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "Food name and calories are required",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    let log = await NutritionLog.findOne({
      user: userId,
      date: today,
    });

    if (!log) {
      log = new NutritionLog({
        user: userId,
        date: today,
        foods: [],
      });
    }

    log.foods.push({ foodName, calories, protein });
    log.totalCalories += calories;
    log.totalProtein += protein;

    await log.save();

    return res.status(httpStatus.OK).json({
      message: "Food added successfully",
      todayLog: log,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to add food",
      error: error.message,
    });
  }
};

export const getTodayNutrition = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    const log = await NutritionLog.findOne({
      user: userId,
      date: today,
    });

    return res.status(httpStatus.OK).json({
      todayLog: log || {
        totalCalories: 0,
        totalProtein: 0,
        foods: [],
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch today's nutrition",
    });
  }
};