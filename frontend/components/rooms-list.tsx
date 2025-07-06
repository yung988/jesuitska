'use client';

import { useEffect, useState } from 'react';
import { getRooms, type Room } from '@/lib/services/rooms';
import { getStrapiMediaURL } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export function RoomsList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await getRooms();
        setRooms(response.data);
      } catch (err) {
        setError('Failed to load rooms');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No rooms available</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <Card key={room.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Room {room.number}</CardTitle>
                {room.name && <CardDescription>{room.name}</CardDescription>}
              </div>
              <Badge variant="secondary">Floor {room.floor}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Capacity: {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
              </p>
              <p className="text-lg font-semibold">
                ${room.pricePerNight} / night
              </p>
              {room.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {room.description}
                </p>
              )}
              {room.amenities && room.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {room.amenities.slice(0, 3).map((amenity, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {room.amenities.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{room.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
