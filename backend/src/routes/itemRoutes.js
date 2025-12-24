const express = require("express");
const { fetchItems, addItem } = require("../controllers/itemController");

const router = express.Router();

// GET /users -> fetch all users
router.get("/", fetchItems);
router.post("/", addItem);

// POST /users -> create a new user
// router.post("/", addUser);

module.exports = router;
