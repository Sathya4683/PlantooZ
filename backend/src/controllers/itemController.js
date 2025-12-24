const { getAllItems, createItem } = require("../services/itemService");

const { createItemSchema } = require("../validators/itemValidator");

async function fetchItems(req, res) {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function addItem(req, res) {
  try {
    // Validate request body with Zod
    console.log("###############", req.body);
    const validated = createItemSchema.parse(req.body);
    console.log(validated);

    const item = await createItem(validated);
    res.status(201).json(item);
  } catch (err) {
    if (err.name === "ZodError") {
      console.log(err);
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
}

module.exports = { fetchItems, addItem };
