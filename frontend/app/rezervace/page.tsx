"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import { Calendar, Users, MapPin, Wifi, Car, Coffee, Loader2, Plus, Minus, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAvailableRooms } from "@/hooks/use-rooms"
import { getStrapiMediaURL } from "@/lib/api"
import { Separator } from "@/components/ui/separator"

interface SelectedRoom {
  roomId: number;
  guests: number;
  name: string;
  pricePerNight: number;
}

function ReservationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const guests = searchParams.get("guests") || "2"
  
  const { rooms, loading, error } = useAvailableRooms(checkIn, checkOut)
  const [selectedRooms, setSelectedRooms] = useState<SelectedRoom[]>([])
  const [showCart, setShowCart] = useState(false)

  // Calculate number of nights
  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  // Add room to selection
  const addRoom = (room: any) => {
    const existingRoom = selectedRooms.find(r => r.roomId === room.id)
    if (!existingRoom) {
      setSelectedRooms([...selectedRooms, {
        roomId: room.id,
        guests: Math.min(Number(guests) || 2, room.attributes.capacity),
        name: room.attributes.name,
        pricePerNight: room.attributes.price_per_night
      }])
    }
  }

  // Remove room from selection
  const removeRoom = (roomId: number) => {
    setSelectedRooms(selectedRooms.filter(r => r.roomId !== roomId))
  }

  // Update guest count for a room
  const updateGuestCount = (roomId: number, guests: number) => {
    setSelectedRooms(selectedRooms.map(r => 
      r.roomId === roomId ? { ...r, guests } : r
    ))
  }

  // Calculate total price
  const totalPrice = selectedRooms.reduce((total, room) => 
    total + (room.pricePerNight * nights), 0
  )

  // Handle continue to booking
  const handleContinueToBooking = () => {
    if (selectedRooms.length > 0) {
      // Store selected rooms in sessionStorage or pass via URL
      const bookingData = {
        checkIn,
        checkOut,
        rooms: selectedRooms,
        nights
      }
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
      router.push('/rezervace/dokoncit')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Načítám dostupné pokoje...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Zkusit znovu</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-dark-gray mb-4">
            Dostupné pokoje
          </h1>
          
          {checkIn && checkOut && (
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(checkIn), "d. MMMM yyyy", { locale: cs })} - 
                  {" "}{format(new Date(checkOut), "d. MMMM yyyy", { locale: cs })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{guests} {Number(guests) === 1 ? "host" : "hosté"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{nights} {nights === 1 ? "noc" : nights < 5 ? "noci" : "nocí"}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms
            .filter(room => Number(guests) <= room.attributes.capacity)
            .map((room) => (
              <Card key={room.id}>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    {room.attributes.images?.data?.[0] ? (
                      <Image
                        src={getStrapiMediaURL(room.attributes.images.data[0].attributes.url) || '/images/rooms/pokoj.png'}
                        alt={room.attributes.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="bg-gray-200 h-full w-full rounded-t-lg" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-4">{room.attributes.name}</CardTitle>
                  
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Max. {room.attributes.capacity} {room.attributes.capacity === 1 ? "osoba" : room.attributes.capacity < 5 ? "osoby" : "osob"}</span>
                  </div>

                  {room.attributes.amenities && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(room.attributes.amenities).map(([key, value]) => (
                        value && (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key === 'wifi' ? 'WiFi' : key === 'balcony' ? 'Balkón' : key === 'bathroom' ? 'Vlastní koupelna' : key}
                          </Badge>
                        )
                      ))}
                    </div>
                  )}

                  <div className="text-2xl font-semibold text-dark-gray">
                    {room.attributes.price_per_night} Kč
                    <span className="text-sm font-normal text-gray-600"> / noc</span>
                  </div>
                  
                  {nights > 0 && (
                    <div className="text-sm text-gray-600 mt-1">
                      Celkem: {room.attributes.price_per_night * nights} Kč za {nights} {nights === 1 ? "noc" : nights < 5 ? "noci" : "nocí"}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full"
                    asChild
                  >
                    <Link href={`/rezervace/pokoj/${room.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}>
                      Rezervovat
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

        {rooms.filter(room => Number(guests) <= room.attributes.capacity).length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              Bohužel nemáme dostupné pokoje pro {guests} {Number(guests) === 1 ? "hosta" : "hostů"}.
            </p>
            <p className="text-gray-600 mt-2">
              Zkuste změnit termín nebo počet hostů.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div>Načítání...</div>}>
      <ReservationContent />
    </Suspense>
  )
}
