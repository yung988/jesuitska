'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/rooms/check-availability',
      handler: 'room.checkAvailability',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/rooms/available',
      handler: 'room.getAvailableRooms',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ],
};
