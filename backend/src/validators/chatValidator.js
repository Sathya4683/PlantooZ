const { z } = require("zod");

const createChatSchema = z.object({
  prompt_text: z
    .string()
    .min(1, "Prompt text is required")
    .max(1000, "Prompt is too long"),

  chat_type: z.enum(["text"]),
});

module.exports = { createChatSchema };
