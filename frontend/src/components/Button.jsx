export function Button({ children, className = "", variant = "primary", ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variants = {
    primary: "bg-[#4CAF50] hover:bg-[#45a049] text-white focus:ring-[#4CAF50] shadow-md",
    secondary: "bg-[#FF9800] hover:bg-[#f57c00] text-white focus:ring-[#FF9800] shadow-md",
    outline: "border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white",
    ghost: "text-[#333333] hover:bg-[#E8F9EE]",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
