import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data (order matters because of relations)
  await prisma.postLikes.deleteMany();
  await prisma.comments.deleteMany();
  await prisma.posts.deleteMany();
  await prisma.users.deleteMany();

  // Seed users
  await prisma.users.createMany({
    data: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ],
  });

  const allUsers = await prisma.users.findMany();

  // Seed posts
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

  // Seed comments
  await prisma.comments.create({
    data: {
      userId: allUsers[1].id,
      postId: post1.id,
      commentText: "That’s awesome!",
    },
  });

  // Seed likes
  await prisma.postLikes.create({
    data: {
      userId: allUsers[0].id,
      postId: post2.id,
    },
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
