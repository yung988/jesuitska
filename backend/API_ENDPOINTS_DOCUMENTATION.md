# Strapi v5 API Endpoints Documentation

## Quick Reference - All Endpoints

| Content Type | Base URL | Type | Auth Required |
|--------------|----------|------|---------------|
| Rooms | `/api/rooms` | Collection | No |
| Bookings | `/api/bookings` | Collection | Yes |
| Wine Cellar Bookings | `/api/wine-cellar-bookings` | Collection | Yes |
| Wine Cellars | `/api/wine-cellars` | Collection | Yes |
| Guests | `/api/guests` | Collection | Yes |
| Employees | `/api/employees` | Collection | Yes |
| Tasks | `/api/tasks` | Collection | Yes |
| Schedules | `/api/schedules` | Collection | Yes |
| Concierge Services | `/api/concierge-services` | Collection | Yes |
| Concierge Requests | `/api/concierge-requests` | Collection | Yes |
| Lost & Found Items | `/api/lost-found-items` | Collection | Yes |
| Stock Items | `/api/stock-items` | Collection | Yes |
| Settings | `/api/setting` | Single Type | Yes |

## Overview
In Strapi v5, collection-type routes follow the standard RESTful pattern:
- `GET /api/{collection-name}` - List all records
- `GET /api/{collection-name}/{id}` - Get single record
- `POST /api/{collection-name}` - Create new record
- `PUT /api/{collection-name}/{id}` - Update record
- `DELETE /api/{collection-name}/{id}` - Delete record

## Content Types and Their Endpoints

### 1. Rooms (Pokoje)
- **Collection Name**: `rooms`
- **Singular Name**: `room`
- **Base URL**: `/api/rooms`
- **Endpoints**:
  - `GET /api/rooms` - List all rooms
  - `GET /api/rooms/{id}` - Get single room
  - `POST /api/rooms` - Create new room
  - `PUT /api/rooms/{id}` - Update room
  - `DELETE /api/rooms/{id}` - Delete room
- **Custom Endpoints**:
  - `POST /api/rooms/check-availability` - Check room availability
  - `GET /api/rooms/available` - Get available rooms
- **Note**: Auth is disabled for all room endpoints

### 2. Bookings (Rezervace)
- **Collection Name**: `bookings`
- **Singular Name**: `booking`
- **Base URL**: `/api/bookings`
- **Endpoints**:
  - `GET /api/bookings` - List all bookings
  - `GET /api/bookings/{id}` - Get single booking
  - `POST /api/bookings` - Create new booking
  - `PUT /api/bookings/{id}` - Update booking
  - `DELETE /api/bookings/{id}` - Delete booking
- **Custom Endpoints**:
  - `GET /api/bookings/statistics` - Get booking statistics
  - `GET /api/bookings/today` - Get today's activity

### 3. Wine Cellar Bookings (Rezervace vinného sklípku)
- **Collection Name**: `wine_cellar_bookings`
- **Singular Name**: `wine-cellar-booking`
- **Base URL**: `/api/wine-cellar-bookings`
- **Endpoints**:
  - `GET /api/wine-cellar-bookings` - List all wine cellar bookings
  - `GET /api/wine-cellar-bookings/{id}` - Get single wine cellar booking
  - `POST /api/wine-cellar-bookings` - Create new wine cellar booking
  - `PUT /api/wine-cellar-bookings/{id}` - Update wine cellar booking
  - `DELETE /api/wine-cellar-bookings/{id}` - Delete wine cellar booking

### 4. Wine Cellars (Vinné sklípky)
- **Collection Name**: `wine_cellars`
- **Singular Name**: `wine-cellar`
- **Base URL**: `/api/wine-cellars`
- **Endpoints**:
  - `GET /api/wine-cellars` - List all wine cellars
  - `GET /api/wine-cellars/{id}` - Get single wine cellar
  - `POST /api/wine-cellars` - Create new wine cellar
  - `PUT /api/wine-cellars/{id}` - Update wine cellar
  - `DELETE /api/wine-cellars/{id}` - Delete wine cellar

### 5. Guests (Hosté)
- **Collection Name**: `guests`
- **Singular Name**: `guest`
- **Base URL**: `/api/guests`
- **Endpoints**:
  - `GET /api/guests` - List all guests
  - `GET /api/guests/{id}` - Get single guest
  - `POST /api/guests` - Create new guest
  - `PUT /api/guests/{id}` - Update guest
  - `DELETE /api/guests/{id}` - Delete guest

### 6. Employees (Zaměstnanci)
- **Collection Name**: `employees`
- **Singular Name**: `employee`
- **Base URL**: `/api/employees`
- **Endpoints**:
  - `GET /api/employees` - List all employees
  - `GET /api/employees/{id}` - Get single employee
  - `POST /api/employees` - Create new employee
  - `PUT /api/employees/{id}` - Update employee
  - `DELETE /api/employees/{id}` - Delete employee

