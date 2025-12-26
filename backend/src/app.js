import cors from "cors";
import express from "express";
import morgan from "morgan";

import analyze from "./routes/analyze.routes.js";
import chatRoutes from "./routes/chatRoutes.js";
// import itemRoutes from "./routes/itemRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
// import testRoutes from "./routes/testRoutes.js";
import { swaggerDocument, swaggerUi } from "./swagger.js";

const app = express();

/* ---------------- Middleware ---------------- */

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

/* ---------------- Docs ---------------- */

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ---------------- Routes ---------------- */

// app.use("/users", testRoutes);
// app.use("/items", itemRoutes);
app.use("/chat", chatRoutes);
app.use("/posts", postRoutes);
app.use("/streak", streakRoutes);
app.use("/api", analyze);

/* ---------------- Export ---------------- */

export default app;
