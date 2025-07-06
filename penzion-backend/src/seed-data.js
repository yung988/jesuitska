'use strict';

const seedData = async (strapi) => {
  try {
    // Vytvoření pokojů
    const rooms = [
      {
        room_number: "Pokoj 1",
        name: "Dvoulůžkový pokoj",
        description: "Komfortní dvoulůžkový pokoj v historickém centru Znojma s vlastní koupelnou.",
        capacity: 2,
        price_per_night: 1500,
        amenities: [
          "Vlastní koupelna",
          "Bezplatné Wi-Fi",
          "TV s plochou obrazovkou",
          "Elektrická konvice",
          "Lednice",
          "Fén",
          "Bezplatné toaletní potřeby",
          "Ručníky a ložní prádlo",
          "Topení",
          "Šatní skříň"
        ],
        floor: 1,
        available: true
      },
      {
        room_number: "Pokoj 2",
        name: "Dvoulůžkový pokoj se dvěma lůžky",
        description: "Prostorný pokoj se dvěma samostatnými lůžky, ideální pro přátele nebo kolegy.",
        capacity: 2,
        price_per_night: 1500,
        amenities: [
          "Vlastní koupelna",
          "Bezplatné Wi-Fi",
          "TV s plochou obrazovkou",
          "Elektrická konvice",
          "Lednice",
          "Fén",
          "Bezplatné toaletní potřeby",
          "Ručníky a ložní prádlo",
          "Topení",
          "Šatní skříň"
        ],
        floor: 1,
        available: true
      },
      {
        room_number: "Pokoj 3",
        name: "Standardní dvoulůžkový pokoj",
        description: "Standardní dvoulůžkový pokoj s manželskou postelí a všemi potřebnými vymoženostmi.",
        capacity: 2,
        price_per_night: 1600,
        amenities: [
          "Vlastní koupelna",
          "Bezplatné Wi-Fi",
          "TV s plochou obrazovkou",
          "Elektrická konvice",
          "Lednice",
          "Fén",
          "Bezplatné toaletní potřeby",
          "Ručníky a ložní prádlo",
          "Topení",
          "Šatní skříň",
          "Posezení"
        ],
        floor: 2,
        available: true
      },
      {
        room_number: "Pokoj 4",
        name: "Deluxe Suite",
        description: "Luxusní apartmá s ložnicí a obývacím pokojem. Ložnice obsahuje manželskou postel a futon, obývací pokoj má rozkládací pohovku. Ideální pro rodiny.",
        capacity: 4,
        price_per_night: 2500,
        amenities: [
          "Vlastní koupelna",
          "Bezplatné Wi-Fi",
          "TV s plochou obrazovkou",
          "Elektrická konvice",
          "Lednice",
          "Fén",
          "Bezplatné toaletní potřeby",
          "Ručníky a ložní prádlo",
          "Topení",
          "Šatní skříň",
          "Obývací pokoj",
          "Pohovka",
          "Terasa s výhledem na vnitřní nádvoří"
        ],
        floor: 2,
        available: true
      }
    ];

    console.log('🌱 Začínám seedování databáze...');

    // Kontrola, jestli už existují pokoje
    const existingRooms = await strapi.entityService.findMany('api::room.room');
    
    if (existingRooms.length === 0) {
      // Vytvoření pokojů
      for (const roomData of rooms) {
        const room = await strapi.entityService.create('api::room.room', {
          data: roomData,
        });
        console.log(`✅ Vytvořen pokoj: ${room.name}`);
      }
    } else {
      console.log('ℹ️  Pokoje již existují, přeskakuji vytváření...');
    }

    // Vytvoření globálních nastavení penzionu
    const pensionInfo = {
      name: "Pension Jesuitská",
      address: "Jesuitská 5/183, 669 02 Znojmo",
      phone: "+420 603 830 130",
      phone2: "+420 515 224 496",
      email: "info@jesuitska.cz",
      website: "http://www.jesuitska.cz",
      description: "Výjimečně hodnocené ubytovací zařízení v historickém centru Znojma s celkovým hodnocením 8,8/10. Pension byl otevřen v roce 1994 po důkladné rekonstrukci historické budovy ve středověkém centru Znojma.",
      checkInTime: "13:00 - 19:00",
      checkOutTime: "08:00 - 11:00",
      amenities: [
        "Bezplatné parkování",
        "Bezplatné Wi-Fi",
        "Rodinné pokoje",
        "Nekuřácké pokoje",
        "Kávovar/čajník na všech pokojích",
        "Snídaně formou bufetu",
        "Terasa",
        "Vlastní malá vinotéka",
        "Půjčení a úschova kol"
      ],
      languages: ["Čeština", "Němčina", "Angličtina", "Slovenština"],
      policies: {
        smoking: "Kouření zakázáno",
        pets: "Domácí mazlíčci povoleni na vyžádání (mohou se účtovat poplatky)",
        parties: "Párty/akce nejsou povoleny",
        children: "Děti všech věků jsou vítány",
        childBed: "Dětská postýlka na vyžádání: 10 € za dítě za noc (0-3 roky)",
        payment: "Pouze hotovost"
      },
      nearbyAttractions: [
        { name: "Znojemský hrad", distance: "5 min pěšky" },
        { name: "Znojemské podzemí", distance: "7 min pěšky" },
        { name: "Vyhlídková radniční věž", distance: "5 min pěšky" },
        { name: "Rotunda Panny Marie a sv. Kateřiny", distance: "10 min pěšky" },
        { name: "Kostel sv. Michala", distance: "přímo u penzionu" },
        { name: "Kaňon řeky Dyje", distance: "5 min pěšky" },
        { name: "Národní park Podyjí", distance: "5 min pěšky" }
      ],
      ratings: {
        overall: 8.8,
        staff: 9.8,
        facilities: 8.4,
        location: 9.7
      }
    };

    // Uložení informací o penzionu do samostatné kolekce (pokud existuje)
    // nebo vytvoření konfiguračního souboru
    const fs = require('fs');
    const path = require('path');
    
    const configPath = path.join(__dirname, '../config/pension-info.json');
    fs.writeFileSync(configPath, JSON.stringify(pensionInfo, null, 2));
    console.log('✅ Informace o penzionu uloženy do config/pension-info.json');

    // Vytvoření vinného sklípku
    const existingWineCellar = await strapi.entityService.findMany('api::wine-cellar.wine-cellar');
    
    if (existingWineCellar.length === 0) {
      const wineCellar = await strapi.entityService.create('api::wine-cellar.wine-cellar', {
        data: {
          name: "Vinný sklípek Pension Jesuitská",
          capacity: 15,
          description: "Atmosférický vinný sklípek v historickém sklepení penzionu. Ideální pro degustace vín, rodinné oslavy nebo firemní akce. K dispozici je výběr kvalitních moravských vín z místních vinic.",
          available_times: {
            monday: ["16:00-22:00"],
            tuesday: ["16:00-22:00"],
            wednesday: ["16:00-22:00"],
            thursday: ["16:00-22:00"],
            friday: ["16:00-23:00"],
            saturday: ["14:00-23:00"],
            sunday: ["14:00-21:00"]
          },
          price_per_hour: 800,
          active: true
        },
      });
      console.log('✅ Vytvořen vinný sklípek');
    } else {
      console.log('ℹ️  Vinný sklípek již existuje, přeskakuji vytváření...');
    }

    console.log('🎉 Seedování dokončeno!');

  } catch (error) {
    console.error('❌ Chyba při seedování:', error);
  }
};

module.exports = seedData;
