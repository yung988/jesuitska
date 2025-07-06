"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    id: 1,
    src: "/images/hero/hero.png",
    alt: "Pension Jesuitská - hlavní budova",
  },
  {
    id: 2,
    src: "/images/rooms/pokoj.png",
    alt: "Pokoj v Pensionu Jesuitská",
  },
  {
    id: 3,
    src: "/images/rooms/koupelna.png",
    alt: "Koupelna v Pensionu Jesuitská",
  },
  {
    id: 4,
    src: "/images/gallery/terasa.png",
    alt: "Terasa k posezení v Pensionu Jesuitská",
  },
  {
    id: 5,
    src: "/images/gallery/balkon.png",
    alt: "Balkon s výhledem v Pensionu Jesuitská",
  },
  {
    id: 6,
    src: "/images/hero/hero.png",
    alt: "Pohled na Pension Jesuitská",
  },
]

export default function Gallery() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  return (
    <section id="gallery" className="py-24 md:py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-wider uppercase text-center mb-4">
          Galerie
        </h2>
        <div className="w-24 h-px bg-dark-gray/30 mx-auto mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Dialog
              key={image.id}
              open={isOpen && currentImage === index}
              onOpenChange={(open) => {
                setIsOpen(open)
                if (open) setCurrentImage(index)
              }}
            >
              <DialogTrigger asChild>
                <div className="relative h-80 rounded-lg overflow-hidden cursor-pointer group">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-5xl bg-transparent border-none p-0">
                <div className="relative h-[80vh] w-full">
                  <Image
                    src={galleryImages[currentImage].src}
                    alt={galleryImages[currentImage].alt}
                    fill
                    className="object-contain"
                  />

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full bg-cream/30 backdrop-blur-sm hover:bg-cream/50 border-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Zavřít</span>
                  </Button>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-cream/30 backdrop-blur-sm hover:bg-cream/50 border-none"
                      onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                      }}
                    >
                      <ChevronLeft className="h-5 w-5" />
                      <span className="sr-only">Předchozí</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full bg-cream/30 backdrop-blur-sm hover:bg-cream/50 border-none"
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                    >
                      <ChevronRight className="h-5 w-5" />
                      <span className="sr-only">Další</span>
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 uppercase tracking-widest text-sm border-dark-gray/20 hover:bg-cream/90 hover:border-dark-gray/30"
            onClick={() => {
              setCurrentImage(0)
              setIsOpen(true)
            }}
          >
            Zobrazit všechny fotografie
          </Button>
        </div>
      </div>
    </section>
  )
}
