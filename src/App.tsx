import { BrowserRouter, Routes, Route } from "react-router-dom"
import CalendarPage from "@/pages/CalendarPage"
import DayPage from "@/pages/DayPage"

function App() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-neutral-900">
      <div className="min-h-screen w-full max-w-[430px] bg-background text-foreground">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CalendarPage />} />
            <Route path="/day/:date" element={<DayPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
