"use client"

import { useState } from "react"
import { Navbar } from "../components/Navbar"
import { StatCard } from "../components/StatCard"
import { ProgressBar } from "../components/ProgressBar"
import { FoodTable } from "../components/FoodTable"
import { WeeklyChart } from "../components/WeeklyChart"
import { Target, TrendingUp, TrendingDown } from "lucide-react"

const dates = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const mockHistoryData = {
  Mon: {
    consumed: 1850,
    target: 2000,
    foods: [
      { id: "1", name: "Oatmeal with Berries", calories: 320, protein: 12, time: "8:00 AM" },
      { id: "2", name: "Grilled Salmon", calories: 450, protein: 38, time: "1:00 PM" },
      { id: "3", name: "Chicken Salad", calories: 380, protein: 32, time: "7:00 PM" },
    ],
  },
  Tue: { consumed: 2150, target: 2000, foods: [] },
  Wed: { consumed: 1920, target: 2000, foods: [] },
  Thu: { consumed: 2300, target: 2000, foods: [] },
  Fri: { consumed: 1980, target: 2000, foods: [] },
  Sat: { consumed: 2100, target: 2000, foods: [] },
  Sun: { consumed: 1750, target: 2000, foods: [] },
}

function HistoryPage() {
  const [selectedDate, setSelectedDate] = useState("Mon")

  const currentData = mockHistoryData[selectedDate]
  const difference = currentData.consumed - currentData.target

  const weeklyData = dates.map((date) => ({
    date,
    consumed: mockHistoryData[date].consumed,
    target: mockHistoryData[date].target,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F9EE] to-[#F7F7F7]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#333333] mb-2">History</h1>
          <p className="text-[#333333]/70">View your past nutrition data and weekly trends</p>
        </div>

        {/* Date Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#333333] mb-4">Select Date</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all shadow-md ${
                  selectedDate === date
                    ? "bg-[#4CAF50] text-white scale-105"
                    : "bg-white text-[#333333] hover:bg-[#E8F9EE]"
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard title="Daily Target" value={currentData.target} unit="kcal" icon={Target} variant="default" />
          <StatCard title="Consumed" value={currentData.consumed} unit="kcal" icon={TrendingUp} variant="success" />
          <StatCard
            title="Difference"
            value={Math.abs(difference)}
            unit="kcal"
            icon={difference >= 0 ? TrendingUp : TrendingDown}
            variant={difference > 0 ? "warning" : "success"}
          />
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-[#E8F9EE]">
          <h2 className="text-xl font-bold text-[#333333] mb-4">Daily Progress</h2>
          <ProgressBar value={currentData.consumed} max={currentData.target} label="Calories" />
        </div>

        {/* Food Consumed */}
        {currentData.foods.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#333333] mb-4">Food Consumed</h2>
            <FoodTable foods={currentData.foods} />
          </div>
        )}

        {/* Weekly Overview Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8F9EE]">
          <h2 className="text-xl font-bold text-[#333333] mb-6">Weekly Overview</h2>
          <WeeklyChart data={weeklyData} />
        </div>
      </main>
    </div>
  )
}

export default HistoryPage
