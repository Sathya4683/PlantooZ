const { getAllUsers, createUser } = require("../services/testService");
const { createUserSchema } = require("../validators/testValidator");

async function fetchUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function addUser(req, res) {
  try {
    // Validate request body with Zod
    const validated = createUserSchema.parse(req.body);

    const user = await createUser(validated);
    res.status(201).json(user);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = { fetchUsers, addUser };
