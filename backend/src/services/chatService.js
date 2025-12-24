require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

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

module.exports = {
  run, // 🔴 THIS WAS MISSING OR WRONG
};

// test
// (async () => {
//   const answer = await run("what is photosynthesis?");
//   console.log(answer);
// })();
