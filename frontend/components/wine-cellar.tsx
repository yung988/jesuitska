"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Wine, Users, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { fetchAPI, getStrapiMediaURL } from "@/lib/api"

interface WineCellar {
  id: number;
  attributes: {
    name: string;
    capacity: number;
    description: string;
    price_per_hour: number;
    available_times: any;
    images?: {
      data?: Array<{
        attributes: {
          url: string;
        };
      }>;
    };
    active: boolean;
  };
}

export default function WineCellarSection() {
  const [wineCellar, setWineCellar] = useState<WineCellar | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWineCellar() {
      try {
        const response = await fetchAPI("/wine-cellars?populate=images")
        if (response.data && response.data.length > 0) {
          setWineCellar(response.data[0])
        }
      } catch (error) {
        console.error("Error fetching wine cellar:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWineCellar()
  }, [])

  if (loading || !wineCellar) {
    return null
  }

  return (
    <section className="py-20 bg-warm-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-dark-gray mb-4">
            Vinný sklípek
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Zažijte jedinečnou atmosféru našeho historického vinného sklípku
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {wineCellar.attributes.images?.data?.[0] ? (
              <Image
                src={getStrapiMediaURL(wineCellar.attributes.images.data[0].attributes.url) || '/images/gallery/vino.png'}
                alt={wineCellar.attributes.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                <Wine className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif text-dark-gray mb-4">
                {wineCellar.attributes.name}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {wineCellar.attributes.description}
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-warm-beige" />
                  <span>Kapacita až {wineCellar.attributes.capacity} osob</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-warm-beige" />
                  <span>Otevřeno denně 16:00 - 22:00</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Wine className="w-5 h-5 text-warm-beige" />
                  <span>Výběr moravských vín</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-semibold text-dark-gray">
                    {wineCellar.attributes.price_per_hour} Kč
                  </span>
                  <span className="text-gray-600 ml-2">/ hodina</span>
                </div>

                <Button asChild className="w-full">
                  <Link href="/kontakt">
                    Rezervovat vinný sklípek
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-6">
              <Wine className="w-8 h-8 mx-auto mb-3 text-warm-beige" />
              <h4 className="font-semibold mb-2">Degustace vín</h4>
              <p className="text-sm text-gray-600">
                Ochutnejte nejlepší vína z moravských vinic
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 mx-auto mb-3 text-warm-beige" />
              <h4 className="font-semibold mb-2">Soukromé akce</h4>
              <p className="text-sm text-gray-600">
                Ideální pro oslavy a firemní setkání
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 mx-auto mb-3 text-warm-beige" />
              <h4 className="font-semibold mb-2">Skupinové rezervace</h4>
              <p className="text-sm text-gray-600">
                Pronájem celého sklípku pro vaši skupinu
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
