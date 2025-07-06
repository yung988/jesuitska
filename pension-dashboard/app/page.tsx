"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { WelcomeSection } from "@/components/welcome-section"
import { StatsGrid } from "@/components/stats-grid"
import { ChartsSection } from "@/components/charts-section"
import { BottomSection } from "@/components/bottom-section"
import { TasksPage } from "@/components/pages/tasks-page"
import { BookingsPage } from "@/components/pages/bookings-page"
import { LostFoundPage } from "@/components/pages/lost-found-page"
import { SchedulePage } from "@/components/pages/schedule-page"
import { ConciergePage } from "@/components/pages/concierge-page"
import { StockPage } from "@/components/pages/stock-page"
import { Bell, Plus, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderPageContent = () => {
    switch (currentPage) {
      case "tasks":
        return <TasksPage />
      case "bookings":
        return <BookingsPage />
      case "lost-found":
        return <LostFoundPage />
      case "schedule":
        return <SchedulePage />
      case "concierge":
        return <ConciergePage />
      case "stock":
        return <StockPage />
      default:
        return (
          <>
            <WelcomeSection />
            <StatsGrid />
            <ChartsSection />
            <BottomSection />
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Pension Luxury</h1>
              <p className="text-sm text-gray-500">Pon, 24 ledna 2025 • 14:40</p>
            </div>
          </div>
        </div>

        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

        <div className="flex items-center gap-3">
          <Button className="bg-gray-900 text-white hover:bg-gray-800 gap-2">
            <Plus className="w-4 h-4" />
            Přidat úkol
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button variant="ghost" size="icon">
            <Calendar className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="p-6">{renderPageContent()}</main>
    </div>
  )
}
