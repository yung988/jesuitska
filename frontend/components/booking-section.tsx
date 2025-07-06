'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { cs } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, Users, Wifi, Coffee, Maximize, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

// Mock data pro pokoje - v reálné aplikaci by přišla z API
const rooms = [
  {
    id: 1,
    name: "POKOJ Č. 1",
    description: "Dvoulůžkový pokoj s manželskou postelí, vlastním sociálním zařízením",
    capacity: 2,
    pricePerNight: 1500,
    features: ["Terasa", "Lednice", "Rychlovarná konvice", "Wi-Fi", "Okna do dvora"],
    image: "/images/rooms/pokoj.png",
    available: true
  },
  {
    id: 2,
    name: "POKOJ Č. 2",
    description: "Dvoulůžkový pokoj s oddělenými postelemi",
    capacity: 3,
    pricePerNight: 1600,
    features: ["Výhled na kostel", "Lednice", "Wi-Fi", "Možnost přistýlky"],
    image: "/images/rooms/pokoj.png",
    available: true
  },
  {
    id: 3,
    name: "POKOJ Č. 3",
    description: "Prostorný dvoulůžkový pokoj s manželskou postelí",
    capacity: 3,
    pricePerNight: 1700,
    features: ["Menší terasa", "Koupelna s vanou", "Wi-Fi", "Možnost přistýlky"],
    image: "/images/rooms/pokoj.png",
    available: false
  },
  {
    id: 4,
    name: "APARTMÁN",
    description: "Apartmán s manželskou postelí v samostatném pokoji",
    capacity: 4,
    pricePerNight: 2500,
    features: ["Lednice", "Rychlovarná konvice", "Wi-Fi", "Vana pro 2 osoby"],
    image: "/images/rooms/pokoj.png",
    available: true
  },
  {
    id: 5,
    name: "POKOJ Č. 5",
    description: "Jednolůžkový pokoj s vlastní koupelnou",
    capacity: 1,
    pricePerNight: 1200,
    features: ["Wi-Fi", "Sprchový kout", "Vlastní WC"],
    image: "/images/rooms/pokoj.png",
    available: true
  }
]

export default function BookingSection() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState<string>('2')
  const [showResults, setShowResults] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Formulářová data pro rezervaci
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSearch = () => {
    if (checkIn && checkOut) {
      setIsLoading(true)
      // Simulace načítání
      setTimeout(() => {
        setShowResults(true)
        setIsLoading(false)
      }, 1000)
    }
  }

  const calculateTotalPrice = (room: typeof rooms[0]) => {
    if (!checkIn || !checkOut) return 0
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return nights * room.pricePerNight
  }

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedRoom || !checkIn || !checkOut) return

    setIsLoading(true)

    // Simulace odeslání rezervace
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Rezervace úspěšně vytvořena!",
        description: "Potvrzení vám zašleme na email.",
      })
      
      // Reset formuláře
      setSelectedRoom(null)
      setBookingData({
        name: '',
        email: '',
        phone: '',
        message: ''
      })
      setShowResults(false)
      setCheckIn(undefined)
      setCheckOut(undefined)
    }, 2000)
  }

  return (
    <section id="booking" className="py-24 md:py-32 px-6 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-wider uppercase text-center mb-4">
          Rezervace
        </h2>
        <div className="w-24 h-px bg-dark-gray/30 mx-auto mb-12" />

        {/* Vyhledávací formulář */}
        <Card className="max-w-5xl mx-auto shadow-xl mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Zkontrolovat dostupnost</CardTitle>
            <CardDescription>Vyberte termín vašeho pobytu</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Check-in Date */}
              <div className="space-y-2">
                <Label htmlFor="check-in">Příjezd</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="check-in"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkIn && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, 'dd. MM. yyyy', { locale: cs }) : "Vyberte datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) =>
                        date < new Date() || (checkOut ? date >= checkOut : false)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out Date */}
              <div className="space-y-2">
                <Label htmlFor="check-out">Odjezd</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="check-out"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !checkOut && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, 'dd. MM. yyyy', { locale: cs }) : "Vyberte datum"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) =>
                        date < new Date() || (checkIn ? date <= checkIn : false)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Number of Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests">Počet hostů</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger id="guests">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'host' : num < 5 ? 'hosté' : 'hostů'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={!checkIn || !checkOut || isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? 'Hledám...' : 'Vyhledat pokoje'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Výsledky vyhledávání */}
        {showResults && (
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-serif mb-6">Dostupné pokoje</h3>
            <div className="space-y-4">
              {rooms
                .filter(room => room.capacity >= parseInt(guests))
                .map((room) => (
                  <Card key={room.id} className={cn("overflow-hidden", !room.available && "opacity-60")}>
                    <div className="grid md:grid-cols-4 gap-6 p-6">
                      <div className="relative h-48 md:h-full rounded-lg overflow-hidden">
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xl font-semibold">{room.name}</h4>
                            <Badge variant={room.available ? "default" : "secondary"}>
                              {room.available ? "Dostupný" : "Obsazený"}
                            </Badge>
                          </div>
                          <p className="text-gray-600">{room.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>Max. {room.capacity} {room.capacity === 1 ? 'osoba' : room.capacity < 5 ? 'osoby' : 'osob'}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {room.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {room.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{room.features.length - 3} další
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-between items-end">
                        <div className="text-right">
                          <p className="text-2xl font-bold">{room.pricePerNight.toLocaleString('cs-CZ')} Kč</p>
                          <p className="text-sm text-gray-600">za noc</p>
                          {checkIn && checkOut && (
                            <>
                              <Separator className="my-2" />
                              <p className="text-lg font-semibold">
                                Celkem: {calculateTotalPrice(room).toLocaleString('cs-CZ')} Kč
                              </p>
                              <p className="text-xs text-gray-600">
                                za {calculateNights()} {calculateNights() === 1 ? 'noc' : calculateNights() < 5 ? 'noci' : 'nocí'}
                              </p>
                            </>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => setSelectedRoom(room)}
                          disabled={!room.available}
                          className="mt-4"
                        >
                          {room.available ? 'Rezervovat' : 'Obsazeno'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Rezervační formulář */}
        {selectedRoom && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-serif">Dokončit rezervaci</h3>
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">
                {/* Souhrn rezervace */}
                <Card>
                  <CardHeader>
                    <CardTitle>Souhrn rezervace</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span>Pokoj:</span>
                      <span className="font-semibold">{selectedRoom.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Příjezd:</span>
                      <span>{checkIn && format(checkIn, 'dd. MM. yyyy', { locale: cs })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Odjezd:</span>
                      <span>{checkOut && format(checkOut, 'dd. MM. yyyy', { locale: cs })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Počet nocí:</span>
                      <span>{calculateNights()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Počet hostů:</span>
                      <span>{guests}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Celková cena:</span>
                      <span>{calculateTotalPrice(selectedRoom).toLocaleString('cs-CZ')} Kč</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Kontaktní údaje */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Kontaktní údaje</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Jméno a příjmení *</Label>
                      <Input
                        id="name"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Poznámka (nepovinné)</Label>
                    <Textarea
                      id="message"
                      rows={3}
                      value={bookingData.message}
                      onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                    />
                  </div>
                </div>

                {/* Tlačítka */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedRoom(null)}
                    className="flex-1"
                  >
                    Zrušit
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? 'Odesílám...' : 'Potvrdit rezervaci'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
