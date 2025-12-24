const prisma = require("../prismaClient");

async function getAllItems() {
  return prisma.items.findMany(); // note the model name 'Users'
}

async function createItem(data) {
  return prisma.items.create({ data });
}

module.exports = { getAllItems, createItem };

