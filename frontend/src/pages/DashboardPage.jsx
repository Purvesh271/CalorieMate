"use client";

import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { StatCard } from "../components/StatCard";
import { ProgressBar } from "../components/ProgressBar";
import { FoodTable } from "../components/FoodTable";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Target, TrendingUp, Apple, Plus } from "lucide-react";
import withAuth from "../utils/withAuth.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { calculateNutritionGoals } from "../utils/nutritionCalculator.js";
import { showSuccess, showError } from "../utils/toast";


function DashboardPage() {
  const {
    userData,
    isAuthenticated,
    getUserProfile,
    getNutritionHistory,
  } = useAuth();

  /* =======================
     STATE
     ======================= */
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  /* =======================
     FETCH PROFILE
     ======================= */
  useEffect(() => {
    if (isAuthenticated && !userData) {
      getUserProfile();
    }
  }, [isAuthenticated]);

  /* =======================
     FETCH TODAY LOG
     ======================= */
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchToday = async () => {
      try {
        const data = await getNutritionHistory();
        setFoods(data.todayLog?.foods || []);
      } catch (err) {
        console.error("Failed to load today’s foods");
      }
    };

    fetchToday();
  }, [isAuthenticated]);

  /* =======================
     AUTH GUARD
     ======================= */
  if (!isAuthenticated) return null;

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  /* =======================
     GOALS
     ======================= */
  const { calories, protein } = calculateNutritionGoals(
    userData.data.currentWeight,
    userData.data.targetWeight
  );

  /* =======================
     CALCULATIONS
     ======================= */
  const consumedCalories = foods.reduce((s, f) => s + f.calories, 0);
  const consumedProtein = foods.reduce((s, f) => s + (f.protein || 0), 0);
  const remainingCalories = Math.max( 0, Math.round(calories - consumedCalories) );

  /* =======================
     ADD FOOD
     ======================= */
  const handleAddFood = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);

    try {
      // 1️ Analyze food with Gemini
      const res = await fetch(
        `http://localhost:8080/api/v1/nutrition-lookup/ai?query=${encodeURIComponent(
          searchTerm
        )}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "AI analysis failed");
      }

      const nutrition = await res.json();

      // 2️ Save directly to today log
      const saveRes = await fetch(
        "http://localhost:8080/api/v1/nutrition/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            foodName: nutrition.name,
            calories: nutrition.calories,
            protein: nutrition.protein,
          }),
        }
      );

      if (!saveRes.ok) {
        const err = await saveRes.json();
        throw new Error(err.message || "Failed to save food");
      }

      // 3️ REFRESH FROM BACKEND
      const data = await getNutritionHistory();
      setFoods(data.todayLog?.foods || []);

      setSearchTerm("");

      showSuccess("Food added successfully");
    } catch (err) {
      showError(err.message || "Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  
  /* =======================
      DELETE FOOD LOG
      ======================= */
  const handleDelete = async (foodId) => {
    try {
      await fetch(
        `http://localhost:8080/api/v1/nutrition/food/${foodId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // refetch today's log
      const data = await getNutritionHistory();
      setFoods(data.todayLog?.foods || []);
    } catch (error) {
      showError("Failed to delete food");
    }
  };

  /* =======================
     RENDER
     ======================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F9EE] to-[#F7F7F7]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Track your daily nutrition and reach your goals
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Daily Target" value={calories} unit="kcal" icon={Target} />
          <StatCard title="Calories Consumed" value={consumedCalories} unit="kcal" icon={Apple} variant="success" />
          <StatCard title="Protein Consumed" value={consumedProtein} unit="g" icon={TrendingUp} variant="success" />
          <StatCard
            title="Remaining"
            value={remainingCalories}
            unit="kcal"
            icon={Target}
            variant={remainingCalories < 0 ? "warning" : "default"}
          />
        </div>

        {/* Progress */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <ProgressBar value={consumedCalories} max={calories} label="Calories" />
          <ProgressBar value={consumedProtein} max={protein} label="Protein (g)" />
        </div>

        {/* Add Food */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Add Food</h2>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                placeholder="e.g. 100g paneer, 2 eggs and toast"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12"
              />
            </div>

            <Button
              onClick={handleAddFood}
              disabled={loading}
              className="h-12 px-6 whitespace-nowrap"
            >
              <Plus className="w-5 h-5 mr-2" />
              {loading ? "Adding..." : "Add Food"}
            </Button>
          </div>
        </div>

        {/* Food Table */}
        <FoodTable foods={foods} onDelete={handleDelete} />
      </main>
    </div>
  );
}

export default withAuth(DashboardPage);