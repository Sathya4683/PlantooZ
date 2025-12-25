// const streakService = require("../services/streakService");

// const logActivity = async (req, res) => {
//   try {
//     const { userId } = req.body; 
//     if (!userId) return res.status(400).json({ message: "userId required" });

//     const result = await streakService.logActivity(userId);
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to log activity" });
//   }
// };

// const getHeatmap = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const data = await streakService.getHeatmap(parseInt(userId));
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch heatmap" });
//   }
// };

// module.exports = { logActivity, getHeatmap };

const streakService = require("../services/streakService");

/**
 * POST /streak/log
 * Body: { userId: number }
 */
async function logActivity(req, res) {
  try {
    const { userId } = req.body;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({
        error: "Invalid or missing userId",
      });
    }

    const result = await streakService.logActivity(userId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("logActivity error:", error);
    return res.status(500).json({
      error: "Failed to log activity",
    });
  }
}

/**
 * GET /streak/:userId
 * Returns heatmap data: { "YYYY-MM-DD": count }
 */
async function getHeatmap(req, res) {
  try {
    const userId = Number(req.params.userId);

    if (!userId || Number.isNaN(userId)) {
      return res.status(400).json({
        error: "Invalid userId",
      });
    }

    const heatmap = await streakService.getHeatmap(userId);

    return res.status(200).json(heatmap);
  } catch (error) {
    console.error("getHeatmap error:", error);
    return res.status(500).json({
      error: "Failed to fetch heatmap",
    });
  }
}

module.exports = {
  logActivity,
  getHeatmap,
};
