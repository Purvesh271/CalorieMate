import { Navbar } from "../components/Navbar"
import { User, LogOut, Scale, Target, Droplets } from "lucide-react"
import { Button } from "../components/ui/button"

function ProfilePage() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    initial: "J",
  }

  const weightInfo = {
    current: 75,
    target: 70,
    toLose: 5,
  }

  const nutritionGoals = {
    dailyCalories: 2000,
    protein: 150,
    water: 2.5,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F9EE] to-[#F7F7F7]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#333333] mb-2">Profile</h1>
          <p className="text-[#333333]/70">Manage your account and nutrition goals</p>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 text-center border border-[#E8F9EE]">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-5xl font-bold text-white">{user.initial}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#333333] mb-2">{user.name}</h1>
          <p className="text-[#333333]/70">{user.email}</p>
        </div>

        {/* Weight Information */}
        <div className="bg-gradient-to-br from-[#E8F9EE] to-white rounded-2xl p-6 shadow-lg mb-6 border border-[#4CAF50]/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#4CAF50] flex items-center justify-center shadow-md">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[#333333]">Weight Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-md">
              <p className="text-sm text-[#333333]/60 mb-2 font-medium">Current Weight</p>
              <p className="text-3xl font-bold text-[#333333]">{weightInfo.current} kg</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md">
              <p className="text-sm text-[#333333]/60 mb-2 font-medium">Target Weight</p>
              <p className="text-3xl font-bold text-[#4CAF50]">{weightInfo.target} kg</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md">
              <p className="text-sm text-[#333333]/60 mb-2 font-medium">Weight to Lose</p>
              <p className="text-3xl font-bold text-[#FF9800]">{weightInfo.toLose} kg</p>
            </div>
          </div>
        </div>

        {/* Nutrition Goals */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 border border-[#E8F9EE]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#FF9800]/20 flex items-center justify-center shadow-md">
              <Target className="w-6 h-6 text-[#FF9800]" />
            </div>
            <h2 className="text-xl font-bold text-[#333333]">Nutrition Goals</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-4 border-b border-[#E8F9EE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <span className="font-semibold text-[#333333]">Daily Calorie Target</span>
              </div>
              <span className="text-xl font-bold text-[#333333]">{nutritionGoals.dailyCalories} kcal</span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-[#E8F9EE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF9800]/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#FF9800]" />
                </div>
                <span className="font-semibold text-[#333333]">Recommended Protein</span>
              </div>
              <span className="text-xl font-bold text-[#333333]">{nutritionGoals.protein}g</span>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <span className="font-semibold text-[#333333]">Recommended Water</span>
              </div>
              <span className="text-xl font-bold text-[#333333]">{nutritionGoals.water}L</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white h-12 text-base font-semibold rounded-xl shadow-lg">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </main>
    </div>
  )
}

export default ProfilePage
