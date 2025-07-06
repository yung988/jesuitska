import { fetchAPI } from '../api';

export interface Room {
  id: number;
  documentId: string;
  number: string;
  floor: number;
  name?: string;
  description?: string;
  capacity: number;
  pricePerNight: number;
  amenities?: string[];
  images?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomsResponse {
  data: Room[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Get all rooms
 */
export async function getRooms(): Promise<RoomsResponse> {
  return fetchAPI('/rooms?populate=*');
}

/**
 * Get a single room by ID
 */
export async function getRoom(id: string): Promise<{ data: Room }> {
  return fetchAPI(`/rooms/${id}?populate=*`);
}

/**
 * Get available rooms for a date range
 */
export async function getAvailableRooms(
  checkIn: string,
  checkOut: string
): Promise<RoomsResponse> {
  // This would need custom logic in your Strapi backend
  // For now, returning all rooms
  return getRooms();
}
