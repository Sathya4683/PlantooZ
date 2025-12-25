// const express = require("express");
// const { logActivity, getHeatmap } = require("../controllers/streakController");
// const router = express.Router();

// router.post("/log", logActivity);
// router.get("/:userId", getHeatmap);

// module.exports = router;

const express = require("express");
const {
  logActivity,
  getHeatmap,
} = require("../controllers/streakController");

const router = express.Router();

/**
 * POST /streak/log
 * Body: { userId: number }
 * Logs daily activity and updates streak
 */
router.post("/log", logActivity);

/**
 * GET /streak/:userId
 * Returns heatmap data:
 * { "YYYY-MM-DD": count }
 */
router.get("/:userId", getHeatmap);

module.exports = router;
