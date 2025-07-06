module.exports = {
  async afterCreate(event) {
    const { result } = event;
    
    // Update guest's total stays when a booking is confirmed
    if (result.guest && result.status === 'confirmed') {
      const guest = await strapi.entityService.findOne('api::guest.guest', result.guest.id);
      
      if (guest) {
        await strapi.entityService.update('api::guest.guest', guest.id, {
          data: {
            total_stays: (guest.total_stays || 0) + 1,
          },
        });
      }
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;
    
    // Check if status changed to checked_out
    if (result.status === 'checked_out' && params.data.status !== 'checked_out') {
      if (result.guest) {
        const guest = await strapi.entityService.findOne('api::guest.guest', result.guest.id);
        
        if (guest) {
          // Count all completed stays
          const completedBookings = await strapi.entityService.findMany('api::booking.booking', {
            filters: {
              guest: { id: guest.id },
              status: 'checked_out',
            },
          });
          
          await strapi.entityService.update('api::guest.guest', guest.id, {
            data: {
              total_stays: completedBookings.length,
            },
          });
        }
      }
    }
  },
};
