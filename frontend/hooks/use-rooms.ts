import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';

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
          formats?: {
            thumbnail?: { url: string };
            medium?: { url: string };
          };
        };
      }>;
    };
    available: boolean;
    floor?: number;
    bookings?: {
      data: Array<{
        id: number;
        attributes: {
          check_in: string;
          check_out: string;
          status: string;
        };
      }>;
    };
  };
}

interface Booking {
  id: number;
  attributes: {
    check_in: string;
    check_out: string;
    status: string;
  };
}

export function useAvailableRooms(checkIn: string | null, checkOut: string | null) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRooms() {
      if (!checkIn || !checkOut) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Fetch available rooms from the backend endpoint
        const roomsResponse = await fetchAPI(`/rooms/available?checkIn=${checkIn}&checkOut=${checkOut}&populate=images`);
        
        // The backend already filters for availability, so we can use the response directly
        setRooms(roomsResponse.data || []);
      } catch (err) {
        setError('Nepodařilo se načíst dostupné pokoje');
        console.error('Error fetching rooms:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, [checkIn, checkOut]);

  return { rooms, loading, error };
}
