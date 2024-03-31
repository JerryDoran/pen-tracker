const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

async function main() {
  try {
    // await db.brand.createMany({
    //   data: [
    //     {
    //       name: 'Lamy',
    //     },
    //     {
    //       name: 'Pilot',
    //     },
    //     {
    //       name: 'Sailor',
    //     },
    //     {
    //       name: 'Aurora',
    //     },
    //     {
    //       name: 'Benu',
    //     },
    //     {
    //       name: 'Clairefontaine',
    //     },
    //     {
    //       name: 'Diplomat',
    //     },
    //     {
    //       name: 'Esterbrook',
    //     },
    //     {
    //       name: 'Faber-Castell',
    //     },
    //     {
    //       name: 'Kaweco',
    //     },
    //     {
    //       name: 'Laben',
    //     },
    //     {
    //       name: 'Magna Cart',
    //     },
    //     {
    //       name: 'MontBlanc',
    //     },
    //     {
    //       name: 'Montegrappa',
    //     },
    //     {
    //       name: 'Monteverde',
    //     },
    //     {
    //       name: 'Namiki',
    //     },
    //     {
    //       name: 'Narwhal',
    //     },
    //     {
    //       name: 'Otto Hutt',
    //     },
    //     {
    //       name: 'Pelikan',
    //     },
    //     {
    //       name: 'Platinum',
    //     },
    //     {
    //       name: 'Scribo',
    //     },
    //     {
    //       name: 'Sheaffer',
    //     },
    //     {
    //       name: 'TWSBI',
    //     },
    //     {
    //       name: 'Visconti',
    //     },
    //     {
    //       name: 'Waldman',
    //     },
    //     {
    //       name: 'Waterman',
    //     },
    //   ],
    // });
    await db.ink.createMany({
      data: [
        {
          name: 'Platinum',
        },
        {
          name: 'Monteverde',
        },
        {
          name: 'Diamine',
        },
        {
          name: 'Private Reserve',
        },
        {
          name: 'Noodler,s',
        },
        {
          name: 'Pilot',
        },
        {
          name: 'Robert Oster',
        },
        {
          name: 'Pelikan',
        },
      ],
    });
  } catch (error) {
    console.error('Error seeding default categories:', error);
  } finally {
    await db.$disconnect();
  }
}

main();
