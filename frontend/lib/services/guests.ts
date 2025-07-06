import { fetchAPI } from '../api';

export interface Guest {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  idNumber?: string;
  notes?: string;
  bookings?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface GuestsResponse {
  data: Guest[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CreateGuestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  idNumber?: string;
  notes?: string;
}

/**
 * Get all guests
 */
export async function getGuests(): Promise<GuestsResponse> {
  return fetchAPI('/guests?populate=*');
}

/**
 * Get a single guest by ID
 */
export async function getGuest(id: string): Promise<{ data: Guest }> {
  return fetchAPI(`/guests/${id}?populate=*`);
}

/**
 * Create a new guest
 */
export async function createGuest(data: CreateGuestData): Promise<{ data: Guest }> {
  return fetchAPI('/guests', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}

/**
 * Update a guest
 */
export async function updateGuest(
  id: string,
  data: Partial<CreateGuestData>
): Promise<{ data: Guest }> {
  return fetchAPI(`/guests/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  });
}

/**
 * Find guest by email
 */
export async function findGuestByEmail(email: string): Promise<GuestsResponse> {
  return fetchAPI(`/guests?filters[email][$eq]=${encodeURIComponent(email)}`);
}
