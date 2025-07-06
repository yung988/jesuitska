const { createStrapi } = require('@strapi/strapi');

async function seedData() {
  let strapi;
  
  try {
    // Initialize Strapi
    strapi = await createStrapi({
      dir: process.cwd(),
    });
    
    await strapi.load();
    
    console.log('🌱 Starting simple data seeding...\n');

    // 1. Create some rooms
    console.log('📦 Creating rooms...');
    const roomsData = [
      {
        room_number: '101',
        name: 'Pokoj Standard',
        type: 'standard',
        floor: 1,
        capacity: 2,
        price_per_night: 1800,
        description: 'Útulný pokoj s manželskou postelí.',
        amenities: ['WiFi', 'TV', 'Minibar'],
        is_available: true
      },
      {
        room_number: '102',
        name: 'Pokoj Deluxe',
        type: 'deluxe',
        floor: 1,
        capacity: 2,
        price_per_night: 2500,
        description: 'Prostorný pokoj s výhledem do zahrady.',
        amenities: ['WiFi', 'TV', 'Minibar', 'Klimatizace'],
        is_available: true
      },
      {
        room_number: '201',
        name: 'Rodinný pokoj',
        type: 'family',
        floor: 2,
        capacity: 4,
        price_per_night: 3500,
        description: 'Velký pokoj pro celou rodinu.',
        amenities: ['WiFi', 'TV', 'Minibar', 'Klimatizace', 'Kuchyňka'],
        is_available: true
      }
    ];

    const createdRooms = [];
    for (const room of roomsData) {
      try {
        const created = await strapi.entityService.create('api::room.room', {
          data: room
        });
        createdRooms.push(created);
        console.log(`✅ Created room: ${room.room_number} - ${room.name}`);
      } catch (err) {
        console.log(`⚠️  Error creating room ${room.room_number}: ${err.message}`);
      }
    }

    // 2. Create a guest
    console.log('\n👥 Creating guest...');
    let guest;
    try {
      guest = await strapi.entityService.create('api::guest.guest', {
        data: {
          first_name: 'Jan',
          last_name: 'Novák',
          email: 'jan.novak@email.cz',
          phone: '+420777123456',
          address: 'Hlavní 123',
          city: 'Praha',
          country: 'Česká republika'
        }
      });
      console.log(`✅ Created guest: ${guest.first_name} ${guest.last_name}`);
    } catch (err) {
      console.log(`⚠️  Error creating guest: ${err.message}`);
    }

    // 3. Create a booking
    console.log('\n📅 Creating booking...');
    if (createdRooms.length > 0 && guest) {
      try {
        const today = new Date();
        const checkIn = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const checkOut = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000);
        
        const booking = await strapi.entityService.create('api::booking.booking', {
          data: {
            guest_name: 'Jan Novák',
            email: 'jan.novak@email.cz',
            phone: '+420777123456',
            check_in: checkIn.toISOString().split('T')[0],
            check_out: checkOut.toISOString().split('T')[0],
            guests: 2,
            total_price: 5400,
            status: 'confirmed',
            payment_status: 'pending',
            room: createdRooms[0].id,
            guest: guest.id
          }
        });
        console.log(`✅ Created booking for ${booking.guest_name}`);
      } catch (err) {
        console.log(`⚠️  Error creating booking: ${err.message}`);
      }
    }

    // 4. Create an employee
    console.log('\n👨‍💼 Creating employee...');
    try {
      const employee = await strapi.entityService.create('api::employee.employee', {
        data: {
          first_name: 'Pavel',
          last_name: 'Dvořák',
          email: 'pavel.dvorak@pension.cz',
          phone: '+420777234567',
          position: 'Recepční',
          department: 'Recepce',
          hire_date: '2022-01-15',
          is_active: true
        }
      });
      console.log(`✅ Created employee: ${employee.first_name} ${employee.last_name}`);
    } catch (err) {
      console.log(`⚠️  Error creating employee: ${err.message}`);
    }

    // 5. Create a task
    console.log('\n📋 Creating task...');
    try {
      const task = await strapi.entityService.create('api::task.task', {
        data: {
          title: 'Úklid pokoje 101',
          description: 'Kompletní úklid včetně výměny ložního prádla',
          type: 'cleaning',
          priority: 'high',
          status: 'pending',
          assigned_to: 'Pavel Dvořák',
          room: '101',
          due_date: new Date().toISOString().split('T')[0]
        }
      });
      console.log(`✅ Created task: ${task.title}`);
    } catch (err) {
      console.log(`⚠️  Error creating task: ${err.message}`);
    }

    console.log('\n🎉 Data seeding completed!');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    if (strapi && strapi.destroy) {
      await strapi.destroy();
    }
    process.exit(0);
  }
}

seedData();
