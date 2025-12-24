require("dotenv").config();

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

async function run(prompt) {
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.7,
  });

  const response = await model.invoke(prompt);
  return response.content;
}

// test
(async () => {
  const answer = await run("Explain REST APIs in simple terms");
  console.log(answer);
})();
