import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ---------------------------
  // Clear existing data
  // ---------------------------
  await prisma.plantCoordinates.deleteMany();
  await prisma.postLikes.deleteMany();
  await prisma.comments.deleteMany();
  await prisma.posts.deleteMany();
  await prisma.users.deleteMany();

  // ---------------------------
  // Seed users
  // ---------------------------
  await prisma.users.createMany({
    data: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ],
  });

  const allUsers = await prisma.users.findMany();

  // ---------------------------
  // Seed posts
  // ---------------------------
  const post1 = await prisma.posts.create({
    data: {
      userId: allUsers[0].id,
      contentText: "Planted my first tree today 🌱",
      postType: "TEXT",
    },
  });

  const post2 = await prisma.posts.create({
    data: {
      userId: allUsers[1].id,
      contentText: "Trees make cities cooler 🌳",
      postType: "TEXT",
    },
  });

  // ---------------------------
  // Seed comments
  // ---------------------------
  await prisma.comments.create({
    data: {
      userId: allUsers[1].id,
      postId: post1.id,
      commentText: "That’s awesome!",
    },
  });

  // ---------------------------
  // Seed likes
  // ---------------------------
  await prisma.postLikes.create({
    data: {
      userId: allUsers[0].id,
      postId: post2.id,
    },
  });

  // ---------------------------
  // Seed plant coordinates 🌱
  // ---------------------------
  await prisma.plantCoordinates.createMany({
    data: [
      {
        userId: allUsers[0].id,
        latitude: 12.863140930318236,
        longitude: 80.07982514798641,
      },
      {
        userId: allUsers[0].id,
        latitude: 12.863137988558035,
        longitude: 80.07987879216671,
      },
      {
        userId: allUsers[1].id,
        latitude: 12.863200000000000,
        longitude: 80.079900000000000,
      },
      {
        userId: allUsers[1].id,
        latitude: 12.863050000000000,
        longitude: 80.079700000000000,
      },
    ],
  });

  console.log("🌱 Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
