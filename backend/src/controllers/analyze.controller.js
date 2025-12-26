import { checkIfPlant } from "../services/geminiPlantCheck.service.js";

const analyzeImage = async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    const result = await checkIfPlant(imageBuffer, mimeType);

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Image analysis failed" });
  }
};

export { analyzeImage };
