export function StatCard({ title, value, unit, icon: Icon, variant = "default" }) {
  const variantStyles = {
    default: "bg-white border-[#E8F9EE]",
    success: "bg-gradient-to-br from-[#E8F9EE] to-white border-[#4CAF50]/20",
    warning: "bg-gradient-to-br from-[#FFF3E0] to-white border-[#FF9800]/20",
    danger: "bg-gradient-to-br from-red-50 to-white border-red-200",
  }

  const iconColors = {
    default: "bg-[#4CAF50]/10 text-[#4CAF50]",
    success: "bg-[#4CAF50] text-white",
    warning: "bg-[#FF9800] text-white",
    danger: "bg-red-500 text-white",
  }

  return (
    <div className={`${variantStyles[variant]} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[#333333]/60 mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#333333]">{value}</span>
            {unit && <span className="text-lg text-[#333333]/70 font-medium">{unit}</span>}
          </div>
        </div>
        {Icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${iconColors[variant]}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}