### 7. Tasks (Úkoly)
- **Collection Name**: `tasks`
- **Singular Name**: `task`
- **Base URL**: `/api/tasks`
- **Endpoints**:
  - `GET /api/tasks` - List all tasks
  - `GET /api/tasks/{id}` - Get single task
  - `POST /api/tasks` - Create new task
  - `PUT /api/tasks/{id}` - Update task
  - `DELETE /api/tasks/{id}` - Delete task

### 8. Schedules (Rozvrhy)
- **Collection Name**: `schedules`
- **Singular Name**: `schedule`
- **Base URL**: `/api/schedules`
- **Endpoints**:
  - `GET /api/schedules` - List all schedules
  - `GET /api/schedules/{id}` - Get single schedule
  - `POST /api/schedules` - Create new schedule
  - `PUT /api/schedules/{id}` - Update schedule
  - `DELETE /api/schedules/{id}` - Delete schedule

### 9. Concierge Services (Concierge služby)
- **Collection Name**: `concierge_services`
- **Singular Name**: `concierge-service`
- **Base URL**: `/api/concierge-services`
- **Endpoints**:
  - `GET /api/concierge-services` - List all concierge services
  - `GET /api/concierge-services/{id}` - Get single concierge service
  - `POST /api/concierge-services` - Create new concierge service
  - `PUT /api/concierge-services/{id}` - Update concierge service
  - `DELETE /api/concierge-services/{id}` - Delete concierge service

### 10. Concierge Requests (Concierge požadavky)
- **Collection Name**: `concierge_requests`
- **Singular Name**: `concierge-request`
- **Base URL**: `/api/concierge-requests`
- **Endpoints**:
  - `GET /api/concierge-requests` - List all concierge requests
  - `GET /api/concierge-requests/{id}` - Get single concierge request
  - `POST /api/concierge-requests` - Create new concierge request
  - `PUT /api/concierge-requests/{id}` - Update concierge request
  - `DELETE /api/concierge-requests/{id}` - Delete concierge request

### 11. Lost & Found Items (Ztráty a nálezy)
- **Collection Name**: `lost_found_items`
- **Singular Name**: `lost-found-item`
- **Base URL**: `/api/lost-found-items`
- **Endpoints**:
  - `GET /api/lost-found-items` - List all lost & found items
  - `GET /api/lost-found-items/{id}` - Get single lost & found item
  - `POST /api/lost-found-items` - Create new lost & found item
  - `PUT /api/lost-found-items/{id}` - Update lost & found item
  - `DELETE /api/lost-found-items/{id}` - Delete lost & found item

### 12. Stock Items (Skladové položky)
- **Collection Name**: `stock_items`
- **Singular Name**: `stock-item`
- **Base URL**: `/api/stock-items`
- **Endpoints**:
  - `GET /api/stock-items` - List all stock items
  - `GET /api/stock-items/{id}` - Get single stock item
  - `POST /api/stock-items` - Create new stock item
  - `PUT /api/stock-items/{id}` - Update stock item
  - `DELETE /api/stock-items/{id}` - Delete stock item

### 13. Settings (Nastavení) - SINGLE TYPE
- **Collection Name**: `settings`
- **Singular Name**: `setting`
- **Base URL**: `/api/setting` (Note: singular for single types)
- **Type**: Single Type (not a collection)
- **Endpoints**:
  - `GET /api/setting` - Get settings
  - `PUT /api/setting` - Update settings
  - `DELETE /api/setting` - Delete settings

## Important Notes

1. **Authentication**: Most endpoints require authentication by default. Only the room endpoints have `auth: false` configured.

2. **URL Pattern**: 
   - **Collection Types**: Use the plural form of the collection name, converted to kebab-case:
     - `wine_cellar_bookings` → `/api/wine-cellar-bookings`
     - `lost_found_items` → `/api/lost-found-items`
   - **Single Types**: Use the singular form:
     - `setting` → `/api/setting`

3. **Query Parameters**: Standard Strapi query parameters are supported:
   - `?populate=*` - Populate all relations
   - `?filters[field][$eq]=value` - Filter results
   - `?sort=field:asc` - Sort results
   - `?pagination[page]=1&pagination[pageSize]=10` - Pagination

4. **Response Format**: All responses follow Strapi's standard format:
   ```json
   {
     "data": [...],
     "meta": {
       "pagination": {
         "page": 1,
         "pageSize": 10,
         "pageCount": 5,
         "total": 50
       }
     }
   }
   ```

5. **Current Status**: The API endpoints are returning 404 errors, which suggests either:
   - Authentication is required (most endpoints except rooms have authentication enabled)
   - The API might need proper permissions configuration
   - The server might need to be restarted after recent changes

6. **Error Responses**: Errors follow the format:
   ```json
   {
     "data": null,
     "error": {
       "status": 404,
       "name": "NotFoundError",
       "message": "Not Found",
       "details": {}
     }
   }
   ```
