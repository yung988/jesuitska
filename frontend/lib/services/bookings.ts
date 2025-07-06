import { fetchAPI } from '../api';

export interface Booking {
  id: number;
  attributes: {
    booking_id?: string;
    guest_name: string;
    guest_email: string;
    guest_phone: string;
    check_in: string;
    check_out: string;
    guests_count: number;
    total_price: number;
    paid_amount?: number;
    status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
    message?: string;
    special_requests?: string;
    payment_method?: 'cash' | 'card' | 'bank_transfer' | 'online';
    created_by_admin?: boolean;
    room?: {
      data: {
        id: number;
        attributes: {
          name: string;
          room_number: string;
          price_per_night: number;
        };
      };
    };
    guest?: {
      data: {
        id: number;
        attributes: {
          name: string;
          email: string;
          phone: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface BookingsResponse {
  data: Booking[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CreateBookingData {
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  total_price: number;
  room: number;
  status?: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  message?: string;
  special_requests?: string;
  payment_method?: 'cash' | 'card' | 'bank_transfer' | 'online';
}

/**
 * Get all bookings
 */
export async function getBookings(): Promise<BookingsResponse> {
  return fetchAPI('/bookings?populate=*');
}

/**
 * Get a single booking by ID
 */
export async function getBooking(id: string): Promise<{ data: Booking }> {
  return fetchAPI(`/bookings/${id}?populate=*`);
}

/**
 * Create a new booking
 */
export async function createBooking(data: CreateBookingData): Promise<{ data: Booking }> {
  return fetchAPI('/bookings', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}

/**
 * Update a booking
 */
export async function updateBooking(
  id: string,
  data: Partial<CreateBookingData>
): Promise<{ data: Booking }> {
  return fetchAPI(`/bookings/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  });
}

/**
 * Cancel a booking
 */
export async function cancelBooking(id: string): Promise<{ data: Booking }> {
  return updateBooking(id, { status: 'cancelled' });
}
