"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import { Calendar, Users, Phone, Mail, Loader2 } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchAPI, postAPI, getStrapiMediaURL } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface Room {
  id: number;
  attributes: {
    room_number: string;
    name: string;
    description?: string;
    price_per_night: number;
    capacity: number;
    amenities?: any;
    images?: {
      data?: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
  };
}

export default function RoomBookingPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  
  const roomId = params.id as string
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const guests = searchParams.get("guests")
  
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    guest_name: "",
    email: "",
    phone: "",
    message: "",
    winecellar: false,
  })

  // Calculate nights
  const nights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0

  useEffect(() => {
    async function fetchRoom() {
      try {
        const response = await fetchAPI(`/rooms/${roomId}?populate=images`)
        setRoom(response.data)
      } catch (error) {
        console.error("Error fetching room:", error)
        toast({
          title: "Chyba",
          description: "Nepodařilo se načíst informace o pokoji",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRoom()
  }, [roomId, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const bookingData = {
        guest_name: formData.guest_name,
        email: formData.email,
        phone: formData.phone,
        check_in: checkIn,
        check_out: checkOut,
        guests: Number(guests),
        total_price: room ? room.attributes.price_per_night * nights : 0,
        status: "pending",
        payment_status: "pending",
        room: roomId,
        message: formData.message,
        source: "Přímá rezervace",
      }

      await postAPI("/bookings", { data: bookingData })

      toast({
        title: "Rezervace odeslána",
        description: "Vaše rezervace byla úspěšně odeslána. Brzy vás budeme kontaktovat.",
      })

      // Redirect to confirmation page or home
      router.push("/")
    } catch (error) {
      console.error("Error creating booking:", error)
      toast({
        title: "Chyba",
        description: "Nepodařilo se vytvořit rezervaci. Zkuste to prosím znovu.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Načítám...</p>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Pokoj nebyl nalezen</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Room details */}
          <div>
            <Card>
              <CardHeader className="p-0">
                <div className="relative h-64 w-full">
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
                <CardTitle className="text-2xl mb-4">{room.attributes.name}</CardTitle>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {checkIn && format(new Date(checkIn), "d. MMMM yyyy", { locale: cs })} - 
                      {" "}{checkOut && format(new Date(checkOut), "d. MMMM yyyy", { locale: cs })}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{guests} {Number(guests) === 1 ? "host" : "hosté"}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>{room.attributes.price_per_night} Kč × {nights} {nights === 1 ? "noc" : nights < 5 ? "noci" : "nocí"}</span>
                      <span>{room.attributes.price_per_night * nights} Kč</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Celkem</span>
                      <span>{room.attributes.price_per_night * nights} Kč</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking form */}
          <Card>
            <CardHeader>
              <CardTitle>Dokončit rezervaci</CardTitle>
              <CardDescription>
                Vyplňte prosím kontaktní údaje pro dokončení rezervace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Jméno a příjmení *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.guest_name}
                    onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="message">Zpráva (nepovinné)</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Speciální požadavky, čas příjezdu, atd."
                  />
                </div>

                <div className="border-t pt-4">
                  <Label>Doplňkové služby</Label>
                  <div className="mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        onChange={(e) => setFormData({ ...formData, winecellar: e.target.checked })}
                      />
                      <span className="text-sm">Rezervovat vinný sklípek (800 Kč/hodina)</span>
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Odesílám...
                    </>
                  ) : (
                    "Odeslat rezervaci"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
