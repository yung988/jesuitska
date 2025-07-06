'use strict';

/**
 * Bootstrap script s diagnostikou
 */
module.exports = async ({ strapi }) => {
  console.log('🚀 Spouštím bootstrap script...');
  
  // DIAGNOSTIKA NEJPRVE
  console.log('\n🔍 DIAGNOSTIKA:');
  console.log('================');
  
  // 1. Zkontrolovat dostupné content types
  const allContentTypes = Object.keys(strapi.contentTypes);
  const apiContentTypes = allContentTypes.filter(key => key.startsWith('api::'));
  
  console.log(`📋 Celkem content types: ${allContentTypes.length}`);
  console.log(`🎯 API content types: ${apiContentTypes.length}`);
  
  if (apiContentTypes.length === 0) {
    console.log('❌ PROBLÉM: Žádné API content types nenalezeny!');
    console.log('💡 Musíte vytvořit content types v Strapi admin panelu.');
    console.log('💡 Jděte na: http://localhost:1337/admin → Content-Type Builder');
    return;
  }
  
  console.log('\n📋 Nalezené content types:');
  apiContentTypes.forEach(contentType => {
    const [prefix, fullName] = contentType.split('::');
    const controller = fullName.split('.')[0];
    console.log(`  - ${contentType} → controller: ${controller}`);
  });
  
  // 2. Zkontrolovat routes
  try {
    const routes = strapi.server.routes.routes;
    const apiRoutes = routes.filter(route => route.path.startsWith('/api/'));
    console.log(`\n🛤️  API routes: ${apiRoutes.length}`);
    
    if (apiRoutes.length === 0) {
      console.log('❌ PROBLÉM: Žádné API routes nenalezeny!');
      console.log('💡 Restartujte Strapi server');
      return;
    }
    
    console.log('📍 Dostupné API routes:');
    apiRoutes.slice(0, 10).forEach(route => {
      console.log(`  ${route.method} ${route.path}`);
    });
    if (apiRoutes.length > 10) {
      console.log(`  ... a dalších ${apiRoutes.length - 10} routes`);
    }
    
  } catch (error) {
    console.log('❌ Chyba při kontrole routes:', error.message);
  }
  
  // 3. Pokračovat s nastavením permissions
  console.log('\n🔧 NASTAVENÍ PERMISSIONS:');
  console.log('========================');
  
  try {
    // Najít public role
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      console.error('❌ Nepodařilo se najít public role');
      return;
    }

    console.log(`✅ Public role nalezena s ID: ${publicRole.id}`);

    // Získat existující permissions
    const existingPermissions = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({ where: { role: publicRole.id } });

    console.log(`📝 Nalezeno ${existingPermissions.length} existujících permissions`);

    // Vytvořit nebo aktualizovat permissions pro každý content type
    for (const contentType of apiContentTypes) {
      try {
        const [prefix, fullName] = contentType.split('::');
        const controller = fullName.split('.')[0];

        console.log(`🔧 Zpracovávám: ${contentType} (controller: ${controller})`);

        // Všechny CRUD operace
        const actionIds = ['find', 'findOne', 'count', 'create', 'update', 'delete'];

        for (const actionId of actionIds) {
          // Zkontrolovat různé formáty action
          const actionFormats = [
            `api::${controller}.${controller}.${actionId}`,
            `${controller}.${actionId}`,
            `api::${controller}.${actionId}`
          ];
          
          let permissionExists = null;
          
          for (const actionFormat of actionFormats) {
            permissionExists = existingPermissions.find(
              permission => (
                permission.action === actionFormat &&
                permission.subject === contentType
              )
            );
            if (permissionExists) break;
          }

          if (!permissionExists) {
            // Zkusit vytvořit permission se standardním formátem
            const actionFormat = `api::${controller}.${controller}.${actionId}`;
            
            try {
              await strapi.query('plugin::users-permissions.permission').create({
                data: {
                  action: actionFormat,
                  subject: contentType,
                  role: publicRole.id,
                  enabled: true,
                },
              });
              console.log(`  ✅ Vytvořena: ${actionFormat}`);
            } catch (error) {
              console.log(`  ❌ Chyba při vytváření ${actionFormat}:`, error.message);
            }
          } else if (!permissionExists.enabled) {
            await strapi.query('plugin::users-permissions.permission').update({
              where: { id: permissionExists.id },
              data: { enabled: true },
            });
            console.log(`  🔄 Povolena: ${permissionExists.action}`);
          } else {
            console.log(`  ⚡ Již existuje: ${permissionExists.action}`);
          }
        }

      } catch (error) {
        console.error(`❌ Chyba pro ${contentType}:`, error.message);
      }
    }

    console.log('\n🎉 Bootstrap dokončen!');
    console.log('📡 Testujte API na: http://localhost:1337/api/');
    
  } catch (error) {
    console.error('❌ Kritická chyba:', error.message);
  }
};