const express = require("express");
const testRoutes = require("./routes/testRoutes");
const itemRoutes = require("./routes/itemRoutes");
const chatRoutes = require("./routes/chatRoutes");
const morgan = require("morgan");
const { swaggerUi, swaggerDocument } = require("./swagger");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Mount /users routes
app.use("/users", testRoutes);
app.use("/items", itemRoutes);
app.use("/chat", chatRoutes);

module.exports = app;
