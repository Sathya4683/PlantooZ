// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Make sure the model exists in your Prisma Client
  console.log(prisma); // optional: debug
  await prisma.users.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ],
  });
  console.log('🌱 Database seeded');
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
