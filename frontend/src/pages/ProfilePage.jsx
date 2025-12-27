import { Navbar } from "../components/Navbar"
import { User, LogOut, Scale, Target, Droplets } from "lucide-react"
import { Button } from "../components/ui/button"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useEffect } from "react"
import withAuth from "../utils/withAuth.jsx"
import { calculateNutritionGoals } from "../utils/nutritionCalculator.js"

function ProfilePage() {

  const { handleLogout, getUserProfile, userData } = useAuth();

  useEffect(() => {
    getUserProfile();
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const currentWeight = userData.data.currentWeight;
  const targetWeight = userData.data.targetWeight;

  const { calories, protein, water } = calculateNutritionGoals(
    currentWeight,
    targetWeight
  );


  const weightDifference = targetWeight - currentWeight;

  let weightLabel = "";
  let weightValue = 0;
  let weightColor = "";

  if (weightDifference > 0) {
    weightLabel = "Weight to Gain";
    weightValue = weightDifference;
    weightColor = "text-[#4CAF50]";
  } else if (weightDifference < 0) {
    weightLabel = "Weight to Lose";
    weightValue = Math.abs(weightDifference);
    weightColor = "text-[#FF9800]";
  } else {
    weightLabel = "Maintaining Weight";
    weightValue = 0;
    weightColor = "text-[#333333]";
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
            <span className="text-5xl font-bold text-white">{userData.data.name.charAt(0)}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#333333] mb-2">{userData.data.name}</h1>
          <p className="text-[#333333]/70">{userData.data.email}</p>
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
              <p className="text-3xl font-bold text-[#333333]">{userData.data.currentWeight} kg</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md">
              <p className="text-sm text-[#333333]/60 mb-2 font-medium">Target Weight</p>
              <p className="text-3xl font-bold text-[#4CAF50]">{userData.data.targetWeight} kg</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-md">
              <p className="text-sm text-[#333333]/60 mb-2 font-medium">{weightLabel}</p>
              <p className={`text-3xl font-bold ${weightColor}`}>{weightValue} kg</p>
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
              <span className="text-xl font-bold text-[#333333]">{calories} kcal</span>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-[#E8F9EE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF9800]/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#FF9800]" />
                </div>
                <span className="font-semibold text-[#333333]">Recommended Protein</span>
              </div>
              <span className="text-xl font-bold text-[#333333]">{protein}g</span>
            </div>

            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#4CAF50]/10 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <span className="font-semibold text-[#333333]">Recommended Water</span>
              </div>
              <span className="text-xl font-bold text-[#333333]">{water}L</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 text-white h-12 text-base font-semibold rounded-xl shadow-lg">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </main>
    </div>
  )
}

export default withAuth(ProfilePage);
