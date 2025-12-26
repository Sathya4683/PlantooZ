import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import app from "./src/app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👇 explicitly point to ../../.env
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

console.log("hello world")

const PORT = process.env.PORT || 3000;

// console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
