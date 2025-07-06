import { Button } from "@/components/ui/button"
import { Hotel, Users } from "lucide-react"

export function WelcomeSection() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-gray-900">Vítejte, Alžběto!</h2>
      <div className="flex items-center gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          <Hotel className="w-4 h-4" />
          Denní audit hotelu
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Users className="w-4 h-4" />
          Concierge
        </Button>
      </div>
    </div>
  )
}
