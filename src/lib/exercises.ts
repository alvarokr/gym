export interface Exercise {
  id: string
  name: string
  info: string
  video: string
}

export interface Round {
  repeat: number
  exercises: string[]
}

export type DayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday"

export interface DaySchedule {
  rounds: Round[]
}

export interface Week {
  id: number
  days: Partial<Record<DayKey, DaySchedule>>
}

export interface ExercisesData {
  exercises: Exercise[]
  weeks: Week[]
}

const DAY_KEYS: Record<number, DayKey | undefined> = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

export function getDayKey(date: Date): DayKey | null {
  return DAY_KEYS[date.getDay()] ?? null
}

export function getISOWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

export function getWeekForDate(data: ExercisesData, date: Date): Week | undefined {
  const isoWeek = getISOWeekNumber(date)
  const weekId = isoWeek % 2 === 1 ? 1 : 2
  return data.weeks.find((w) => w.id === weekId) ?? data.weeks[0]
}

export function getExerciseById(data: ExercisesData, id: string): Exercise | undefined {
  return data.exercises.find((e) => e.id === id)
}

export function formatDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function youtubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
