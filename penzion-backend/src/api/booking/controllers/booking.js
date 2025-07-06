'use strict';

/**
 * booking controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::booking.booking', ({ strapi }) => ({
  async create(ctx) {
    // Generate booking ID
    const generateBookingId = async () => {
      const today = new Date();
      const year = today.getFullYear().toString().slice(-2);
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      
      // Find the last booking ID for this month
      const lastBooking = await strapi.db.query('api::booking.booking').findOne({
        where: {
          booking_id: {
            $startsWith: `BK${year}${month}`
          }
        },
        orderBy: { booking_id: 'DESC' }
      });
      
      let sequence = 1;
      if (lastBooking && lastBooking.booking_id) {
        const lastSequence = parseInt(lastBooking.booking_id.slice(-3));
        sequence = lastSequence + 1;
      }
      
      return `BK${year}${month}${sequence.toString().padStart(3, '0')}`;
    };

    // Add booking_id to the request data
    const bookingId = await generateBookingId();
    ctx.request.body.data = {
      ...ctx.request.body.data,
      booking_id: bookingId
    };

    // Call the default core controller
    const response = await super.create(ctx);
    return response;
  },

  async getStatistics(ctx) {
    const { startDate, endDate } = ctx.query;
    
    const filters = {};
    if (startDate) {
      filters.createdAt = { $gte: startDate };
    }
    if (endDate) {
      filters.createdAt = { ...filters.createdAt, $lte: endDate };
    }

    const bookings = await strapi.entityService.findMany('api::booking.booking', {
      filters,
    });

    // Calculate statistics
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (parseFloat(b.total_price) || 0), 0);
    const paidAmount = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (parseFloat(b.paid_amount) || 0), 0);

    return {
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue,
      paidAmount,
      pendingAmount: totalRevenue - paidAmount,
    };
  },

  async getTodayActivity(ctx) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's check-ins
    const checkIns = await strapi.entityService.findMany('api::booking.booking', {
      filters: {
        check_in: today.toISOString().split('T')[0],
        status: { $in: ['confirmed', 'checked_in'] },
      },
      populate: ['room', 'guest'],
    });

    // Get today's check-outs
    const checkOuts = await strapi.entityService.findMany('api::booking.booking', {
      filters: {
        check_out: today.toISOString().split('T')[0],
        status: { $in: ['confirmed', 'checked_in', 'checked_out'] },
      },
      populate: ['room', 'guest'],
    });

    // Get current occupancy
    const occupiedBookings = await strapi.entityService.findMany('api::booking.booking', {
      filters: {
        check_in: { $lte: today.toISOString() },
        check_out: { $gt: today.toISOString() },
        status: { $in: ['checked_in'] },
      },
    });

    const totalRooms = await strapi.entityService.count('api::room.room', {
      filters: { available: true },
    });

    return {
      date: today.toISOString().split('T')[0],
      checkIns: checkIns.length,
      checkOuts: checkOuts.length,
      checkInsList: checkIns,
      checkOutsList: checkOuts,
      occupiedRooms: occupiedBookings.length,
      totalRooms,
      occupancyRate: totalRooms > 0 ? (occupiedBookings.length / totalRooms * 100).toFixed(1) : 0,
    };
  }
}));
