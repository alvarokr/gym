import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExerciseCard } from "@/components/ExerciseCard"
import { VideoDialog } from "@/components/VideoDialog"
import { useExercisesData } from "@/hooks/use-exercises-data"
import {
  capitalizeFirst,
  getDayKey,
  getExerciseById,
  getWeekForDate,
  parseDateKey,
} from "@/lib/exercises"

export default function DayPage() {
  const { date } = useParams<{ date: string }>()
  const navigate = useNavigate()
  const { data, loading, error } = useExercisesData()
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null)

  const day = date ? parseDateKey(date) : null
  const dateLabel = day
    ? capitalizeFirst(
        day.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })
      )
    : ""

  const dayKey = day ? getDayKey(day) : null
  const week = data && day ? getWeekForDate(data, day) : undefined
  const schedule = week && dayKey ? week.days[dayKey] : undefined

  return (
    <div className="flex min-h-screen flex-col px-4 pt-6 pb-8">
      <header className="mb-4 flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" aria-label="Volver al calendario" onClick={() => navigate("/")}>
          <ChevronLeft className="size-4" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold">{dateLabel}</h1>
          {week && <p className="text-xs text-muted-foreground">Semana {week.id}</p>}
        </div>
      </header>

      {loading && <p className="text-sm text-muted-foreground">Cargando ejercicios…</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {!loading && !error && !dayKey && (
        <p className="text-sm text-muted-foreground">No hay ejercicios programados este día.</p>
      )}

      {!loading && !error && dayKey && !schedule && (
        <p className="text-sm text-muted-foreground">
          No hay rutina definida para este día en la semana {week?.id ?? "?"}.
        </p>
      )}

      {data && schedule && (
        <div className="flex flex-col gap-6">
          {schedule.rounds.map((round, i) => (
            <section key={i}>
              <h2 className="mb-1 text-sm font-semibold text-muted-foreground">
                {round.repeat} {round.repeat === 1 ? "Ronda" : "Rondas"}
              </h2>
              <div className="divide-y divide-border">
                {round.exercises.map((exerciseId) => {
                  const exercise = getExerciseById(data, exerciseId)
                  return (
                    <ExerciseCard
                      key={exerciseId}
                      exerciseId={exerciseId}
                      exercise={exercise}
                      onPlay={() =>
                        exercise && setActiveVideo({ id: exercise.video, title: exercise.name })
                      }
                    />
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      <VideoDialog
        videoId={activeVideo?.id ?? null}
        title={activeVideo?.title ?? ""}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  )
}
