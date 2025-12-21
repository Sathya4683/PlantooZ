const express = require("express");
const testRoutes = require("./routes/testRoutes");

const app = express();
app.use(express.json());

// Mount /users routes
app.use("/users", testRoutes);

module.exports = app;
