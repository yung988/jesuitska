# Frontend-Backend Integration Guide

This guide explains how to use the Strapi backend with your Next.js frontend.

## Setup

### 1. Backend Configuration

Make sure your Strapi backend is running:

```bash
cd /Users/jangajdos/projects/jesuitska/penzion-backend
npm run develop
```

The backend will run on `http://localhost:1337`

### 2. Frontend Configuration

The frontend is already configured to connect to the backend. The configuration is in:
- `.env.local` - Contains the API URLs
- `lib/api.ts` - Base API configuration
- `lib/services/` - Service files for different data types

### 3. Environment Variables

The following environment variables are configured in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

If you need to add an API token for authentication:
```
NEXT_PUBLIC_API_TOKEN=your-api-token-here
```

## Usage

### Fetching Data

Use the service functions to fetch data from Strapi:

```typescript
import { getRooms } from '@/lib/services/rooms';
import { getBookings } from '@/lib/services/bookings';
import { getGuests } from '@/lib/services/guests';
import { getSettings } from '@/lib/services/settings';

// In your component
const rooms = await getRooms();
const bookings = await getBookings();
```

### Example Component

See `components/rooms-list.tsx` for a complete example of how to use the API services.

### Available Services

1. **Rooms Service** (`lib/services/rooms.ts`)
   - `getRooms()` - Get all rooms
   - `getRoom(id)` - Get a single room
   - `getAvailableRooms(checkIn, checkOut)` - Get available rooms

2. **Bookings Service** (`lib/services/bookings.ts`)
   - `getBookings()` - Get all bookings
   - `getBooking(id)` - Get a single booking
   - `createBooking(data)` - Create a new booking
   - `updateBooking(id, data)` - Update a booking
   - `cancelBooking(id)` - Cancel a booking

3. **Guests Service** (`lib/services/guests.ts`)
   - `getGuests()` - Get all guests
   - `getGuest(id)` - Get a single guest
   - `createGuest(data)` - Create a new guest
   - `updateGuest(id, data)` - Update a guest
   - `findGuestByEmail(email)` - Find guest by email

4. **Settings Service** (`lib/services/settings.ts`)
   - `getSettings()` - Get pension settings

### Media/Images

To get the full URL for Strapi media files:

```typescript
import { getStrapiMediaURL } from '@/lib/api';

const imageUrl = getStrapiMediaURL(room.image?.url);
```

## Troubleshooting

### CORS Errors
If you get CORS errors, make sure:
1. The backend `config/middlewares.js` includes your frontend URL
2. Both backend and frontend are running
3. The URLs in `.env.local` are correct

### API Errors
Check:
1. The backend is running (`npm run develop`)
2. The API endpoints exist in Strapi
3. The content types have proper permissions set in Strapi admin

### Authentication
If your API requires authentication:
1. Generate an API token in Strapi admin panel
2. Add it to `.env.local` as `NEXT_PUBLIC_API_TOKEN`
3. The token will be automatically included in API requests

## Next Steps

1. Create more components using the service functions
2. Add error handling and loading states
3. Implement caching for better performance
4. Add TypeScript types for better type safety
5. Create custom hooks for data fetching
