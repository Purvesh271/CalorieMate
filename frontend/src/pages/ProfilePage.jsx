import { Navbar } from "../components/Navbar";
import { User, LogOut, Scale, Target, Droplets, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useEffect, useState } from "react";
import withAuth from "../utils/withAuth.jsx";
import { calculateNutritionGoals } from "../utils/nutritionCalculator.js";

function ProfilePage() {
  const {
    handleLogout,
    getUserProfile,
    updateUserProfile,
    userData,
  } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    currentWeight: "",
    targetWeight: "",
  });

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.data.name,
        currentWeight: userData.data.currentWeight,
        targetWeight: userData.data.targetWeight,
      });
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const currentWeight = Number(
    isEditing ? formData.currentWeight : userData.data.currentWeight
  );
  const targetWeight = Number(
    isEditing ? formData.targetWeight : userData.data.targetWeight
  );

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    await updateUserProfile({
      name: formData.name,
      currentWeight: Number(formData.currentWeight),
      targetWeight: Number(formData.targetWeight),
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData.data.name,
      currentWeight: userData.data.currentWeight,
      targetWeight: userData.data.targetWeight,
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F9EE] to-[#F7F7F7]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#333333]">Profile</h1>
            <p className="text-[#333333]/70">
              Manage your account and nutrition goals
            </p>
          </div>

          {!isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 text-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] flex items-center justify-center mx-auto mb-4">
            <span className="text-5xl font-bold text-white">
              {formData.name.charAt(0)}
            </span>
          </div>

          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 text-center text-xl font-bold"
            />
          ) : (
            <h2 className="text-2xl font-bold text-[#333333]">
              {userData.data.name}
            </h2>
          )}

          <p className="text-[#333333]/70 mt-1">{userData.data.email}</p>
        </div>

        {/* Weight Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <p className="text-sm mb-2">Current Weight</p>
              {isEditing ? (
                <input
                  type="number"
                  name="currentWeight"
                  value={formData.currentWeight}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              ) : (
                <p className="text-2xl font-bold">
                  {userData.data.currentWeight} kg
                </p>
              )}
            </div>

            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <p className="text-sm mb-2">Target Weight</p>
              {isEditing ? (
                <input
                  type="number"
                  name="targetWeight"
                  value={formData.targetWeight}
                  onChange={handleChange}
                  className="border rounded px-3 py-2 w-full"
                />
              ) : (
                <p className="text-2xl font-bold text-[#4CAF50]">
                  {userData.data.targetWeight} kg
                </p>
              )}
            </div>

            <div className="bg-[#F7F7F7] rounded-xl p-4">
              <p className="text-sm mb-2">{weightLabel}</p>
              <p className={`text-2xl font-bold ${weightColor}`}>
                {weightValue} kg
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 mt-6">
              <Button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600"
              >
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Nutrition Goals */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Nutrition Goals</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Daily Calories</span>
              <span className="font-bold">{calories} kcal</span>
            </div>
            <div className="flex justify-between">
              <span>Protein</span>
              <span className="font-bold">{protein} g</span>
            </div>
            <div className="flex justify-between">
              <span>Water</span>
              <span className="font-bold">{water} L</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </main>
    </div>
  );
}

export default withAuth(ProfilePage);