"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { 
  Wifi, 
  Tv, 
  Coffee, 
  Users, 
  Bath, 
  Wind, 
  Car,
  ChevronLeft,
  ChevronRight,
  Bed,
  Home,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { fetchAPI, getStrapiMediaURL } from "@/lib/api"
import { HeroBooking } from "@/components/hero-booking"

interface Room {
  id: number;
  attributes: {
    room_number: string;
    name: string;
    description?: string;
    price_per_night: number;
    capacity: number;
    amenities?: any;
    floor?: number;
    images?: {
      data?: Array<{
        id: number;
        attributes: {
          url: string;
          formats?: {
            large?: { url: string };
            medium?: { url: string };
          };
        };
      }>;
    };
  };
}

// Mapa ikon pro vybavení
const amenityIcons: { [key: string]: any } = {
  'WiFi': Wifi,
  'Bezplatné Wi-Fi': Wifi,
  'TV': Tv,
  'TV s plochou obrazovkou': Tv,
  'Kávovar': Coffee,
  'Elektrická konvice': Coffee,
  'Koupelna': Bath,
  'Vlastní koupelna': Bath,
  'Klimatizace': Wind,
  'Topení': Wind,
  'Parkování': Car,
  'Bezplatné parkování': Car,
}

export default function RoomDetailPage() {
  const params = useParams()
  const router = useRouter()
  const roomId = params.id as string
  
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    async function fetchRoom() {
      try {
        const response = await fetchAPI(`/rooms/${roomId}?populate=images`)
        setRoom(response.data)
      } catch (error) {
        console.error("Error fetching room:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [roomId])

  const nextImage = () => {
    if (room?.attributes.images?.data) {
      setCurrentImageIndex((prev) => 
        prev === room.attributes.images.data.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (room?.attributes.images?.data) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? room.attributes.images.data.length - 1 : prev - 1
      )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-warm-beige"></div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Pokoj nebyl nalezen</h2>
          <Button asChild>
            <Link href="/#rooms">Zpět na výběr pokojů</Link>
          </Button>
        </div>
      </div>
    )
  }

  const images = room.attributes.images?.data || []
  const amenitiesArray = room.attributes.amenities 
    ? (Array.isArray(room.attributes.amenities) 
        ? room.attributes.amenities 
        : Object.entries(room.attributes.amenities)
            .filter(([_, value]) => value)
            .map(([key]) => key))
    : []

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Button
            variant="ghost"
            asChild
            className="text-white hover:bg-white/20"
          >
            <Link href="/#rooms">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Zpět
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Gallery */}
      <section className="relative h-[70vh] bg-gray-100">
        {images.length > 0 ? (
          <>
            <Image
              src={getStrapiMediaURL(images[currentImageIndex].attributes.url) || ''}
              alt={room.attributes.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Image navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                
                {/* Image indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home className="w-16 h-16 text-gray-400" />
          </div>
        )}

        {/* Room title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif mb-2">
              {room.attributes.name}
            </h1>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white">
                {room.attributes.room_number}
              </Badge>
              {room.attributes.floor && (
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {room.attributes.floor}. patro
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              {room.attributes.description && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif mb-4">O pokoji</h2>
                    <p className="text-gray-600 leading-relaxed">
                      {room.attributes.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Amenities */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif mb-6">Vybavení pokoje</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenitiesArray.map((amenity: string, index: number) => {
                      const Icon = amenityIcons[amenity] || Star
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-warm-beige" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Room details */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif mb-6">Detaily pokoje</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-warm-beige" />
                        <span className="text-gray-700">Kapacita</span>
                      </div>
                      <span className="font-medium">
                        {room.attributes.capacity} {room.attributes.capacity === 1 ? 'osoba' : room.attributes.capacity < 5 ? 'osoby' : 'osob'}
                      </span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bed className="w-5 h-5 text-warm-beige" />
                        <span className="text-gray-700">Typ pokoje</span>
                      </div>
                      <span className="font-medium">{room.attributes.room_number}</span>
                    </div>
                    
                    {room.attributes.floor && (
                      <>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Home className="w-5 h-5 text-warm-beige" />
                            <span className="text-gray-700">Umístění</span>
                          </div>
                          <span className="font-medium">{room.attributes.floor}. patro</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:sticky lg:top-24">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-dark-gray">
                      {room.attributes.price_per_night} Kč
                    </div>
                    <div className="text-gray-600">za noc</div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <div className="text-center text-gray-600 mb-4">
                      Vyberte termín pobytu
                    </div>
                    
                    <Button asChild className="w-full" size="lg">
                      <Link href="/#booking">
                        Rezervovat nyní
                      </Link>
                    </Button>
                    
                    <div className="text-center text-sm text-gray-500">
                      Okamžité potvrzení rezervace
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="mt-4">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Potřebujete poradit?</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600">
                      Telefon: <a href="tel:+420603830130" className="text-warm-beige hover:underline">+420 603 830 130</a>
                    </p>
                    <p className="text-gray-600">
                      Email: <a href="mailto:info@jesuitska.cz" className="text-warm-beige hover:underline">info@jesuitska.cz</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Floating booking bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 lg:hidden">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{room.attributes.price_per_night} Kč</div>
            <div className="text-sm text-gray-600">za noc</div>
          </div>
          <Button asChild>
            <Link href="/#booking">Rezervovat</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
