const strapi = require('@strapi/strapi');

(async () => {
  try {
    // Spuštění Strapi v tichém režimu
    const app = await strapi.createStrapi({ distDir: './dist' });
    await app.load();
    
    // Import a spuštění seed funkce
    const seedData = require('../src/seed-data');
    await seedData(app);
    
    // Ukončení Strapi
    await app.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Chyba při seedování:', error);
    process.exit(1);
  }
})();
