import express from "express";
import { logActivity, getHeatmap } from "../controllers/streakController.js";

const router = express.Router();

/**
 * POST /streak/log
 * Body: { userId: number }
 */
router.post("/log", logActivity);

/**
 * GET /streak/:userId
 * Returns heatmap data
 */
router.get("/:userId", getHeatmap);

export default router;
