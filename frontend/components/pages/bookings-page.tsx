import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Users, Phone, Mail, CreditCard } from "lucide-react"

const bookings = [
  {
    id: "BK001",
    guest: "Petr Svoboda",
    email: "petr.svoboda@email.cz",
    phone: "+420 777 123 456",
    room: "Deluxe Suite 205",
    checkIn: "2025-01-15",
    checkOut: "2025-01-18",
    guests: 2,
    nights: 3,
    totalPrice: "12,500 Kč",
    status: "confirmed",
    paymentStatus: "paid",
    source: "Booking.com",
  },
  {
    id: "BK002",
    guest: "Marie Dvořáková",
    email: "marie.dvorakova@email.cz",
    phone: "+420 606 789 123",
    room: "Standard Room 103",
    checkIn: "2025-01-20",
    checkOut: "2025-01-22",
    guests: 1,
    nights: 2,
    totalPrice: "6,800 Kč",
    status: "pending",
    paymentStatus: "pending",
    source: "Přímá rezervace",
  },
  {
    id: "BK003",
    guest: "Tomáš Novák",
    email: "tomas.novak@email.cz",
    phone: "+420 721 456 789",
    room: "Family Room 301",
    checkIn: "2025-01-25",
    checkOut: "2025-01-28",
    guests: 4,
    nights: 3,
    totalPrice: "15,600 Kč",
    status: "confirmed",
    paymentStatus: "partial",
    source: "Airbnb",
  },
]

const statusConfig = {
  confirmed: { label: "Potvrzeno", color: "bg-green-100 text-green-800" },
  pending: { label: "Čeká na potvrzení", color: "bg-yellow-100 text-yellow-800" },
  cancelled: { label: "Zrušeno", color: "bg-red-100 text-red-800" },
  "checked-in": { label: "Ubytován", color: "bg-blue-100 text-blue-800" },
}

const paymentConfig = {
  paid: { label: "Zaplaceno", color: "bg-green-100 text-green-800" },
  pending: { label: "Čeká na platbu", color: "bg-yellow-100 text-yellow-800" },
  partial: { label: "Částečně zaplaceno", color: "bg-orange-100 text-orange-800" },
  refunded: { label: "Vráceno", color: "bg-gray-100 text-gray-800" },
}

export function BookingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Správa rezervací</h2>
          <p className="text-gray-600">Přehled všech rezervací a jejich stavů</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Nová rezervace</Button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">24</div>
            <div className="text-sm text-gray-600">Aktivní rezervace</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-sm text-gray-600">Příjezdy dnes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">6</div>
            <div className="text-sm text-gray-600">Odjezdy dnes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <div className="text-sm text-gray-600">Čeká na potvrzení</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-600">Obsazenost</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seznam rezervací</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-100 rounded-lg p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-100 text-blue-800 font-medium">
                        {booking.guest
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{booking.guest}</h3>
                        <Badge className="text-xs">{booking.id}</Badge>
                        <Badge className={statusConfig[booking.status as keyof typeof statusConfig].color}>
                          {statusConfig[booking.status as keyof typeof statusConfig].label}
                        </Badge>
                        <Badge className={paymentConfig[booking.paymentStatus as keyof typeof paymentConfig].color}>
                          {paymentConfig[booking.paymentStatus as keyof typeof paymentConfig].label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            {booking.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            {booking.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            {booking.guests} {booking.guests === 1 ? "host" : "hosté"} • {booking.nights}{" "}
                            {booking.nights === 1 ? "noc" : "noci"}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Příjezd: {new Date(booking.checkIn).toLocaleDateString("cs-CZ")}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Odjezd: {new Date(booking.checkOut).toLocaleDateString("cs-CZ")}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CreditCard className="w-4 h-4" />
                            {booking.totalPrice} • {booking.source}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-md inline-block">
                        {booking.room}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Upravit
                    </Button>
                    <Button variant="outline" size="sm">
                      Detail
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
