import { VideoOff } from "lucide-react"
import type { Exercise } from "@/lib/exercises"
import { youtubeThumbnail } from "@/lib/exercises"

interface ExerciseCardProps {
  exerciseId: string
  exercise: Exercise | undefined
  onPlay: () => void
}

export function ExerciseCard({ exerciseId, exercise, onPlay }: ExerciseCardProps) {
  const title = exercise ? exercise.name : exerciseId

  return (
    <div className="flex gap-3 py-3">
      <div className="flex w-1/2 shrink-0 flex-col items-center">
        {exercise ? (
          <button
            onClick={onPlay}
            className="block w-full overflow-hidden rounded-md"
            aria-label={`Ver vídeo de ${exercise.name}`}
          >
            <img
              src={youtubeThumbnail(exercise.video)}
              alt={exercise.name}
              className="aspect-video w-full object-cover"
              loading="lazy"
            />
          </button>
        ) : (
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-1 rounded-md bg-muted text-muted-foreground">
            <VideoOff className="size-6" />
            <span className="text-[10px]">Vídeo no encontrado</span>
          </div>
        )}
        <span className="mt-1 w-full truncate text-center text-[10px] text-muted-foreground">
          {exerciseId}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug font-medium break-words">{title}</p>
        {exercise && <p className="mt-0.5 text-sm text-muted-foreground">{exercise.info}</p>}
      </div>
    </div>
  )
}
