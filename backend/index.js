// const app = require("./src/app");

// const PORT = process.env.PORT || 3000;
// // ... imports
// const streakRoutes = require("./src/routes/streakRoutes");

// // ... middleware

// app.use("/streak", streakRoutes); // Add this line
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


require("dotenv").config();

const app = require("./src/app");
const streakRoutes = require("./src/routes/streakRoutes");

const PORT = process.env.PORT || 3000;

/* ---------------- Routes ---------------- */

// Health check (optional but recommended)
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Streak / contribution routes
app.use("/streak", streakRoutes);

/* ---------------- Server ---------------- */

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
