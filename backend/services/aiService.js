const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const models = await genAI.listModels();
console.log(models);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

async function generateAIReply(message) {
  try {

    const result = await model.generateContent(message);

    const response = await result.response;

    return response.text();

  } catch (error) {

    console.error("AI error:", error);

    return "⚠️ AI service temporarily unavailable.";
  }
}

module.exports = { generateAIReply };
