import express from "express";
import { analyzeImage } from "../controllers/analyze.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { analyzeValidator } from "../validators/analyze.validator.js";

const router = express.Router();

router.post(
  "/analyze",
  upload.single("image"),
  analyzeValidator,
  analyzeImage
);

export default router;


