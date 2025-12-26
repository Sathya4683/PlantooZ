import express from "express";
import {
  addItem,
  fetchItems,
  removeItem,
} from "../controllers/allController.js";

const router = express.Router();

// GET /items -> fetch all items
router.get("/", fetchItems);

// POST /items -> create a new item
router.post("/", addItem);

// DELETE /items/:id -> remove an item
router.delete("/:id", removeItem);

export default router;
