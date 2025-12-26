import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔑 load .env from TWO directories back
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

// read API key
const API_KEY = process.env.GOOGLE_API_KEY;

// fail fast if missing
if (!API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set in ../../.env");
}

// init Gemini client
const genAI = new GoogleGenerativeAI(API_KEY);

// optional debug (remove later)
console.log("✅ GOOGLE_API_KEY loaded:", API_KEY.slice(0, 6) + "…");

async function checkIfPlant(imageBuffer, mimeType) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

  const prompt = `
You are an image classification system.

Task:
Determine whether the image contains a REAL PLANT (tree, shrub, grass, flower, crop, or sapling).

Rules:
- If the image clearly contains a real plant → respond ONLY with:
  {"result":"yes"}
- If the image does NOT contain a real plant or is unclear → respond ONLY with:
  {"result":"no"}
- Do NOT include explanations
- Do NOT include markdown
- Do NOT include extra keys
- Output must be valid JSON
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

  // strict guard
  if (text !== '{"result":"yes"}' && text !== '{"result":"no"}') {
    throw new Error(`Invalid Gemini response: ${text}`);
  }

  return JSON.parse(text);
}

export { checkIfPlant };
