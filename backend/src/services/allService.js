const prisma = require("../prismaClient");

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

async function getAllUsers() {
  return prisma.Users.findMany(); // note the model name 'Users'
}

async function createUser(data) {
  return prisma.Users.create({ data });
}

module.exports = { getAllUsers, createUser };

module.exports = {
  getAllItems,
  createItem,
  deleteItem,
  getAllUsers,
  createUser,
};
