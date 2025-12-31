"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Label } from "../components/Label"
import { useAuth } from "../contexts/AuthContext.jsx"
import { showSuccess, showError } from "../utils/toast";


function SignupPage() {
  // const navigate = useNavigate()
  const { handleRegister } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    currentWeight: "",
    targetWeight: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SIGNUP SUBMIT CLICKED"); 
    try {
      await handleRegister(
        formData.name,
        formData.email,
        formData.password,
        Number(formData.currentWeight),
        Number(formData.targetWeight)
      );
      showSuccess("Account created successfully. Please login.");
    } catch (err) {
      showError(err.message || "Signup failed");
    }

  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F9EE] to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-5">
          <Link to="/" className="flex items-center justify-center gap-3 mb-3">
            <img src="/logo.png" alt="CalorieMate Logo" className="w-14 h-14" />
            <span className="text-3xl font-bold text-[#333333]">CalorieMate</span>
          </Link>
          <h1 className="text-4xl font-bold text-[#333333] mb-3">Create Your Account</h1>
          <p className="text-[#333333]/70 text-lg">Start your nutrition tracking journey today</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-6 border border-[#E8F9EE]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentWeight">Current Weight (kg)</Label>
                <Input
                  id="currentWeight"
                  name="currentWeight"
                  type="number"
                  placeholder="75"
                  value={formData.currentWeight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                <Input
                  id="targetWeight"
                  name="targetWeight"
                  type="number"
                  placeholder="70"
                  value={formData.targetWeight}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-6">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#333333]/70">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4CAF50] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-[#333333]/70 hover:text-[#333333]">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
