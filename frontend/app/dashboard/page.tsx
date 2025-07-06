'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { WelcomeSection } from "@/components/welcome-section"
import { StatsGrid } from "@/components/stats-grid"
import { ChartsSection } from "@/components/charts-section"
import { BottomSection } from "@/components/bottom-section"
import { BookingsList } from "@/components/bookings-list"
import { QuickBookingForm } from "@/components/quick-booking-form"

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1">
          <div className="flex items-center gap-2 border-b px-4 py-2">
            <SidebarTrigger />
            <DashboardHeader />
          </div>
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              <WelcomeSection />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <BookingsList />
                </div>
                <div>
                  <QuickBookingForm />
                </div>
              </div>
              <StatsGrid />
              <ChartsSection />
              <BottomSection />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
