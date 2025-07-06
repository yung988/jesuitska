"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, parse, isValid, addDays } from "date-fns"
import { cs } from "date-fns/locale"
import { Calendar as CalendarIcon, Users, Plus, Minus, ArrowRight } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function HeroBooking() {
  const router = useRouter()
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })
  const [guests, setGuests] = useState<number>(2)
  const [checkInText, setCheckInText] = useState<string>("")
  const [checkOutText, setCheckOutText] = useState<string>("")

  // Set default dates on component mount
  useEffect(() => {
    const today = new Date()
    const tomorrow = addDays(today, 1)
    setDate({
      from: today,
      to: tomorrow
    })
  }, [])

  const handleSearch = () => {
    if (date?.from && date?.to) {
      const params = new URLSearchParams({
        checkIn: format(date.from, "yyyy-MM-dd"),
        checkOut: format(date.to, "yyyy-MM-dd"),
        guests: guests.toString(),
      })
      router.push(`/rezervace?${params.toString()}`)
    }
  }

  const handleDateInputChange = (value: string, type: 'from' | 'to') => {
    // Try to parse the date in format dd.MM.yyyy
    const parsedDate = parse(value, 'dd.MM.yyyy', new Date())
    if (isValid(parsedDate)) {
      setDate(prev => ({
        ...prev,
        [type]: parsedDate
      }))
    }
  }

  const incrementGuests = () => {
    if (guests < 6) setGuests(guests + 1)
  }

  const decrementGuests = () => {
    if (guests > 1) setGuests(guests - 1)
  }

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-6xl px-4">
      <div className="bg-white/10 backdrop-blur-lg backdrop-saturate-150 rounded-2xl p-4 shadow-2xl border border-white/20">
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Check-in date */}
          <div className="flex-1 min-w-0">
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Input
                    type="text"
                    placeholder="dd.mm.rrrr"
                    value={date?.from ? format(date.from, "dd.MM.yyyy") : checkInText}
                    onChange={(e) => {
                      setCheckInText(e.target.value)
                      handleDateInputChange(e.target.value, 'from')
                    }}
                    className="pl-10 pr-3 py-6 bg-white/90 hover:bg-white text-lg border-0 rounded-xl w-full"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date?.from}
                  onSelect={(newDate) => {
                    setDate(prev => ({ ...prev, from: newDate }))
                    setCheckInText("")
                  }}
                  locale={cs}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Arrow */}
          <ArrowRight className="h-6 w-6 text-white hidden md:block" />

          {/* Check-out date */}
          <div className="flex-1 min-w-0">
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 z-10" />
                  <Input
                    type="text"
                    placeholder="dd.mm.rrrr"
                    value={date?.to ? format(date.to, "dd.MM.yyyy") : checkOutText}
                    onChange={(e) => {
                      setCheckOutText(e.target.value)
                      handleDateInputChange(e.target.value, 'to')
                    }}
                    className="pl-10 pr-3 py-6 bg-white/90 hover:bg-white text-lg border-0 rounded-xl w-full"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date?.to}
                  onSelect={(newDate) => {
                    setDate(prev => ({ ...prev, to: newDate }))
                    setCheckOutText("")
                  }}
                  locale={cs}
                  disabled={(d) => d < new Date() || (date?.from && d < date.from)}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-12 bg-white/20" />

          {/* Guest selector */}
          <div className="flex items-center gap-2 bg-white/90 hover:bg-white rounded-xl px-4 py-3">
            <Users className="h-5 w-5 text-gray-600" />
            <span className="text-gray-600 mr-3">Hosté</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={decrementGuests}
              className="h-8 w-8 rounded-full border border-gray-300 hover:bg-gray-100"
              disabled={guests <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold text-lg">{guests}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={incrementGuests}
              className="h-8 w-8 rounded-full border border-gray-300 hover:bg-gray-100"
              disabled={guests >= 6}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Search button */}
          <Button 
            onClick={handleSearch}
            disabled={!date?.from || !date?.to}
            className="px-8 py-6 bg-warm-beige hover:bg-warm-beige/90 text-dark-gray rounded-xl text-lg font-medium"
          >
            REZERVOVAT
          </Button>
        </div>
      </div>
    </div>
  )
}
