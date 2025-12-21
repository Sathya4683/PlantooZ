const express = require("express");
const { fetchUsers, addUser } = require("../controllers/testController");

const router = express.Router();

// GET /users -> fetch all users
router.get("/", fetchUsers);

// POST /users -> create a new user
router.post("/", addUser);

module.exports = router;
