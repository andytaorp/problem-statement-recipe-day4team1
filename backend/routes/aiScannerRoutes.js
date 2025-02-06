const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();
const router = express.Router();
const upload = multer(); // For handling multipart/form-data

router.post("/scan", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const formData = new FormData();
    formData.append("image", req.file.buffer, { filename: "image.jpg" });

    const response = await axios.post("https://api.logmeal.es/v2/image/scan", formData, {
      headers: {
        "Authorization": `Bearer ${process.env.LOGMEAL_API_KEY}`,
        ...formData.getHeaders(),
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
});

module.exports = router;
