'use client'

import { useState } from 'react'
import { format } from 'date-fns'

interface BookingFormProps {
  roomId: number
  roomName: string
  pricePerNight: number
  maxGuests: number
  onClose: () => void
}

interface BookingData {
  guest_name: string
  guest_email: string
  guest_phone: string
  check_in: string
  check_out: string
  guests_count: number
  message?: string
}

export default function BookingForm({ roomId, roomName, pricePerNight, maxGuests, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    check_in: '',
    check_out: '',
    guests_count: 1,
    message: ''
  })
  
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const calculateTotalPrice = () => {
    if (!formData.check_in || !formData.check_out) return 0
    const checkIn = new Date(formData.check_in)
    const checkOut = new Date(formData.check_out)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return nights * pricePerNight
  }

  const checkAvailability = async () => {
    if (!formData.check_in || !formData.check_out) {
      setError('Vyberte prosím datum příjezdu a odjezdu')
      return
    }

    setIsChecking(true)
    setError(null)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/rooms/${roomId}/check-availability?checkIn=${formData.check_in}&checkOut=${formData.check_out}`
      )
      
      if (!response.ok) throw new Error('Chyba při kontrole dostupnosti')
      
      const data = await response.json()
      setIsAvailable(data.data.available)
      
      if (!data.data.available) {
        setError('Pokoj není v tomto termínu dostupný')
      }
    } catch (err) {
      setError('Nepodařilo se zkontrolovat dostupnost')
      console.error(err)
    } finally {
      setIsChecking(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isAvailable === null) {
      setError('Nejprve zkontrolujte dostupnost')
      return
    }
    
    if (!isAvailable) {
      setError('Pokoj není dostupný')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const bookingData = {
        data: {
          ...formData,
          room: roomId,
          total_price: calculateTotalPrice(),
          status: 'pending'
        }
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}/api/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData)
        }
      )

      if (!response.ok) throw new Error('Chyba při vytváření rezervace')

      setSuccess(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      setError('Nepodařilo se vytvořit rezervaci')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Reset availability check when dates change
    if (name === 'check_in' || name === 'check_out') {
      setIsAvailable(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Rezervace pokoje {roomName}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Rezervace byla úspěšně vytvořena!</h3>
            <p className="text-gray-600">Potvrzení vám zašleme na email.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Datum příjezdu</label>
                <input
                  type="date"
                  name="check_in"
                  value={formData.check_in}
                  onChange={handleInputChange}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Datum odjezdu</label>
                <input
                  type="date"
                  name="check_out"
                  value={formData.check_out}
                  onChange={handleInputChange}
                  min={formData.check_in || format(new Date(), 'yyyy-MM-dd')}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-4 items-end">
              <button
                type="button"
                onClick={checkAvailability}
                disabled={isChecking || !formData.check_in || !formData.check_out}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isChecking ? 'Kontroluji...' : 'Zkontrolovat dostupnost'}
              </button>
              
              {isAvailable !== null && (
                <div className={`flex items-center ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                  {isAvailable ? '✓ Pokoj je dostupný' : '✗ Pokoj není dostupný'}
                </div>
              )}
            </div>

            {isAvailable && (
              <>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Kontaktní údaje</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Jméno a příjmení</label>
                      <input
                        type="text"
                        name="guest_name"
                        value={formData.guest_name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        name="guest_email"
                        value={formData.guest_email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Telefon</label>
                      <input
                        type="tel"
                        name="guest_phone"
                        value={formData.guest_phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Počet hostů</label>
                      <input
                        type="number"
                        name="guests_count"
                        value={formData.guests_count}
                        onChange={handleInputChange}
                        min="1"
                        max={maxGuests}
                        required
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Poznámka (nepovinné)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Celková cena:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {calculateTotalPrice().toLocaleString('cs-CZ')} Kč
                    </span>
                  </div>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                      {error}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 font-semibold"
                  >
                    {isSubmitting ? 'Odesílám rezervaci...' : 'Odeslat rezervaci'}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
