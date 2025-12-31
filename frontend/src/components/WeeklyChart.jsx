export function WeeklyChart({ data }) {
  
  // guard: no data
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-muted-foreground">
        No weekly data available
      </div>
    );
  }

  // calculate safe max value
  const values = data.flatMap((d) => [d.consumed || 0, d.target || 0]);
  const rawMax = Math.max(...values);

  // prevent division by zero / NaN
  const maxValue = rawMax > 0 ? rawMax * 1.1 : 100;

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-64">
        {data.map((item) => {
          const consumed = item.consumed || 0;
          const target = item.target || 0;

          const consumedHeight = (consumed / maxValue) * 100;
          const targetHeight = (target / maxValue) * 100;

          const isOverTarget = consumed > target;

          return (
            <div
              key={item.date}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="w-full flex flex-col justify-end h-64 relative">
                {/* Target Line */}
                <div
                  className="absolute w-full border-t-2 border-dashed border-muted-foreground/40"
                  style={{ bottom: `${targetHeight}%` }}
                />

                {/* Bar */}
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    isOverTarget ? "bg-secondary" : "bg-primary"
                  } hover:opacity-80`}
                  style={{ height: `${consumedHeight}%` }}
                  title={`${consumed} kcal`}
                />
              </div>

              {/* Date Label */}
              <span className="text-xs font-medium text-muted-foreground">
                {item.date}
              </span>
            </div>
          );
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
  );
}