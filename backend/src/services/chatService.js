import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load .env explicitly
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const SYSTEM_PROMPT = `
You are an expert in nature, trees, forests, plants, and environmental conservation.

Rules:
- Respond ONLY with information related to nature, trees, plants, forests, wildlife, climate, or environmental protection.
- If the user's question is unrelated, gently redirect the answer to a nature-related topic.
- Do NOT use metaphors or analogies.
- Keep responses informative, simple, and positive.
- Do NOT mention technology, programming, or software.

Topic focus:
- Tree planting
- Ecosystems
- Climate change
- Sustainability
- Biodiversity
`;

async function run(userPrompt) {
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.7,
  });

  const response = await model.invoke([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: userPrompt },
  ]);

  return response.content;
}

// ✅ default export (matches your controller import)
export default {
  run,
};
