const { createStrapi } = require('@strapi/strapi');

async function setPermissions() {
  const strapi = await createStrapi({
    dir: process.cwd(),
  });

  await strapi.load();

  try {
    // Find public role
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) {
      console.error('Public role not found!');
      return;
    }

    console.log('Found public role:', publicRole.id);

    // Define permissions to set
    const apiEndpoints = [
      'api::room.room.find',
      'api::room.room.findOne',
      'api::booking.booking.find',
      'api::booking.booking.findOne',
      'api::booking.booking.create',
      'api::guest.guest.find',
      'api::guest.guest.findOne',
      'api::guest.guest.create',
      'api::wine-cellar.wine-cellar.find',
      'api::wine-cellar.wine-cellar.findOne',
      'api::concierge-service.concierge-service.find',
      'api::concierge-service.concierge-service.findOne',
    ];

    for (const action of apiEndpoints) {
      // Check if permission exists
      let permission = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: { 
          action,
          role: publicRole.id
        },
      });

      if (!permission) {
        // Create permission
        permission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action,
            role: publicRole.id,
          },
        });
        console.log(`Created permission: ${action}`);
      } else {
        console.log(`Permission already exists: ${action}`);
      }
    }

    console.log('Permissions set successfully!');
  } catch (error) {
    console.error('Error setting permissions:', error);
  } finally {
    await strapi.destroy();
  }
}

setPermissions();
