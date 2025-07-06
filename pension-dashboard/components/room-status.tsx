import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Wifi, Car, Coffee } from "lucide-react"

const rooms = [
  {
    number: "101",
    type: "Standard Room",
    status: "occupied",
    guest: "Petr Svoboda",
    checkOut: "18. 1.",
    amenities: ["wifi", "parking"],
  },
  {
    number: "102",
    type: "Deluxe Suite",
    status: "cleaning",
    guest: null,
    checkOut: null,
    amenities: ["wifi", "parking", "breakfast"],
  },
  {
    number: "103",
    type: "Family Room",
    status: "available",
    guest: null,
    checkOut: null,
    amenities: ["wifi", "parking"],
  },
  {
    number: "201",
    type: "Deluxe Suite",
    status: "occupied",
    guest: "Marie Dvořáková",
    checkOut: "22. 1.",
    amenities: ["wifi", "parking", "breakfast"],
  },
  {
    number: "202",
    type: "Standard Room",
    status: "maintenance",
    guest: null,
    checkOut: null,
    amenities: ["wifi"],
  },
  {
    number: "203",
    type: "Family Room",
    status: "available",
    guest: null,
    checkOut: null,
    amenities: ["wifi", "parking"],
  },
]

const statusConfig = {
  occupied: { label: "Obsazeno", className: "bg-red-50 text-red-700 hover:bg-red-50" },
  available: { label: "Volný", className: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" },
  cleaning: { label: "Úklid", className: "bg-blue-50 text-blue-700 hover:bg-blue-50" },
  maintenance: { label: "Údržba", className: "bg-amber-50 text-amber-700 hover:bg-amber-50" },
}

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
}

export function RoomStatus() {
  return (
    <Card className="border-amber-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <Bed className="h-5 w-5 text-amber-600" />
          Stav pokojů
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <div
              key={room.number}
              className="p-4 rounded-lg border border-amber-50 hover:bg-amber-25 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-slate-800">#{room.number}</span>
                  <Badge
                    variant="secondary"
                    className={statusConfig[room.status as keyof typeof statusConfig].className}
                  >
                    {statusConfig[room.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-amber-700">{room.type}</p>

                {room.guest && (
                  <div className="text-sm text-slate-600">
                    <p className="font-medium">{room.guest}</p>
                    <p className="text-xs">Odjezd: {room.checkOut}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-2">
                  {room.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity as keyof typeof amenityIcons]
                    return <Icon key={amenity} className="h-4 w-4 text-slate-400" />
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
