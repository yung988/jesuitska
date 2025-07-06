const fs = require('fs');
const path = require('path');

// Copy TypeScript configs to JS format temporarily
function createJSConfigs() {
  const configDir = path.join(__dirname, '..', 'config');
  const configs = ['admin', 'api', 'database', 'middlewares', 'plugins', 'server'];
  
  configs.forEach(configName => {
    const tsFile = path.join(configDir, `${configName}.ts`);
    const jsFile = path.join(configDir, `${configName}.js`);
    
    if (fs.existsSync(tsFile) && !fs.existsSync(jsFile)) {
      let content = fs.readFileSync(tsFile, 'utf8');
      
      // Simple TypeScript to JavaScript conversion
      content = content
        .replace(/import\s+.*?from\s+['"]path['"];?\n?/g, "const path = require('path');\n")
        .replace(/export\s+default\s+/g, 'module.exports = ')
        .replace(/:\s*\w+/g, '') // Remove type annotations
        .replace(/\?\s*:/g, ':'); // Remove optional type annotations
      
      fs.writeFileSync(jsFile, content);
      console.log(`Created temporary ${configName}.js`);
    }
  });
}

// Remove temporary JS configs
function cleanupJSConfigs() {
  const configDir = path.join(__dirname, '..', 'config');
  const configs = ['admin', 'api', 'database', 'middlewares', 'plugins', 'server'];
  
  configs.forEach(configName => {
    const jsFile = path.join(configDir, `${configName}.js`);
    const tsFile = path.join(configDir, `${configName}.ts`);
    
    if (fs.existsSync(jsFile) && fs.existsSync(tsFile)) {
      fs.unlinkSync(jsFile);
      console.log(`Removed temporary ${configName}.js`);
    }
  });
}

async function setPermissions() {
  try {
    createJSConfigs();
    
    const { createStrapi } = require('@strapi/strapi');
    
    const strapi = await createStrapi({
      dir: process.cwd(),
    });

    await strapi.load();

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
      'api::concierge-request.concierge-request.find',
      'api::concierge-request.concierge-request.findOne',
      'api::concierge-request.concierge-request.create',
      'api::concierge-service.concierge-service.find',
      'api::concierge-service.concierge-service.findOne',
      'api::employee.employee.find',
      'api::employee.employee.findOne',
      'api::lost-found-item.lost-found-item.find',
      'api::lost-found-item.lost-found-item.findOne',
      'api::schedule.schedule.find',
      'api::schedule.schedule.findOne',
      'api::setting.setting.find',
      'api::setting.setting.findOne',
      'api::stock-item.stock-item.find',
      'api::stock-item.stock-item.findOne',
      'api::task.task.find',
      'api::task.task.findOne',
      'api::wine-cellar.wine-cellar.find',
      'api::wine-cellar.wine-cellar.findOne',
      'api::wine-cellar-booking.wine-cellar-booking.find',
      'api::wine-cellar-booking.wine-cellar-booking.findOne',
      'api::wine-cellar-booking.wine-cellar-booking.create',
      // Users-permissions plugin endpoints
      'plugin::users-permissions.auth.callback',
      'plugin::users-permissions.auth.connect',
      'plugin::users-permissions.user.me',
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
        console.log(`✅ Created permission: ${action}`);
      } else {
        console.log(`⚪ Permission already exists: ${action}`);
      }
    }

    console.log('\n🎉 Permissions set successfully!');
    console.log('\nYou should now see your content-types in the Strapi admin panel.');
    console.log('Try refreshing the admin panel or logging out and back in.');
    
  } catch (error) {
    console.error('❌ Error setting permissions:', error);
  } finally {
    try {
      if (typeof strapi !== 'undefined' && strapi.destroy) {
        await strapi.destroy();
      }
    } catch (destroyError) {
      console.error('Error destroying Strapi:', destroyError);
    }
    
    cleanupJSConfigs();
  }
}

setPermissions();
