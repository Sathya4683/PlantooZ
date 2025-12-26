import chatService from "../services/chatService.js";
import { createChatSchema } from "../validators/chatValidator.js";

const chatController = async (req, res) => {
  try {
    const parsed = createChatSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json(parsed.error.format());
    }

    const { prompt_text, chat_type } = parsed.data;

    // for now, only text is supported
    if (chat_type !== "text") {
      return res.status(400).json({
        message: "Only text chat is supported currently",
      });
    }

    const response = await chatService.run(prompt_text);

    return res.status(200).json({
      chat_type,
      response,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({
      message: error.message || "Failed to generate response",
    });
  }
};

export { chatController };
