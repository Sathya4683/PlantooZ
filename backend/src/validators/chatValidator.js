import { z } from "zod";

const createChatSchema = z.object({
  prompt_text: z
    .string()
    .min(1, "Prompt text is required")
    .max(1000, "Prompt is too long"),

  chat_type: z.enum(["text"]),
});

export { createChatSchema };
