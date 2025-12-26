import express from "express";
import morgan from "morgan";
import cors from "cors";

import testRoutes from "./routes/testRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import streakRoutes from "./routes/streakRoutes.js";
import { swaggerUi, swaggerDocument } from "./swagger.js";

const app = express();

/* ---------------- Middleware ---------------- */

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

/* ---------------- Docs ---------------- */

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ---------------- Routes ---------------- */

app.use("/users", testRoutes);
app.use("/items", itemRoutes);
app.use("/chat", chatRoutes);
app.use("/posts", postRoutes);
app.use("/streak", streakRoutes); 

/* ---------------- Export ---------------- */

export default app;
