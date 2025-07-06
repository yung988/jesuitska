'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Nastavení oprávnění pro Public roli
    const publicRole = await strapi
      .query("plugin::users-permissions.role")
      .findOne({
        where: { type: "public" },
      });

    if (publicRole) {
      const permissions = await strapi
        .query("plugin::users-permissions.permission")
        .findMany({
          where: {
            role: publicRole.id,
          },
        });

      const permissionsToUpdate = [
        // Oprávnění pro Rooms
        {
          action: "api::room.room.find",
          enabled: true,
        },
        {
          action: "api::room.room.findOne",
          enabled: true,
        },
        // Oprávnění pro Bookings - pouze create
        {
          action: "api::booking.booking.create",
          enabled: true,
        },
        // Oprávnění pro Wine Cellar
        {
          action: "api::wine-cellar.wine-cellar.find",
          enabled: true,
        },
        {
          action: "api::wine-cellar.wine-cellar.findOne",
          enabled: true,
        },
        // Oprávnění pro Wine Cellar Bookings
        {
          action: "api::wine-cellar-booking.wine-cellar-booking.create",
          enabled: true,
        },
      ];

      for (const permToUpdate of permissionsToUpdate) {
        const permission = permissions.find(
          (perm) => perm.action === permToUpdate.action
        );

        if (!permission) {
          // Create permission if it doesn't exist
          await strapi
            .query("plugin::users-permissions.permission")
            .create({
              data: {
                action: permToUpdate.action,
                role: publicRole.id,
              },
            });
          
          strapi.log.info(`Oprávnění ${permToUpdate.action} bylo vytvořeno pro Public roli`);
        } else if (permission && !permission.enabled) {
          await strapi
            .query("plugin::users-permissions.permission")
            .update({
              where: { id: permission.id },
              data: { enabled: permToUpdate.enabled },
            });
          
          strapi.log.info(`Oprávnění ${permToUpdate.action} bylo povoleno pro Public roli`);
        }
      }
    }

    // Spuštění seedování dat
    const seedData = require('./seed-data');
    await seedData(strapi);
  },
};
