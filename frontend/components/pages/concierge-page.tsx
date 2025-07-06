import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Phone, Clock, Star, Car, Utensils, Calendar } from "lucide-react"

const requests = [
  {
    id: "CR001",
    guest: "Petr Svoboda",
    room: "205",
    request: "Rezervace restaurace",
    description: "Rezervace pro 2 osoby na 19:00 v restauraci U Fleku",
    priority: "medium",
    status: "completed",
    assignedTo: "Jana Dvořáková",
    createdAt: "2025-01-24 14:30",
    category: "dining",
  },
  {
    id: "CR002",
    guest: "Marie Nováková",
    room: "103",
    request: "Doprava na letiště",
    description: "Taxi na letiště Václava Havla, odjezd v 08:00",
    priority: "high",
    status: "in-progress",
    assignedTo: "Tomáš Svoboda",
    createdAt: "2025-01-24 15:45",
    category: "transport",
  },
  {
    id: "CR003",
    guest: "Anna Svobodová",
    room: "301",
    request: "Turistické informace",
    description: "Doporučení výletů po Praze, vstupenky do muzeí",
    priority: "low",
    status: "pending",
    assignedTo: "Pavel Novák",
    createdAt: "2025-01-24 16:20",
    category: "tourism",
  },
]

const services = [
  {
    name: "Restaurace U Fleku",
    category: "Restaurace",
    rating: 4.8,
    distance: "5 min chůze",
    phone: "+420 224 934 019",
    description: "Tradiční česká kuchyně a pivo",
  },
  {
    name: "Taxi Praha",
    category: "Doprava",
    rating: 4.5,
    distance: "Dostupné 24/7",
    phone: "+420 14014",
    description: "Spolehlivá taxi služba",
  },
  {
    name: "Pražský hrad",
    category: "Turistika",
    rating: 4.9,
    distance: "15 min MHD",
    phone: "+420 224 373 368",
    description: "Historický komplex a symbol Prahy",
  },
]

const statusConfig = {
  pending: { label: "Čeká", color: "bg-yellow-100 text-yellow-800" },
  "in-progress": { label: "Probíhá", color: "bg-blue-100 text-blue-800" },
  completed: { label: "Dokončeno", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Zrušeno", color: "bg-red-100 text-red-800" },
}

const priorityConfig = {
  high: { label: "Vysoká", color: "bg-red-100 text-red-800" },
  medium: { label: "Střední", color: "bg-yellow-100 text-yellow-800" },
  low: { label: "Nízká", color: "bg-green-100 text-green-800" },
}

const categoryIcons = {
  dining: Utensils,
  transport: Car,
  tourism: MapPin,
  other: Calendar,
}

export function ConciergePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Concierge služby</h2>
          <p className="text-gray-600">Správa požadavků hostů a doporučení</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Nový požadavek</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-sm text-gray-600">Aktivní požadavky</div>
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
            <div className="text-2xl font-bold text-green-600">42</div>
            <div className="text-sm text-gray-600">Dokončené dnes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">4.9</div>
            <div className="text-sm text-gray-600">Průměrné hodnocení</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Požadavky hostů</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => {
                const CategoryIcon = categoryIcons[request.category as keyof typeof categoryIcons]
                return (
                  <div key={request.id} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CategoryIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{request.request}</h4>
                          <p className="text-sm text-gray-600">
                            {request.guest} • Pokoj {request.room}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={statusConfig[request.status as keyof typeof statusConfig].color}>
                          {statusConfig[request.status as keyof typeof statusConfig].label}
                        </Badge>
                        <Badge className={priorityConfig[request.priority as keyof typeof priorityConfig].color}>
                          {priorityConfig[request.priority as keyof typeof priorityConfig].label}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{request.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {request.createdAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <Avatar className="w-4 h-4">
                            <AvatarFallback className="text-xs">
                              {request.assignedTo
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {request.assignedTo}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doporučené služby</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{service.name}</h4>
                      <Badge variant="outline" className="text-xs mt-1">
                        {service.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{service.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {service.distance}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {service.phone}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Doporučit
                    </Button>
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
