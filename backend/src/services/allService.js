import prisma from "../prismaClient.js";

// ITEMS
async function getAllItems() {
  return prisma.items.findMany();
}

async function createItem(data) {
  return prisma.items.create({ data });
}

async function deleteItem(item_id) {
  return prisma.items.delete({
    where: { item_id },
  });
}

// USERS
async function getAllUsers() {
  return prisma.Users.findMany(); // model name is 'Users'
}

async function createUser(data) {
  return prisma.Users.create({ data });
}

export {
  createItem, createUser, deleteItem, getAllItems, getAllUsers
};

