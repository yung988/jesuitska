"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, Maximize, Wifi, Coffee, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { fetchAPI, getStrapiMediaURL } from "@/lib/api"

const roomTypes = [
  {
    id: "1",
    name: "POKOJ Č. 1",
    description:
      "Dvoulůžkový pokoj s manželskou postelí, vlastním sociálním zařízením (WC a koupelna se sprchovým koutem). Pokoj má terasu na posezení s možností snídaně na terase a okna do dvora.",
    capacity: "2 osoby",
    size: "Dvoulůžkový",
    price: "Dle sezóny",
    features: ["Terasa", "Lednice", "Rychlovarná konvice", "Wi-Fi", "Okna do dvora"],
    images: [
      "/images/rooms/pokoj.png",
      "/images/rooms/koupelna.png",
      "/images/gallery/terasa.png",
    ],
  },
  {
    id: "2",
    name: "POKOJ Č. 2",
    description:
      "Dvoulůžkový pokoj s oddělenými postelemi, vlastním sociálním zařízením (WC a koupelna se sprchovým koutem). Pokoj má výhled na kostel sv. Michala a okna do ulice. Možnost přistýlky.",
    capacity: "2-3 osoby",
    size: "Dvoulůžkový",
    price: "Dle sezóny",
    features: ["Výhled na kostel", "Lednice", "Rychlovarná konvice", "Wi-Fi", "Možnost přistýlky"],
    images: [
      "/images/rooms/pokoj.png",
      "/images/rooms/koupelna.png",
      "/images/gallery/balkon.png",
    ],
  },
  {
    id: "3",
    name: "POKOJ Č. 3",
    description:
      "Prostorný dvoulůžkový pokoj s manželskou postelí, vlastní koupelnou s vanou a WC. Pokoj je orientován do dvora a nabízí menší terasu s možností snídaně v letních měsících. Možnost přistýlky.",
    capacity: "2-3 osoby",
    size: "Dvoulůžkový",
    price: "Dle sezóny",
    features: ["Menší terasa", "Koupelna s vanou", "Wi-Fi", "Orientace do dvora", "Možnost přistýlky"],
    images: [
      "/images/rooms/pokoj.png",
      "/images/rooms/koupelna.png",
      "/images/gallery/terasa.png",
    ],
  },
  {
    id: "4",
    name: "APARTMÁN",
    description:
      "Apartmán s manželskou postelí v samostatném pokoji a jedním pevným lůžkem v samostatném pokoji (za příplatek). Vlastní sociální zařízení s WC a vanou pro 2 osoby. Možnost přistýlky.",
    capacity: "2-4 osoby",
    size: "Apartmán",
    price: "Dle sezóny",
    features: ["Lednice", "Rychlovarná konvice", "Wi-Fi", "Vana pro 2 osoby", "Možnost přistýlky"],
    images: [
      "/images/rooms/pokoj.png",
      "/images/rooms/koupelna.png",
      "/images/hero/hero.png",
    ],
  },
  {
    id: "5",
    name: "POKOJ Č. 5",
    description:
      "Jednolůžkový pokoj s vlastní koupelnou se sprchovým koutem a WC. Vybaven Wi-Fi připojením, ideální pro individuální cestovatele.",
    capacity: "1 osoba",
    size: "Jednolůžkový",
    price: "Dle sezóny",
    features: ["Wi-Fi", "Sprchový kout", "Vlastní WC"],
    images: [
      "/images/rooms/pokoj.png",
      "/images/rooms/koupelna.png",
      "/images/gallery/balkon.png",
    ],
  },
]

export default function Rooms() {
  const [activeTab, setActiveTab] = useState("1")
  const [currentImage, setCurrentImage] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<typeof roomTypes[0] | null>(null)

  const activeRoom = roomTypes.find((room) => room.id === activeTab)

  const nextImage = () => {
    if (activeRoom) {
      setCurrentImage((prev) => (prev === activeRoom.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (activeRoom) {
      setCurrentImage((prev) => (prev === 0 ? activeRoom.images.length - 1 : prev - 1))
    }
  }

  return (
    <section id="rooms" className="py-24 md:py-32 px-6 md:px-20 bg-cream/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-wider uppercase text-center mb-4">
          Pokoje
        </h2>
        <div className="w-24 h-px bg-dark-gray/30 mx-auto mb-12" />

        <p className="text-center mb-12 max-w-2xl mx-auto text-lg">
          Nabízíme celkem 5 pokojů s kapacitou 11 lůžek (s možností několika přistýlek). Každý pokoj má vlastní sociální zařízení a jedinečnou atmosféru.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {roomTypes.map((room) => (
            <Button
              key={room.id}
              variant="outline"
              className={cn(
                "rounded-full px-6 py-6 uppercase tracking-widest text-sm border-none",
                activeTab === room.id ? "bg-purple text-white hover:bg-purple/90" : "bg-cream hover:bg-cream/90",
              )}
              onClick={() => {
                setActiveTab(room.id)
                setCurrentImage(0)
              }}
            >
              {room.name}
            </Button>
          ))}
        </div>

        {activeRoom && (
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-serif mb-6">{activeRoom.name}</h3>
              <p className="text-lg mb-10 leading-relaxed">{activeRoom.description}</p>

              <h4 className="uppercase tracking-widest text-sm mb-4">Vlastnosti:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple" />
                  <span>Kapacita: {activeRoom.capacity}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Maximize className="h-5 w-5 text-purple" />
                  <span>Typ: {activeRoom.size}</span>
                </div>
                {activeRoom.features.map((feature) => (
                  <div key={`feature-${feature}`} className="flex items-center gap-3">
                    {feature.includes("Wi-Fi") ? (
                      <Wifi className="h-5 w-5 text-purple" />
                    ) : feature.includes("Lednice") || feature.includes("konvice") ? (
                      <Coffee className="h-5 w-5 text-purple" />
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-purple/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-purple" />
                      </div>
                    )}
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="h-5 w-5 rounded-full bg-purple/20 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-purple" />
                </div>
                <span className="font-medium">Snídaně: 100,- Kč/den/osoba</span>
              </div>

              <div className="flex gap-4">
                <Button 
                  asChild
                  variant="outline"
                  className="rounded-full px-6 py-6 uppercase tracking-widest text-sm"
                >
                  <Link href={`/pokoje/${activeRoom.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Detail pokoje
                  </Link>
                </Button>
                <Button 
                  className="rounded-full bg-dark-gray text-white px-8 py-6 uppercase tracking-widest text-sm hover:bg-black transition-colors"
                  onClick={() => {
                    setSelectedRoomForBooking(activeRoom)
                    setShowBookingForm(true)
                  }}
                >
                  Rezervovat
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={activeRoom.images[currentImage]}
                alt={`${activeRoom.name} - obrázek ${currentImage + 1}`}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-6 right-6 flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-cream/30 backdrop-blur-sm hover:bg-cream/50 border-none"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Předchozí</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-cream/30 backdrop-blur-sm hover:bg-cream/50 border-none"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Další</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedRoomForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowBookingForm(false)
                setSelectedRoomForBooking(null)
              }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-serif mb-4">Rezervace {selectedRoomForBooking.name}</h2>
              <BookingForm 
                roomName={selectedRoomForBooking.name}
                roomId={selectedRoomForBooking.id}
                onClose={() => {
                  setShowBookingForm(false)
                  setSelectedRoomForBooking(null)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
