'use strict';

/**
 * room controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::room.room', ({ strapi }) => ({
  async checkAvailability(ctx) {
    const { roomId, checkIn, checkOut } = ctx.request.body;

    if (!roomId || !checkIn || !checkOut) {
      return ctx.badRequest('Missing required parameters');
    }

    const bookings = await strapi.entityService.findMany('api::booking.booking', {
      filters: {
        room: { id: roomId },
        status: { $ne: 'cancelled' },
        $or: [
          {
            check_in: { $lte: checkOut },
            check_out: { $gte: checkIn }
          }
        ]
      },
    });

    const isAvailable = bookings.length === 0;

    return { available: isAvailable, conflicts: bookings.length };
  },

  async getAvailableRooms(ctx) {
    const { checkIn, checkOut } = ctx.query;

    if (!checkIn || !checkOut) {
      return ctx.badRequest('Missing check-in or check-out date');
    }

    // Get all rooms
    const allRooms = await strapi.entityService.findMany('api::room.room', {
      filters: { available: true },
    });

    // Get bookings that overlap with the requested dates
    const conflictingBookings = await strapi.entityService.findMany('api::booking.booking', {
      filters: {
        status: { $ne: 'cancelled' },
        $or: [
          {
            check_in: { $lte: checkOut },
            check_out: { $gte: checkIn }
          }
        ]
      },
      populate: ['room'],
    });

    // Filter out rooms that have conflicting bookings
    const bookedRoomIds = conflictingBookings.map(booking => booking.room?.id).filter(Boolean);
    const availableRooms = allRooms.filter(room => !bookedRoomIds.includes(room.id));

    return { rooms: availableRooms, total: availableRooms.length };
  }
}));
