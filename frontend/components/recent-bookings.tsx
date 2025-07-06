import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Users, Phone } from "lucide-react"

const bookings = [
  {
    id: "1",
    guest: "Petr Svoboda",
    email: "petr.svoboda@email.cz",
    room: "Deluxe Suite",
    checkIn: "15. 1. 2025",
    checkOut: "18. 1. 2025",
    guests: 2,
    status: "confirmed",
    phone: "+420 777 123 456",
  },
  {
    id: "2",
    guest: "Marie Dvořáková",
    email: "marie.dvorakova@email.cz",
    room: "Standard Room",
    checkIn: "20. 1. 2025",
    checkOut: "22. 1. 2025",
    guests: 1,
    status: "pending",
    phone: "+420 606 789 123",
  },
  {
    id: "3",
    guest: "Tomáš Novák",
    email: "tomas.novak@email.cz",
    room: "Family Room",
    checkIn: "25. 1. 2025",
    checkOut: "28. 1. 2025",
    guests: 4,
    status: "confirmed",
    phone: "+420 721 456 789",
  },
  {
    id: "4",
    guest: "Anna Procházková",
    email: "anna.prochazka@email.cz",
    room: "Deluxe Suite",
    checkIn: "2. 2. 2025",
    checkOut: "5. 2. 2025",
    guests: 2,
    status: "confirmed",
    phone: "+420 775 321 654",
  },
]

const statusConfig = {
  confirmed: { label: "Potvrzeno", className: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50" },
  pending: { label: "Čeká na potvrzení", className: "bg-amber-50 text-amber-700 hover:bg-amber-50" },
  cancelled: { label: "Zrušeno", className: "bg-red-50 text-red-700 hover:bg-red-50" },
}

export function RecentBookings() {
  return (
    <Card className="border-amber-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-slate-800 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-amber-600" />
          Nejnovější rezervace
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 rounded-lg border border-amber-50 hover:bg-amber-25 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-amber-100 text-amber-800 font-medium">
                    {booking.guest
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-slate-800">{booking.guest}</h4>
                    <Badge
                      variant="secondary"
                      className={statusConfig[booking.status as keyof typeof statusConfig].className}
                    >
                      {statusConfig[booking.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="font-medium text-amber-700">{booking.room}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {booking.guests} {booking.guests === 1 ? "host" : "hosté"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {booking.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-800">
                  {booking.checkIn} - {booking.checkOut}
                </div>
                <div className="text-xs text-slate-500">{booking.email}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
