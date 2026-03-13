const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const { generateAIReply } = require("../services/aiService");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic")
    message = await message.populate("chat")
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
// ===== AI ASSISTANT TRIGGER =====
    if (content.trim().startsWith("@ai")) {

      console.log("AI trigger detected:", content);

      const userPrompt = content.replace("@ai", "").trim();

      if (!userPrompt) return;

      const aiReply = await generateAIReply(userPrompt);

      if (!aiReply) return;

      // Create AI message
      let aiMessage = await Message.create({
        sender: req.user._id, // you can later replace with AI user
        content: `[AI] ${aiReply}`,
        chat: chatId,
      });

      aiMessage = await aiMessage.populate("sender", "name pic");
      aiMessage = await aiMessage.populate("chat");

      aiMessage = await User.populate(aiMessage, {
        path: "chat.users",
        select: "name pic email",
      });

      const io = req.app.get("io");

      // Emit AI message to all chat users
      aiMessage.chat.users.forEach((user) => {
        io.to(user._id.toString()).emit("message recieved", aiMessage);
      });

    }
}
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
