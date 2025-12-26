import {
  createItem,
  createUser,
  deleteItem,
  getAllItems,
  getAllUsers,
} from "../services/allService.js";

import { createItemSchema } from "../validators/itemValidator.js";
import { createUserSchema } from "../validators/testValidator.js";

async function fetchItems(req, res) {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function addItem(req, res) {
  try {
    // Validate request body with Zod
    console.log("###############", req.body);
    const validated = createItemSchema.parse(req.body);
    console.log(validated);

    const item = await createItem(validated);
    res.status(201).json(item);
  } catch (err) {
    if (err.name === "ZodError") {
      console.log(err);
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
}

const removeItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const item = await deleteItem(id);
    res.json(item);
  } catch (err) {
    res.status(404).json({ message: "Item not found" });
  }
};

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

export {
  addItem, addUser, fetchItems, fetchUsers, removeItem
};

