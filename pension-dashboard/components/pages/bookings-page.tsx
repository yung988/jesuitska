import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Users, Phone, Mail, CreditCard, Loader2 } from "lucide-react"
import { useBookings, useDashboardStats } from "@/hooks/use-strapi"

// Removed hardcoded data - now using Strapi

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
  const { data: bookings, isLoading: isLoadingBookings } = useBookings();
  const { data: stats, isLoading: isLoadingStats } = useDashboardStats();

  if (isLoadingBookings || isLoadingStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // Calculate nights between check-in and check-out
  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
            <div className="text-2xl font-bold text-gray-900">{stats?.activeBookings || 0}</div>
            <div className="text-sm text-gray-600">Aktivní rezervace</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats?.arrivalsToday || 0}</div>
            <div className="text-sm text-gray-600">Příjezdy dnes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats?.departuresToday || 0}</div>
            <div className="text-sm text-gray-600">Odjezdy dnes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats?.pendingBookings || 0}</div>
            <div className="text-sm text-gray-600">Čeká na potvrzení</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{stats?.occupancyRate || 0}%</div>
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
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => {
                const nights = calculateNights(booking.attributes.check_in, booking.attributes.check_out);
                return (
              <div key={booking.id} className="border border-gray-100 rounded-lg p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-100 text-blue-800 font-medium">
                        {booking.attributes.guest_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">{booking.attributes.guest_name}</h3>
                        <Badge className="text-xs">#{booking.id}</Badge>
                        <Badge className={statusConfig[booking.attributes.status as keyof typeof statusConfig]?.color || "bg-gray-100 text-gray-800"}>
                          {statusConfig[booking.attributes.status as keyof typeof statusConfig]?.label || booking.attributes.status}
                        </Badge>
                        <Badge className={paymentConfig[booking.attributes.payment_status as keyof typeof paymentConfig]?.color || "bg-gray-100 text-gray-800"}>
                          {paymentConfig[booking.attributes.payment_status as keyof typeof paymentConfig]?.label || booking.attributes.payment_status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            {booking.attributes.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            {booking.attributes.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            {booking.attributes.guests} {booking.attributes.guests === 1 ? "host" : "hosté"} • {nights}{" "}
                            {nights === 1 ? "noc" : "noci"}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Příjezd: {new Date(booking.attributes.check_in).toLocaleDateString("cs-CZ")}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            Odjezd: {new Date(booking.attributes.check_out).toLocaleDateString("cs-CZ")}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CreditCard className="w-4 h-4" />
                            {booking.attributes.total_price.toLocaleString("cs-CZ")} Kč • {booking.attributes.source}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-md inline-block">
                        {booking.attributes.room}
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
              );
            })
          ) : (
            <div className="text-center py-8 text-gray-500">
              Žádné rezervace k zobrazení
            </div>
          )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
