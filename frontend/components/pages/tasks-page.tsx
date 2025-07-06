import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, User, MapPin, CheckCircle, AlertCircle, Pause } from "lucide-react"

const tasks = [
  {
    id: 1,
    title: "Úklid pokoje 205",
    description: "Kompletní úklid po odjezdu hostů",
    assignee: "Marie Nováková",
    room: "205",
    priority: "high",
    status: "in-progress",
    dueTime: "14:30",
    estimatedTime: "45 min",
  },
  {
    id: 2,
    title: "Oprava kohoutku v koupelně",
    description: "Kapající kohoutek v pokoji 103",
    assignee: "Tomáš Svoboda",
    room: "103",
    priority: "medium",
    status: "pending",
    dueTime: "16:00",
    estimatedTime: "30 min",
  },
  {
    id: 3,
    title: "Doplnění minibar",
    description: "Doplnit nápoje a občerstvení",
    assignee: "Jana Dvořáková",
    room: "301",
    priority: "low",
    status: "completed",
    dueTime: "12:00",
    estimatedTime: "15 min",
  },
  {
    id: 4,
    title: "Kontrola klimatizace",
    description: "Pravidelná kontrola a čištění filtrů",
    assignee: "Pavel Novák",
    room: "Všechny pokoje",
    priority: "medium",
    status: "paused",
    dueTime: "10:00",
    estimatedTime: "2 hod",
  },
]

const statusConfig = {
  "in-progress": { label: "Probíhá", color: "bg-blue-100 text-blue-800", icon: Clock },
  pending: { label: "Čeká", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  completed: { label: "Dokončeno", color: "bg-green-100 text-green-800", icon: CheckCircle },
  paused: { label: "Pozastaveno", color: "bg-gray-100 text-gray-800", icon: Pause },
}

const priorityConfig = {
  high: { label: "Vysoká", color: "bg-red-100 text-red-800" },
  medium: { label: "Střední", color: "bg-yellow-100 text-yellow-800" },
  low: { label: "Nízká", color: "bg-green-100 text-green-800" },
}

export function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Správa úkolů</h2>
          <p className="text-gray-600">Přehled všech úkolů a jejich stavů</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Nový úkol</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Aktivní úkoly</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">Probíhající</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-600">Dokončené dnes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">3</div>
            <div className="text-sm text-gray-600">Zpožděné</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seznam úkolů</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const StatusIcon = statusConfig[task.status as keyof typeof statusConfig].icon
              return (
                <div key={task.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{task.title}</h3>
                        <Badge className={statusConfig[task.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[task.status as keyof typeof statusConfig].label}
                        </Badge>
                        <Badge className={priorityConfig[task.priority as keyof typeof priorityConfig].color}>
                          {priorityConfig[task.priority as keyof typeof priorityConfig].label}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {task.assignee}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Pokoj {task.room}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {task.dueTime} ({task.estimatedTime})
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {task.assignee
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
