module.exports = async ({ strapi }) => {
  console.log('🚀 Bootstrapping permissions...');
  
  const permissions = {
    public: {
      'api::room.room': ['find', 'findOne'],
      'api::booking.booking': ['find', 'findOne', 'create'],
      'api::service.service': ['find', 'findOne'],
      'api::gallery.gallery': ['find', 'findOne'],
      'api::testimonial.testimonial': ['find', 'findOne'],
      'api::page.page': ['find', 'findOne'],
      'api::setting.setting': ['find', 'findOne']
    },
    authenticated: {
      'api::room.room': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::booking.booking': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::service.service': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::gallery.gallery': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::testimonial.testimonial': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::page.page': ['find', 'findOne', 'create', 'update', 'delete'],
      'api::setting.setting': ['find', 'findOne', 'create', 'update', 'delete']
    }
  };

  try {
    // Get roles
    const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { name: 'Public' }
    });
    
    const authenticatedRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { name: 'Authenticated' }
    });

    if (!publicRole || !authenticatedRole) {
      console.error('❌ Could not find required roles');
      return;
    }

    // Update permissions for public role
    for (const [contentType, actions] of Object.entries(permissions.public)) {
      for (const action of actions) {
        await strapi.query('plugin::users-permissions.permission').updateMany({
          where: {
            role: publicRole.id,
            action: `${contentType}.${action}`
          },
          data: {
            enabled: true
          }
        });
      }
    }

    // Update permissions for authenticated role
    for (const [contentType, actions] of Object.entries(permissions.authenticated)) {
      for (const action of actions) {
        await strapi.query('plugin::users-permissions.permission').updateMany({
          where: {
            role: authenticatedRole.id,
            action: `${contentType}.${action}`
          },
          data: {
            enabled: true
          }
        });
      }
    }

    console.log('✅ Permissions bootstrapped successfully');
  } catch (error) {
    console.error('❌ Error bootstrapping permissions:', error);
  }
};
