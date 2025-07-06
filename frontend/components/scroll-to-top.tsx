"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-8 right-8 z-40 rounded-full bg-cream/80 backdrop-blur-sm hover:bg-cream border-none shadow-md"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-5 w-5" />
          <span className="sr-only">Zpět nahoru</span>
        </Button>
      )}
    </>
  )
}
