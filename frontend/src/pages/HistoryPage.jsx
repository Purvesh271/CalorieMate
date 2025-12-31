"use client";

import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { StatCard } from "../components/StatCard";
import { ProgressBar } from "../components/ProgressBar";
import { FoodTable } from "../components/FoodTable";
import { WeeklyChart } from "../components/WeeklyChart";
import { Target, TrendingUp } from "lucide-react";
import withAuth from "../utils/withAuth.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { calculateNutritionGoals } from "../utils/nutritionCalculator.js";

/* =========================
   HELPERS
========================= */
const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getDayLabel = (date) => {
  return dayLabels[new Date(date).getDay()];
};

function HistoryPage() {
  const { getWeeklyNutritionHistory, userData, getUserProfile } = useAuth();

  const [weeklyLogs, setWeeklyLogs] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      if (!userData) {
        await getUserProfile();
      }

      const data = await getWeeklyNutritionHistory();
      setWeeklyLogs(data);

      if (data.length > 0) {
        setSelectedDay(getDayLabel(data[data.length - 1].date));
      }
    };

    fetchData();
  }, []);

  /* =========================
     NORMALIZE DATA
  ========================= */
  const historyByDay = {};

  weeklyLogs.forEach((log) => {
    const day = getDayLabel(log.date);

    historyByDay[day] = {
      calories: Math.round(log.totalCalories),
      protein: Number(log.totalProtein.toFixed(1)),
      foods: log.foods,
    };
  });

  const availableDays = Object.keys(historyByDay);
  const currentData = historyByDay[selectedDay];

  if (!currentData || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading history...
      </div>
    );
  }

  /* =========================
     TARGETS (SAME AS DASHBOARD)
  ========================= */
  const { calories, protein } = calculateNutritionGoals(
    userData.data.currentWeight,
    userData.data.targetWeight
  );

  /* =========================
     WEEKLY CHART DATA (CALORIES)
  ========================= */
  const weeklyData = availableDays.map((day) => ({
    date: day,
    consumed: historyByDay[day].calories,
    target: calories,
  }));

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F9EE] to-[#F7F7F7]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#333333] mb-2">
            History
          </h1>
          <p className="text-[#333333]/70">
            View your nutrition history for the past week
          </p>
        </div>

        {/* Day Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#333333] mb-4">
            Select Day
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {availableDays.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all shadow-md ${
                  selectedDay === day
                    ? "bg-[#4CAF50] text-white scale-105"
                    : "bg-white text-[#333333] hover:bg-[#E8F9EE]"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Calories Consumed"
            value={currentData.calories}
            unit="kcal"
            icon={TrendingUp}
            variant="success"
          />

          <StatCard
            title="Daily Calorie Target"
            value={calories}
            unit="kcal"
            icon={Target}
          />

          <StatCard
            title="Protein Consumed"
            value={currentData.protein}
            unit="g"
            icon={TrendingUp}
            variant="success"
          />

          <StatCard
            title="Daily Protein Target"
            value={protein}
            unit="g"
            icon={Target}
          />
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-[#E8F9EE]">
          <h2 className="text-xl font-bold text-[#333333] mb-4">
            Daily Progress
          </h2>

          <ProgressBar
            value={currentData.calories}
            max={calories}
            label="Calories"
          />

          <ProgressBar
            value={currentData.protein}
            max={protein}
            label="Protein (g)"
          />
        </div>

        {/* Foods */}
        {currentData.foods.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#333333] mb-4">
              Food Consumed
            </h2>
            <FoodTable foods={currentData.foods} />
          </div>
        )}

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8F9EE]">
          <h2 className="text-xl font-bold text-[#333333] mb-6">
            Weekly Calorie Overview
          </h2>
          <WeeklyChart data={weeklyData} />
        </div>
      </main>
    </div>
  );
}

export default withAuth(HistoryPage);
