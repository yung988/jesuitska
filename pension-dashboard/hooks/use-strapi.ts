import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAPI, postAPI, updateAPI, deleteAPI } from '@/lib/api';

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface Booking {
  id: string;
  attributes: {
    guest_name: string;
    email: string;
    phone: string;
    room: string;
    check_in: string;
    check_out: string;
    guests: number;
    total_price: number;
    status: string;
    payment_status: string;
    source: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Hook to fetch bookings from Strapi
 */
export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<Booking[]>>('/bookings?populate=*');
      return response.data;
    },
  });
}

/**
 * Hook to fetch a single booking
 */
export function useBooking(id: string) {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<Booking>>(`/bookings/${id}?populate=*`);
      return response.data;
    },
    enabled: !!id,
  });
}

/**
 * Hook to create a new booking
 */
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Booking['attributes']>) => {
      const response = await postAPI<StrapiResponse<Booking>>('/bookings', {
        data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

/**
 * Hook to update a booking
 */
export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Booking['attributes']> }) => {
      const response = await updateAPI<StrapiResponse<Booking>>(`/bookings/${id}`, {
        data,
      });
      return response.data;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['bookings', id] });
    },
  });
}

/**
 * Hook to delete a booking
 */
export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteAPI<StrapiResponse<Booking>>(`/bookings/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

/**
 * Hook to fetch rooms from Strapi
 */
export function useRooms() {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<any[]>>('/rooms?populate=*');
      return response.data;
    },
  });
}

/**
 * Hook to fetch tasks from Strapi
 */
export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<any[]>>('/tasks?populate=*');
      return response.data;
    },
  });
}

/**
 * Hook to fetch lost and found items
 */
export function useLostFoundItems() {
  return useQuery({
    queryKey: ['lost-found-items'],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<any[]>>('/lost-found-items?populate=*');
      return response.data;
    },
  });
}

/**
 * Hook to fetch schedules
 */
export function useSchedules() {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<any[]>>('/schedules?populate=*');
      return response.data;
    },
  });
}

/**
 * Hook to fetch concierge requests
 */
export function useConciergeRequests() {
  return useQuery({
    queryKey: ['concierge-requests'],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<any[]>>('/concierge-requests?populate=*');
      return response.data;
    },
  });
}

/**
 * Hook to fetch concierge services
 */
export function useConciergeServices() {
  return useQuery({
    queryKey: ['concierge-services'],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<any[]>>('/concierge-services?populate=*');
      return response.data;
    },
  });
}

/**
 * Hook to fetch stock items
 */
export function useStockItems() {
  return useQuery({
    queryKey: ['stock-items'],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<any[]>>('/stock-items?populate=*');
      return response.data;
    },
  });
}

/**
 * Hook to fetch employees
 */
export function useEmployees() {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const response = await fetchAPI<StrapiResponse<any[]>>('/employees?populate=*');
      return response.data;
    },
  });
}

/**
 * Hook to fetch dashboard stats
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Fetch multiple endpoints in parallel
      const [bookings, rooms] = await Promise.all([
        fetchAPI<StrapiResponse<Booking[]>>('/bookings?populate=*'),
        fetchAPI<StrapiResponse<any[]>>('/rooms?populate=*'),
      ]);

      // Calculate stats
      const today = new Date().toISOString().split('T')[0];
      const activeBookings = bookings.data.filter(
        (booking) => booking.attributes.status === 'confirmed'
      );
      const arrivalsToday = bookings.data.filter(
        (booking) => booking.attributes.check_in.startsWith(today)
      );
      const departuresToday = bookings.data.filter(
        (booking) => booking.attributes.check_out.startsWith(today)
      );
      const pendingBookings = bookings.data.filter(
        (booking) => booking.attributes.status === 'pending'
      );

      const occupiedRooms = activeBookings.length;
      const totalRooms = rooms.data.length;
      const occupancyRate = totalRooms > 0 ? (occupiedRooms / totalRooms) * 100 : 0;

      return {
        activeBookings: activeBookings.length,
        arrivalsToday: arrivalsToday.length,
        departuresToday: departuresToday.length,
        pendingBookings: pendingBookings.length,
        occupancyRate: Math.round(occupancyRate),
      };
    },
  });
}
