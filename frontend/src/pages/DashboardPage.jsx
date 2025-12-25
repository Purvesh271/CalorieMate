"use client"

import { useState } from "react"
import { Navbar } from "../components/Navbar"
import { StatCard } from "../components/StatCard"
import { ProgressBar } from "../components/ProgressBar"
import { FoodTable } from "../components/FoodTable"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Target, TrendingUp, Apple, Search, Plus } from "lucide-react"
import withAuth from "../utils/withAuth.jsx"

function DashboardPage() {
  const [foods, setFoods] = useState([
    { id: "1", name: "Greek Yogurt with Honey", calories: 180, protein: 15 },
    { id: "2", name: "Grilled Chicken Breast", calories: 284, protein: 53 },
    { id: "3", name: "Brown Rice Bowl", calories: 216, protein: 5 },
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const dailyTarget = 2000
  const proteinTarget = 150
  const consumedCalories = foods.reduce((sum, food) => sum + food.calories, 0)
  const consumedProtein = foods.reduce((sum, food) => sum + food.protein, 0)
  const remainingCalories = dailyTarget - consumedCalories

  const handleDelete = (id) => {
    setFoods(foods.filter((food) => food.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F9EE] to-[#F7F7F7]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Dashboard</h1>
          <p className="text-[#333333]/70">Track your daily nutrition and reach your goals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Daily Target" value={dailyTarget} unit="kcal" icon={Target} variant="default" />
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

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-[#E8F9EE]">
          <h2 className="text-xl font-bold text-[#333333] mb-6">Today's Progress</h2>
          <div className="space-y-6">
            <ProgressBar value={consumedCalories} max={dailyTarget} label="Calories" />
            <ProgressBar value={consumedProtein} max={proteinTarget} label="Protein (g)" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-[#E8F9EE]">
          <h2 className="text-xl font-bold text-[#333333] mb-6">Add Food</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#333333]/40" />
              <Input
                type="text"
                placeholder="Search for food (e.g., chicken breast, rice)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Button className="h-12 px-6">
              <Plus className="w-5 h-5 mr-2" />
              Add Food
            </Button>
          </div>
          <p className="text-sm text-[#333333]/60 mt-3">Search from our comprehensive food database</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#333333] mb-4">Today's Food</h2>
          <FoodTable foods={foods} onDelete={handleDelete} />
        </div>

        <div className="bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-2xl p-6 shadow-lg text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white/80 mb-1">Total Today</p>
              <p className="text-3xl font-bold">{consumedCalories} kcal</p>
            </div>
            <div className="h-12 w-px bg-white/30 hidden sm:block" />
            <div>
              <p className="text-white/80 mb-1">Total Protein</p>
              <p className="text-3xl font-bold">{consumedProtein}g</p>
            </div>
            <div className="h-12 w-px bg-white/30 hidden sm:block" />
            <div>
              <p className="text-white/80 mb-1">Remaining</p>
              <p className="text-3xl font-bold">{remainingCalories} kcal</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default withAuth(DashboardPage);
