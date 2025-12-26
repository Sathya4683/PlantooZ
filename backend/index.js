// require("dotenv").config();

// const app = require("./src/app");
// const streakRoutes = require("./src/routes/streakRoutes");

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import streakRoutes from "./src/routes/streakRoutes.js";

const PORT = process.env.PORT || 3000;

/* ---------------- Routes ---------------- */

// Root / health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Streak routes
app.use("/streak", streakRoutes);

/* ---------------- Server ---------------- */

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
