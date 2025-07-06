"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroBooking } from "@/components/hero-booking"

const slides = [
  {
    id: 1,
    image: "/images/hero/hero.png",
    alt: "Pension Jesuitská - ubytování v centru Znojma",
  },
  {
    id: 2,
    image: "/images/rooms/pokoj.png",
    alt: "Pohled do pokoje v Pensionu Jesuitská",
  },
  {
    id: 3,
    image: "/images/gallery/terasa.png",
    alt: "Pension Jesuitská - terasa k posezení",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      <div className="absolute top-1/2 left-10 md:left-20 transform -translate-y-1/2 max-w-md z-10 text-white">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4 tracking-wide">
          Pension Jesuitská
        </h1>
        <p className="text-lg mb-8 text-white/90">
          Pohodlné ubytování v historickém centru Znojma s vinným sklípkem. Založeno 1994.
        </p>
        <Link href="#intro">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 uppercase tracking-widest text-sm bg-cream/80 text-dark-gray hover:bg-cream/90"
          >
            Více
          </Button>
        </Link>
      </div>

      <HeroBooking />

      <div className="absolute bottom-10 right-10 flex gap-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-cream/30 backdrop-blur-sm hover:bg-cream/50 border-none text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Předchozí</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-cream/30 backdrop-blur-sm hover:bg-cream/50 border-none text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Další</span>
        </Button>
      </div>
    </section>
  )
}
