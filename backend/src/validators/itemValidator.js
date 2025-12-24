const { z } = require("zod");


const createItemSchema = z.object({
  item_name: z.string().min(1, "Item name is required"),

  // Accept number input, validate price
  item_price: z.coerce
    .number()
    .positive("Item price must be greater than 0")
    .max(99999999.99, "Item price is too large"),
});

module.exports = { createItemSchema };
