"use client"

import { Trash2 } from "lucide-react"
import { Button } from "./ui/button"

export function FoodTable({ foods, onDelete }) {
  if (!foods || foods.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
        <p className="text-gray-500">No food items added yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-4 text-left">Food Name</th>
            <th className="px-6 py-4 text-left">Calories</th>
            <th className="px-6 py-4 text-left">Protein</th>
            {onDelete && <th className="px-6 py-4">Action</th>}
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food._id} className="border-t">
              <td className="px-6 py-4 font-semibold">
                {food.foodName}
              </td>

              <td className="px-6 py-4">
                {food.calories} kcal
              </td>

              <td className="px-6 py-4">
                {food.protein} g
              </td>

              {onDelete && (
                <td className="px-6 py-4 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(food._id)}
                    className="text-red-500"
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
  )
}