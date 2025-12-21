const prisma = require("../prismaClient");

async function getAllUsers() {
  return prisma.Users.findMany(); // note the model name 'Users'
}

async function createUser(data) {
  return prisma.Users.create({ data });
}

module.exports = { getAllUsers, createUser };
