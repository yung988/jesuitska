'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'
import { getBookings } from '@/lib/services/bookings'
import type { Booking } from '@/lib/services/bookings'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'

const statusLabels = {
  pending: 'Čeká na potvrzení',
  confirmed: 'Potvrzeno',
  cancelled: 'Zrušeno',
  completed: 'Dokončeno',
  checked_in: 'Ubytován',
  checked_out: 'Odjel'
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
  checked_in: 'bg-purple-100 text-purple-800',
  checked_out: 'bg-gray-100 text-gray-800'
}

export function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await getBookings()
      setBookings(response.data || [])
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError('Nepodařilo se načíst rezervace')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-red-600">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-gray-500">Zatím nemáte žádné rezervace</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rezervace</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold">{booking.attributes.guest_name || booking.attributes.guest?.data?.attributes?.name || 'Host'}</h4>
                  <Badge className={statusColors[booking.attributes.status as keyof typeof statusColors]}>
                    {statusLabels[booking.attributes.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    Pokoj: {booking.attributes.room?.data?.attributes?.name || 'N/A'} • 
                    Počet hostů: {booking.attributes.guests_count}
                  </p>
                  <p>
                    Příjezd: {format(new Date(booking.attributes.check_in), 'd. MMMM yyyy', { locale: cs })} • 
                    Odjezd: {format(new Date(booking.attributes.check_out), 'd. MMMM yyyy', { locale: cs })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">{booking.attributes.total_price?.toLocaleString('cs-CZ')} Kč</p>
                <p className="text-sm text-gray-500">
                  Vytvořeno: {format(new Date(booking.attributes.createdAt), 'd.M.yyyy', { locale: cs })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
