import express from "express";
import morgan from "morgan";
import testRoutes from "./routes/testRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { swaggerUi, swaggerDocument } from "./swagger.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", testRoutes);
app.use("/items", itemRoutes);
app.use("/chat", chatRoutes);
app.use("/posts", postRoutes);

export default app;
