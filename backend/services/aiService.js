const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateAIReply = async (prompt) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 500,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error("AI error:", error);
    return "AI service unavailable.";
  }
};

module.exports = { generateAIReply };
