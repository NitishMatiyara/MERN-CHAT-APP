const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAIReply(prompt) {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);

    return result.response.text();

  } catch (error) {

    console.error("AI error:", error);

    return "AI is temporarily unavailable.";
  }
}

module.exports = { generateAIReply };
