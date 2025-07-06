'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface AvailabilityCheckerProps {
  onSearch: (checkIn: Date, checkOut: Date, guests: number) => void;
}

export function AvailabilityChecker({ onSearch }: AvailabilityCheckerProps) {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState<string>('2');

  const handleSearch = () => {
    if (checkIn && checkOut) {
      onSearch(checkIn, checkOut, parseInt(guests));
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
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
              disabled={!checkIn || !checkOut}
              className="w-full"
              size="lg"
            >
              Vyhledat pokoje
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
