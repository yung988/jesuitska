const { createStrapi } = require('@strapi/strapi');

async function seedData() {
  let strapi;
  
  try {
    // Initialize Strapi
    strapi = await createStrapi({
      dir: process.cwd(),
    });
    
    await strapi.load();
    
    console.log('🌱 Starting data seeding...\n');

    // Check if rooms already exist
    const existingRooms = await strapi.entityService.findMany('api::room.room');
  
  if (existingRooms.length === 0) {
    console.log('Seeding rooms...');
    
    // Create 10 rooms for the pension
    const rooms = [
      {
        room_number: 'Pokoj 1',
        name: 'Jednolůžkový standard',
        description: 'Útulný jednolůžkový pokoj s vlastní koupelnou.',
        price_per_night: 1200,
        capacity: 1,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna'],
        floor: 1,
        available: true,
      },
      {
        room_number: 'Pokoj 2',
        name: 'Dvoulůžkový standard',
        description: 'Prostorný dvoulůžkový pokoj s manželskou postelí.',
        price_per_night: 1800,
        capacity: 2,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna', 'Minibar'],
        floor: 1,
        available: true,
      },
      {
        room_number: 'Pokoj 3',
        name: 'Dvoulůžkový s balkónem',
        description: 'Dvoulůžkový pokoj s krásným výhledem a balkónem.',
        price_per_night: 2200,
        capacity: 2,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna', 'Balkón', 'Minibar'],
        floor: 1,
        available: true,
      },
      {
        room_number: 'Pokoj 4',
        name: 'Třílůžkový rodinný',
        description: 'Rodinný pokoj se třemi lůžky, ideální pro rodiny s dětmi.',
        price_per_night: 2800,
        capacity: 3,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna', 'Lednička'],
        floor: 1,
        available: true,
      },
      {
        room_number: 'Pokoj 5',
        name: 'Dvoulůžkový economy',
        description: 'Cenově výhodný dvoulůžkový pokoj.',
        price_per_night: 1500,
        capacity: 2,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna'],
        floor: 1,
        available: true,
      },
      {
        room_number: 'Pokoj 6',
        name: 'Apartmán',
        description: 'Luxusní apartmán s obývacím pokojem a kuchyňským koutem.',
        price_per_night: 3500,
        capacity: 4,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna', 'Kuchyňka', 'Balkón', 'Minibar'],
        floor: 2,
        available: true,
      },
      {
        room_number: 'Pokoj 7',
        name: 'Dvoulůžkový superior',
        description: 'Nadstandardní dvoulůžkový pokoj s vanou.',
        price_per_night: 2500,
        capacity: 2,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna s vanou', 'Minibar', 'Klimatizace'],
        floor: 2,
        available: true,
      },
      {
        room_number: 'Pokoj 8',
        name: 'Jednolůžkový s balkónem',
        description: 'Jednolůžkový pokoj s vlastním balkónem.',
        price_per_night: 1600,
        capacity: 1,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna', 'Balkón'],
        floor: 2,
        available: true,
      },
      {
        room_number: 'Pokoj 9',
        name: 'Dvoulůžkový oddělené postele',
        description: 'Dvoulůžkový pokoj se dvěma oddělenými postelemi.',
        price_per_night: 1800,
        capacity: 2,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna'],
        floor: 2,
        available: true,
      },
      {
        room_number: 'Pokoj 10',
        name: 'Rodinný apartmán',
        description: 'Prostorný rodinný apartmán až pro 5 osob.',
        price_per_night: 4000,
        capacity: 5,
        amenities: ['WiFi', 'TV', 'Vlastní koupelna', 'Kuchyňka', 'Balkón', 'Dva pokoje'],
        floor: 2,
        available: true,
      },
    ];

    for (const room of rooms) {
      await app.entityService.create('api::room.room', { data: room });
      console.log(`Created room: ${room.room_number}`);
    }
  } else {
    console.log('Rooms already exist, skipping...');
  }

  // Check if settings exist
  const settings = await app.entityService.findMany('api::setting.setting');
  
  if (!settings) {
    console.log('Creating pension settings...');
    
    await app.entityService.create('api::setting.setting', {
      data: {
        pension_name: 'Penzion U Zlaté Hvězdy',
        address: 'Náměstí Svobody 123, 12345 Město',
        phone: '+420 123 456 789',
        email: 'info@penzionuzlatehvezdy.cz',
        check_in_time: '14:00',
        check_out_time: '10:00',
        booking_rules: 'Rezervace je platná po zaplacení zálohy. Check-in od 14:00, check-out do 10:00. V ceně je zahrnuta snídaně.',
        cancellation_policy: 'Bezplatné storno do 48 hodin před příjezdem. Při pozdějším stornu účtujeme 50% z celkové ceny pobytu.',
        deposit_percentage: 30,
      },
    });
    console.log('Settings created');
  }

  console.log('Seed data completed!');
  process.exit(0);
}

seedData().catch((error) => {
  console.error('Error seeding data:', error);
  process.exit(1);
});
