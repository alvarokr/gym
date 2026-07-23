import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { capitalizeFirst, formatDateKey, isWeekend } from "@/lib/exercises"

const WEEKDAY_LABELS = ["L", "M", "X", "J", "V", "S", "D"]

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function buildMonthGrid(monthDate: Date): Date[] {
  const first = startOfMonth(monthDate)
  const firstWeekdayMonBased = (first.getDay() + 6) % 7
  const gridStart = new Date(first)
  gridStart.setDate(first.getDate() - firstWeekdayMonBased)

  const days: Date[] = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart)
    d.setDate(gridStart.getDate() + i)
    days.push(d)
  }
  return days
}

export default function CalendarPage() {
  const navigate = useNavigate()
  const today = new Date()
  const [monthCursor, setMonthCursor] = useState(startOfMonth(today))

  const days = buildMonthGrid(monthCursor)
  const monthLabel = capitalizeFirst(
    monthCursor.toLocaleDateString("es-ES", { month: "long", year: "numeric" })
  )

  return (
    <div className="flex min-h-screen flex-col px-4 pt-6 pb-8">
      <header className="mb-6">
        <h1 className="text-xl font-semibold">GymBack</h1>
        <p className="text-sm text-muted-foreground">Ejercicios de espalda</p>
      </header>

      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Mes anterior"
          onClick={() => setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="text-base font-medium">{monthLabel}</span>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Mes siguiente"
          onClick={() => setMonthCursor((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="py-1">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const inMonth = day.getMonth() === monthCursor.getMonth()
          const weekend = isWeekend(day)
          const isToday = isSameDay(day, today)
          const disabled = !inMonth || weekend

          return (
            <button
              key={day.toISOString()}
              disabled={disabled}
              onClick={() => navigate(`/day/${formatDateKey(day)}`)}
              className={[
                "aspect-square rounded-lg text-sm transition-colors",
                !inMonth ? "text-muted-foreground/30" : "",
                inMonth && weekend ? "text-muted-foreground/50" : "",
                inMonth && !weekend ? "hover:bg-accent" : "",
                isToday ? "bg-primary text-primary-foreground font-semibold hover:bg-primary/90" : "",
                disabled && inMonth ? "cursor-not-allowed" : "",
              ].join(" ")}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Toca un día entre semana para ver los ejercicios
      </p>
    </div>
  )
}
