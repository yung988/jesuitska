"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-10 py-5 flex items-center justify-between",
        isScrolled ? "bg-cream/90 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="rounded-full px-6 uppercase tracking-widest text-sm bg-cream/80 border-none hover:bg-cream/90 md:text-xs"
          >
            <Menu className="mr-2 h-4 w-4" /> Menu
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-cream w-full sm:max-w-md">
          <SheetTitle className="sr-only">Navigační menu</SheetTitle>
          <nav className="flex flex-col gap-8 mt-16">
            <Link href="#intro" className="text-xl uppercase tracking-widest hover:text-purple transition-colors">
              O pensionu
            </Link>
            <Link href="#rooms" className="text-xl uppercase tracking-widest hover:text-purple transition-colors">
              Pokoje
            </Link>
            <Link href="#booking" className="text-xl uppercase tracking-widest hover:text-purple transition-colors">
              Rezervace
            </Link>
            <Link href="#gallery" className="text-xl uppercase tracking-widest hover:text-purple transition-colors">
              Galerie
            </Link>
            <Link href="#location" className="text-xl uppercase tracking-widest hover:text-purple transition-colors">
              Lokalita
            </Link>
            <Link href="#contact" className="text-xl uppercase tracking-widest hover:text-purple transition-colors">
              Kontakt
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div className="font-serif text-2xl tracking-wider">PENSION JESUITSKÁ</div>
      </Link>

      <Link
        href="#booking"
        className="rounded-full bg-dark-gray text-white px-6 py-2 uppercase tracking-widest text-sm hover:bg-black transition-colors"
      >
        Rezervovat
      </Link>
    </header>
  )
}
