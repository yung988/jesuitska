"use client"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const pages = [
    { id: "dashboard", label: "Dashboard" },
    { id: "tasks", label: "Úkoly" },
    { id: "bookings", label: "Rezervace" },
    { id: "lost-found", label: "Ztráty&Nálezy" },
    { id: "schedule", label: "Rozvrh" },
    { id: "concierge", label: "Concierge" },
    { id: "stock", label: "Sklad" },
  ]

  return (
    <nav className="flex items-center gap-1">
      {pages.map((page) => (
        <Button
          key={page.id}
          variant={currentPage === page.id ? "default" : "ghost"}
          className={`px-4 py-2 text-sm ${
            currentPage === page.id
              ? "bg-gray-900 text-white hover:bg-gray-800"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
          onClick={() => onPageChange(page.id)}
        >
          {page.label}
        </Button>
      ))}
    </nav>
  )
}
