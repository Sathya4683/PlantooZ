const analyzeValidator = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "Image file is required" });
  }

  if (!req.file.mimetype.startsWith("image/")) {
    return res.status(400).json({ error: "Only image files are allowed" });
  }

  next();
};

export { analyzeValidator };
