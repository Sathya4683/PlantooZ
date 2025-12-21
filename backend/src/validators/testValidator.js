const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
});

module.exports = { createUserSchema };
