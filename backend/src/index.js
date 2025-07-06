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
    console.log('bootstrap starting');
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
        // Oprávnění pro Concierge Service
        {
          action: "api::concierge-service.concierge-service.find",
          enabled: true,
        },
        {
          action: "api::concierge-service.concierge-service.findOne",
          enabled: true,
        },
        // Oprávnění pro Guest
        {
          action: "api::guest.guest.find",
          enabled: true,
        },
        {
          action: "api::guest.guest.findOne",
          enabled: true,
        },
        // Oprávnění pro Concierge Request
        {
          action: "api::concierge-request.concierge-request.create",
          enabled: true,
        },
        // Oprávnění pro Employee
        {
          action: "api::employee.employee.find",
          enabled: true,
        },
        {
          action: "api::employee.employee.findOne",
          enabled: true,
        },
        // Oprávnění pro Lost Found Item
        {
          action: "api::lost-found-item.lost-found-item.find",
          enabled: true,
        },
        {
          action: "api::lost-found-item.lost-found-item.findOne",
          enabled: true,
        },
        // Oprávnění pro Schedule
        {
          action: "api::schedule.schedule.find",
          enabled: true,
        },
        {
          action: "api::schedule.schedule.findOne",
          enabled: true,
        },
        // Oprávnění pro Setting
        {
          action: "api::setting.setting.find",
          enabled: true,
        },
        {
          action: "api::setting.setting.findOne",
          enabled: true,
        },
        // Oprávnění pro Stock Item
        {
          action: "api::stock-item.stock-item.find",
          enabled: true,
        },
        {
          action: "api::stock-item.stock-item.findOne",
          enabled: true,
        },
        // Oprávnění pro Task
        {
          action: "api::task.task.find",
          enabled: true,
        },
        {
          action: "api::task.task.findOne",
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
