import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Calendar, Users, ChevronLeft, ChevronRight } from "lucide-react"

const shifts = [
  {
    id: 1,
    employee: "Marie Nováková",
    role: "Pokojská",
    shift: "06:00 - 14:00",
    date: "2025-01-24",
    status: "active",
    tasks: ["Úklid pokojů 201-210", "Kontrola minibarů"],
  },
  {
    id: 2,
    employee: "Tomáš Svoboda",
    role: "Údržbář",
    shift: "08:00 - 16:00",
    date: "2025-01-24",
    status: "active",
    tasks: ["Oprava klimatizace", "Kontrola technických místností"],
  },
  {
    id: 3,
    employee: "Jana Dvořáková",
    role: "Recepční",
    shift: "14:00 - 22:00",
    date: "2025-01-24",
    status: "scheduled",
    tasks: ["Check-in hostů", "Správa rezervací"],
  },
  {
    id: 4,
    employee: "Pavel Novák",
    role: "Noční portýr",
    shift: "22:00 - 06:00",
    date: "2025-01-24",
    status: "scheduled",
    tasks: ["Noční služba", "Bezpečnostní kontroly"],
  },
]

const statusConfig = {
  active: { label: "Aktivní", color: "bg-green-100 text-green-800" },
  scheduled: { label: "Naplánováno", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Dokončeno", color: "bg-gray-100 text-gray-800" },
  absent: { label: "Nepřítomen", color: "bg-red-100 text-red-800" },
}

export function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rozvrh směn</h2>
          <p className="text-gray-600">Plánování a správa pracovních směn</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Nová směna</Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="text-lg font-semibold">Pondělí, 24. ledna 2025</div>
          <Button variant="outline" size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Týden
          </Button>
          <Button variant="outline" size="sm">
            Měsíc
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Aktivní směny</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">6</div>
            <div className="text-sm text-gray-600">Přítomní</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600">Naplánované</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">1</div>
            <div className="text-sm text-gray-600">Nepřítomní</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dnešní směny</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shifts.map((shift) => (
                <div key={shift.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-blue-100 text-blue-800 font-medium">
                          {shift.employee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-gray-900">{shift.employee}</h4>
                        <p className="text-sm text-gray-600">{shift.role}</p>
                      </div>
                    </div>
                    <Badge className={statusConfig[shift.status as keyof typeof statusConfig].color}>
                      {statusConfig[shift.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {shift.shift}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(shift.date).toLocaleDateString("cs-CZ")}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Úkoly:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {shift.tasks.map((task, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Týdenní přehled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"].map((day, index) => (
                <div key={day} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-blue-500" : "bg-gray-300"}`}></div>
                    <span className="font-medium text-gray-900">{day}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{Math.floor(Math.random() * 8) + 4} směn</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
