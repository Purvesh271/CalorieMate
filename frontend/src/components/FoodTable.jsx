"use client"

import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"

export function FoodTable({ foods, onDelete }) {
  if (foods.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center border border-[#E8F9EE]">
        <p className="text-[#333333]/60">No food items added yet. Start by adding your meals!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E8F9EE]">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#E8F9EE] to-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-[#333333]">Food Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[#333333]">Calories</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-[#333333]">Protein</th>
              {foods[0]?.time && <th className="px-6 py-4 text-left text-sm font-bold text-[#333333]">Time</th>}
              {onDelete && <th className="px-6 py-4 text-left text-sm font-bold text-[#333333]">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8F9EE]">
            {foods.map((food) => (
              <tr key={food.id} className="hover:bg-[#E8F9EE]/30 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-[#333333]">{food.name}</td>
                <td className="px-6 py-4 text-sm text-[#333333]/70">{food.calories} kcal</td>
                <td className="px-6 py-4 text-sm text-[#333333]/70">{food.protein}g</td>
                {food.time && <td className="px-6 py-4 text-sm text-[#333333]/70">{food.time}</td>}
                {onDelete && (
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(food.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-[#E8F9EE]">
        {foods.map((food) => (
          <div key={food.id} className="p-4 hover:bg-[#E8F9EE]/30 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-[#333333]">{food.name}</h4>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(food.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 -mt-2 -mr-2 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-[#333333]/70">
              <span>{food.calories} kcal</span>
              <span>•</span>
              <span>{food.protein}g protein</span>
              {food.time && (
                <>
                  <span>•</span>
                  <span>{food.time}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
