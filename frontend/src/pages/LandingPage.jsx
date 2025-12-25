import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Target, Apple, BarChart3, TrendingUp, CheckCircle2, Flame, Clock, Award } from "lucide-react"

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E8F9EE] to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#4CAF50]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="CalorieMate Logo" className="w-12 h-12" />
              <span className="text-2xl font-bold text-[#333333]">CalorieMate</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-[#333333] hover:text-[#4CAF50] font-medium transition-colors">
                Features
              </a>
              <Link to="/login" className="text-[#333333] hover:text-[#4CAF50] font-medium transition-colors">
                Login
              </Link>
              <Link to="/signup">
                <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white px-6 h-11 rounded-xl shadow-md">
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="md:hidden flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-[#333333]">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#333333] mb-6 leading-tight text-balance">
                Track your calories and protein <span className="text-[#4CAF50]">effortlessly.</span>
              </h1>
              <p className="text-xl text-[#333333]/70 mb-10 leading-relaxed text-pretty max-w-2xl mx-auto lg:mx-0">
                Your personal nutrition companion powered by smart tracking. Reach your fitness goals with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup">
                  <Button className="bg-[#4CAF50] hover:bg-[#45a049] text-white h-14 px-10 text-lg rounded-xl shadow-lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="h-14 px-10 text-lg rounded-xl border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#E8F9EE] bg-transparent"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Illustration */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  {/* Progress Card */}
                  <div className="bg-gradient-to-br from-[#E8F9EE] to-white rounded-2xl p-6 border border-[#4CAF50]/20">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#4CAF50] rounded-xl flex items-center justify-center shadow-md">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-[#333333]/60 font-medium">Daily Target</p>
                        <p className="text-2xl font-bold text-[#333333]">2000 kcal</p>
                      </div>
                    </div>
                    <div className="w-full bg-[#E8F9EE] rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] h-4 rounded-full shadow-inner transition-all duration-500"
                        style={{ width: "68%" }}
                      />
                    </div>
                    <p className="text-sm text-[#333333]/70 mt-3 font-medium">1,360 / 2,000 kcal consumed</p>
                  </div>

                  {/* Nutrition Icons */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-md border border-[#4CAF50]/10 text-center">
                      <Apple className="w-8 h-8 text-[#4CAF50] mx-auto mb-2" />
                      <p className="text-xs text-[#333333]/70 font-medium">Nutrition</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 :(bg-white rounded-xl p-4 shadow-md border border-[#FF9800]/10 text-center">
                      <BarChart3 className="w-8 h-8 text-[#FF9800] mx-auto mb-2" />
                      <p className="text-xs text-[#333333]/70 font-medium">Analytics</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border border-[#4CAF50]/10 text-center">
                      <Flame className="w-8 h-8 text-[#FF9800] mx-auto mb-2" />
                      <p className="text-xs text-[#333333]/70 font-medium">Progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#333333] mb-4">Everything you need to stay healthy</h2>
            <p className="text-xl text-[#333333]/70 max-w-2xl mx-auto text-pretty">
              Track your nutrition, monitor progress, and achieve your fitness goals with CalorieMate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Target}
              title="Track Calories & Protein"
              description="Monitor your daily intake with precision and stay within your goals"
              color="#4CAF50"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Smart Nutrition Goals"
              description="Set personalized targets based on your weight and fitness objectives"
              color="#FF9800"
            />
            <FeatureCard
              icon={BarChart3}
              title="Daily Progress & History"
              description="View detailed analytics and track your journey over time"
              color="#4CAF50"
            />
            <FeatureCard
              icon={Clock}
              title="Fast API-based Search"
              description="Quickly find and log foods from our comprehensive database"
              color="#FF9800"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#E8F9EE]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#333333] mb-8 leading-tight">
                Simple, effective nutrition tracking
              </h2>
              <div className="space-y-5">
                <BenefitItem text="Easy food search and logging" />
                <BenefitItem text="Real-time calorie and macro tracking" />
                <BenefitItem text="Weekly progress charts and insights" />
                <BenefitItem text="Personalized nutrition goals" />
                <BenefitItem text="Mobile-friendly responsive interface" />
              </div>
              <Link to="/signup">
                <Button className="mt-10 bg-[#4CAF50] hover:bg-[#45a049] text-white h-12 px-8 text-base rounded-xl shadow-lg">
                  Start Tracking Today
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-[#E8F9EE]">
                    <div className="w-14 h-14 rounded-full bg-[#4CAF50] flex items-center justify-center shadow-md">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-[#333333]/60 font-medium">Your Progress</p>
                      <p className="text-2xl font-bold text-[#4CAF50]">On Track!</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#333333] font-medium">Calories</span>
                      <span className="text-[#4CAF50] font-bold">1,360 / 2,000</span>
                    </div>
                    <div className="w-full bg-[#E8F9EE] rounded-full h-3">
                      <div className="bg-[#4CAF50] h-3 rounded-full" style={{ width: "68%" }} />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[#333333] font-medium">Protein</span>
                      <span className="text-[#FF9800] font-bold">85 / 150g</span>
                    </div>
                    <div className="w-full bg-[#FFF3E0] rounded-full h-3">
                      <div className="bg-[#FF9800] h-3 rounded-full" style={{ width: "57%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 text-balance">
            Ready to take control of your nutrition?
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed text-pretty">
            Join thousands of users tracking their way to better health and fitness
          </p>
          <Link to="/signup">
            <Button className="bg-white hover:bg-white/95 text-[#4CAF50] h-14 px-10 text-lg font-semibold rounded-xl shadow-xl">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E8F9EE] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.png" alt="CalorieMate Logo" className="w-10 h-10" />
              <span className="text-xl font-bold text-[#333333]">CalorieMate</span>
            </Link>
            <p className="text-[#333333]/60 text-center">© 2025 CalorieMate. Your partner in nutrition tracking.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description, color }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-[#E8F9EE]">
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-md"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>
      <h3 className="text-xl font-bold text-[#333333] mb-3 leading-tight">{title}</h3>
      <p className="text-[#333333]/70 leading-relaxed">{description}</p>
    </div>
  )
}

function BenefitItem({ text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-6 h-6 rounded-full bg-[#4CAF50] flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-4 h-4 text-white" />
      </div>
      <p className="text-[#333333] text-lg">{text}</p>
    </div>
  )
}

export default LandingPage
