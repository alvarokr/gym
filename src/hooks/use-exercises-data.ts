import { useEffect, useState } from "react"
import type { ExercisesData } from "@/lib/exercises"

interface State {
  data: ExercisesData | null
  loading: boolean
  error: string | null
}

export function useExercisesData(): State {
  const [state, setState] = useState<State>({ data: null, loading: true, error: null })

  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}exercises.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`No se pudo cargar exercises.json (${res.status})`)
        return res.json() as Promise<ExercisesData>
      })
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error: err.message })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
