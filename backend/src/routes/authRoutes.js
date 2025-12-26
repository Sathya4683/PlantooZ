import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { syncUser } from "../controllers/authController.js";

const router = express.Router();

// POST /auth/sync
// Called by frontend after login to ensure user exists in Postgres
router.post("/sync", requireAuth, syncUser);

export default router;
