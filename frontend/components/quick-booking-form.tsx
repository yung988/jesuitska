'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { createBooking } from '@/lib/services/bookings'
import { getRooms } from '@/lib/services/rooms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Users, Mail, Phone, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function QuickBookingForm() {
  const router = useRouter()
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in: '',
    check_out: '',
    room_id: '',
    guests_count: 1,
    total_price: 0
  })

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    try {
      const response = await getRooms()
      setRooms(response.data || [])
    } catch (err) {
      console.error('Error fetching rooms:', err)
    }
  }

  const calculatePrice = () => {
    if (!formData.check_in || !formData.check_out || !formData.room_id) return 0
    
    const room = rooms.find(r => r.id.toString() === formData.room_id)
    if (!room) return 0
    
    const checkIn = new Date(formData.check_in)
    const checkOut = new Date(formData.check_out)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    
    return nights * (room.attributes?.pricePerNight || 0)
  }

  useEffect(() => {
    const price = calculatePrice()
    setFormData(prev => ({ ...prev, total_price: price }))
  }, [formData.check_in, formData.check_out, formData.room_id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const bookingData = {
        checkIn: formData.check_in,
        checkOut: formData.check_out,
        numberOfGuests: formData.guests_count,
        room: parseInt(formData.room_id),
        // Pro rychlou rezervaci vytvoříme dočasného hosta
        guest: {
          name: formData.guest_name,
          email: formData.guest_email,
          phone: formData.guest_phone
        },
        status: 'confirmed',
        totalPrice: formData.total_price
      }

      await createBooking(bookingData)
      setSuccess(true)
      
      // Refresh stránky po 2 sekundách
      setTimeout(() => {
        router.refresh()
        setSuccess(false)
        setFormData({
          guest_name: '',
          guest_email: '',
          guest_phone: '',
          check_in: '',
          check_out: '',
          room_id: '',
          guests_count: 1,
          total_price: 0
        })
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Nepodařilo se vytvořit rezervaci')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Rychlá rezervace
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-5xl mb-4">✓</div>
            <p className="text-lg font-semibold">Rezervace byla úspěšně vytvořena!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="check_in" className="flex items-center gap-1 mb-1">
                  <Calendar className="h-4 w-4" />
                  Příjezd
                </Label>
                <Input
                  id="check_in"
                  type="date"
                  value={formData.check_in}
                  onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="check_out" className="flex items-center gap-1 mb-1">
                  <Calendar className="h-4 w-4" />
                  Odjezd
                </Label>
                <Input
                  id="check_out"
                  type="date"
                  value={formData.check_out}
                  onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
                  min={formData.check_in || format(new Date(), 'yyyy-MM-dd')}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="room" className="mb-1">Pokoj</Label>
                <Select
                  value={formData.room_id}
                  onValueChange={(value) => setFormData({ ...formData, room_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte pokoj" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id.toString()}>
                        {room.attributes?.name} - {room.attributes?.pricePerNight} Kč/noc
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="guests" className="flex items-center gap-1 mb-1">
                  <Users className="h-4 w-4" />
                  Počet hostů
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.guests_count}
                  onChange={(e) => setFormData({ ...formData, guests_count: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="name" className="flex items-center gap-1 mb-1">
                  <User className="h-4 w-4" />
                  Jméno hosta
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.guest_name}
                  onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                  placeholder="Jan Novák"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-1 mb-1">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.guest_email}
                  onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                  placeholder="jan.novak@email.cz"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-1 mb-1">
                  <Phone className="h-4 w-4" />
                  Telefon
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.guest_phone}
                  onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                  placeholder="+420 123 456 789"
                  required
                />
              </div>
            </div>

            {formData.total_price > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Celková cena:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formData.total_price.toLocaleString('cs-CZ')} Kč
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Vytváření rezervace...' : 'Vytvořit rezervaci'}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
