export function WeeklyChart({ data }) {
  const maxValue = Math.max(...data.map((d) => Math.max(d.consumed, d.target))) * 1.1

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-64">
        {data.map((item) => {
          const consumedHeight = (item.consumed / maxValue) * 100
          const isOverTarget = item.consumed > item.target

          return (
            <div key={item.date} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end h-full relative">
                {/* Target Line */}
                <div
                  className="absolute w-full border-t-2 border-dashed border-muted-foreground/30"
                  style={{ bottom: `${(item.target / maxValue) * 100}%` }}
                />

                {/* Bar */}
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    isOverTarget ? "bg-secondary" : "bg-primary"
                  } hover:opacity-80 cursor-pointer`}
                  style={{ height: `${consumedHeight}%` }}
                  title={`${item.consumed} kcal`}
                />
              </div>

              {/* Date Label */}
              <span className="text-xs font-medium text-muted-foreground">{item.date}</span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span className="text-muted-foreground">Within Target</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-secondary" />
          <span className="text-muted-foreground">Over Target</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 border-t-2 border-dashed border-muted-foreground/50" />
          <span className="text-muted-foreground">Target Line</span>
        </div>
      </div>
    </div>
  )
}
