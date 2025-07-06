const fs = require('fs');
const path = require('path');

async function fixAdminPermissions() {
  try {
    // Start Strapi
    const { createStrapi } = require('@strapi/strapi');
    const strapi = await createStrapi({
      dir: process.cwd(),
    });
    await strapi.load();

    console.log('🚀 Starting admin permissions fix...');

    // Get all admin users
    const adminUsers = await strapi.db.query('admin::user').findMany();
    console.log(`Found ${adminUsers.length} admin users`);

    // Get all content types
    const contentTypes = Object.keys(strapi.contentTypes)
      .filter(key => key.startsWith('api::'));
    
    console.log(`Found ${contentTypes.length} API content types:`, contentTypes);

    // Get Super Admin role
    const superAdminRole = await strapi.db.query('admin::role').findOne({
      where: { code: 'strapi-super-admin' }
    });

    if (!superAdminRole) {
      console.error('❌ Super Admin role not found!');
      return;
    }

    console.log(`✅ Found Super Admin role: ${superAdminRole.name}`);

    // Check if content-manager permissions exist
    const contentManagerActions = [
      'plugin::content-manager.explorer.create',
      'plugin::content-manager.explorer.read',
      'plugin::content-manager.explorer.update',
      'plugin::content-manager.explorer.delete',
      'plugin::content-manager.explorer.publish'
    ];

    for (const contentType of contentTypes) {
      console.log(`\n📋 Processing ${contentType}...`);
      
      for (const action of contentManagerActions) {
        try {
          // Check if permission exists
          let permission = await strapi.db.query('admin::permission').findOne({
            where: {
              action,
              subject: contentType,
              role: superAdminRole.id
            }
          });

          if (!permission) {
            // Create permission
            permission = await strapi.db.query('admin::permission').create({
              data: {
                action,
                subject: contentType,
                properties: {
                  fields: ['*'],
                  locales: ['en']
                },
                conditions: [],
                role: superAdminRole.id
              }
            });
            console.log(`✅ Created permission: ${action} for ${contentType}`);
          } else {
            // Update permission to ensure it has all fields
            await strapi.db.query('admin::permission').update({
              where: { id: permission.id },
              data: {
                properties: {
                  fields: ['*'],
                  locales: ['en']
                },
                conditions: []
              }
            });
            console.log(`⚪ Updated permission: ${action} for ${contentType}`);
          }
        } catch (error) {
          console.error(`❌ Error with ${action} for ${contentType}:`, error.message);
        }
      }
    }

    // Also ensure general content-manager permissions
    const generalActions = [
      'plugin::content-manager.collection-types.configure-view',
      'plugin::content-manager.components.configure-layout'
    ];

    for (const action of generalActions) {
      let permission = await strapi.db.query('admin::permission').findOne({
        where: {
          action,
          subject: null,
          role: superAdminRole.id
        }
      });

      if (!permission) {
        permission = await strapi.db.query('admin::permission').create({
          data: {
            action,
            subject: null,
            properties: {},
            conditions: [],
            role: superAdminRole.id
          }
        });
        console.log(`✅ Created general permission: ${action}`);
      }
    }

    console.log('\n🎉 Admin permissions fixed successfully!');
    console.log('\n⚠️  Please restart Strapi and refresh the admin panel.');
    console.log('If you still don\'t see content types, try:');
    console.log('1. Log out and log back in to the admin panel');
    console.log('2. Clear your browser cache');
    console.log('3. Check the browser console for errors');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error fixing admin permissions:', error);
    process.exit(1);
  }
}

fixAdminPermissions();
