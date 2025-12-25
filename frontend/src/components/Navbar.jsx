"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, LogOut } from "lucide-react"
import { Button } from "./ui/button"

export function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/history", label: "History" },
    { href: "/profile", label: "Profile" },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-[#4CAF50]/10 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-3">
            <img src="/logo.png" alt="CalorieMate Logo" className="w-9 h-9" />
            <span className="text-xl font-bold text-[#333333]">CalorieMate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  pathname === link.href ? "bg-[#4CAF50] text-white shadow-md" : "text-[#333333] hover:bg-[#E8F9EE]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/">
              <Button variant="ghost" size="sm" className="ml-2 text-[#333333] hover:bg-[#E8F9EE] rounded-xl">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-[#E8F9EE]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#333333]" /> : <Menu className="w-6 h-6 text-[#333333]" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8F9EE]">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all mb-2 ${
                  pathname === link.href ? "bg-[#4CAF50] text-white" : "text-[#333333] hover:bg-[#E8F9EE]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold text-[#333333] hover:bg-[#E8F9EE]"
            >
              <LogOut className="w-4 h-4 inline mr-2" />
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
