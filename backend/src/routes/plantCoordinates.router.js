import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// GET /api/plants/:userId
router.get("/:userId", async (req, res) => {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid userId" });
  }

  try {
    const plants = await prisma.plantCoordinates.findMany({
      where: { userId },
    });

    return res.json(plants);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
