import { logActivity as logActivityService, getHeatmap as getHeatmapService } 
  from "../services/streakService.js";

/**
 * POST /streak/log
 */
async function logActivity(req, res) {
  try {
    const { userId } = req.body;

    if (!userId || typeof userId !== "number") {
      return res.status(400).json({
        error: "Invalid or missing userId",
      });
    }

    const result = await logActivityService(userId);
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
 */
async function getHeatmap(req, res) {
  try {
    const userId = Number(req.params.userId);

    if (!userId || Number.isNaN(userId)) {
      return res.status(400).json({
        error: "Invalid userId",
      });
    }

    const heatmap = await getHeatmapService(userId);
    return res.status(200).json(heatmap);
  } catch (error) {
    console.error("getHeatmap error:", error);
    return res.status(500).json({
      error: "Failed to fetch heatmap",
    });
  }
}

export { logActivity, getHeatmap };
