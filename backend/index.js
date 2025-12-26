require("dotenv").config();

const app = require("./src/app");
const streakRoutes = require("./src/routes/streakRoutes");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
