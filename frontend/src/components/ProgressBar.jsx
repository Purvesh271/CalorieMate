export function ProgressBar({ value, max, label, showPercentage = true }) {
  const percentage = Math.min((value / max) * 100, 100)
  const isOverTarget = value > max

  return (
    <div className="space-y-3">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && <span className="font-semibold text-[#333333]">{label}</span>}
          {showPercentage && (
            <span className="text-[#333333]/70 font-medium">
              {value} / {max} {isOverTarget && <span className="text-[#FF9800] font-semibold">(Over)</span>}
            </span>
          )}
        </div>
      )}
      <div className="h-4 bg-[#E8F9EE] rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out shadow-sm ${
            isOverTarget
              ? "bg-gradient-to-r from-[#FF9800] to-[#FF6F00]"
              : "bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
