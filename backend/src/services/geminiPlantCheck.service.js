import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load .env from two directories back
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set in ../../.env");
}

const genAI = new GoogleGenerativeAI(API_KEY);

console.log("✅ GOOGLE_API_KEY loaded:", API_KEY.slice(0, 6) + "…");

async function checkIfPlant(imageBuffer, mimeType) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const prompt = `
You are an image classification system.

Task:
1. Decide whether the image contains a REAL PLANT.
2. If yes, identify the plant using a common name.

Rules (STRICT):
- If the image clearly contains a real plant, respond ONLY with:
  {"result":"yes","type":"<plant name>"}
- If the image does NOT contain a plant or is unclear, respond ONLY with:
  {"result":"no"}
- "type" must be a short common name (max 3 words, lowercase)
- Do NOT include scientific names
- Do NOT include explanations
- Do NOT include markdown
- Do NOT include extra keys
- Output must be valid JSON ONLY
`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType,
      },
    },
  ]);

  const text = result.response.text().trim();

  // ---- STRICT VALIDATION GUARD ----
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from Gemini: ${text}`);
  }

  if (
    parsed.result === "no" &&
    Object.keys(parsed).length === 1
  ) {
    return parsed;
  }

  if (
    parsed.result === "yes" &&
    typeof parsed.type === "string" &&
    parsed.type.length > 0 &&
    parsed.type.split(" ").length <= 3
  ) {
    return {
      result: "yes",
      type: parsed.type.toLowerCase(),
    };
  }

  throw new Error(`Invalid Gemini response shape: ${text}`);
}

export { checkIfPlant };
