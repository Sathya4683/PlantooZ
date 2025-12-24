const express = require("express");
const {
  fetchItems,
  addItem,
  removeItem,
} = require("../controllers/allController");

const router = express.Router();

// GET /users -> fetch all users
router.get("/", fetchItems);
router.post("/", addItem);
router.delete("/:id", removeItem);

// POST /users -> create a new user
// router.post("/", addUser);

module.exports = router;
