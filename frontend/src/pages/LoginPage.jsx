"use client"

import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Label } from "../components/Label"
import { useAuth } from "../contexts/AuthContext.jsx"
import withAuth from "../utils/withAuth.jsx"

function LoginPage() {
  // const navigate = useNavigate()
  const { handleLogin } = useAuth();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   navigate("/dashboard")
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F9EE] to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-5">
          <Link to="/" className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.png" alt="CalorieMate Logo" className="w-14 h-14" />
            <span className="text-3xl font-bold text-[#333333]">CalorieMate</span>
          </Link>
          <h1 className="text-4xl font-bold text-[#333333] mb-3">Welcome Back</h1>
          <p className="text-[#333333]/70 text-lg">Sign in to continue tracking your nutrition</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#E8F9EE]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base mt-6">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#333333]/70">
              {"Don't have an account? "}
              <Link to="/signup" className="text-[#4CAF50] font-semibold hover:underline">
                Sign up
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

export default LoginPage;
