import { Bell, Plus, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
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

      <nav className="flex items-center gap-1">
        {["Dashboard", "Úkoly", "Rezervace", "Ztráty&Nálezy", "Rozvrh", "Concierge", "Sklad"].map((item, index) => (
          <Button
            key={item}
            variant={index === 0 ? "default" : "ghost"}
            className={`px-4 py-2 text-sm ${
              index === 0
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            {item}
          </Button>
        ))}
      </nav>

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
  )
}
