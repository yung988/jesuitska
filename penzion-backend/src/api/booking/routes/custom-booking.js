'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/bookings/statistics',
      handler: 'booking.getStatistics',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/bookings/today',
      handler: 'booking.getTodayActivity',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
