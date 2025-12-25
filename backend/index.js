require("dotenv").config();

const app = require("./src/app");
const streakRoutes = require("./src/routes/streakRoutes");

const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/streak", streakRoutes);

/* ---------------- Server ---------------- */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
