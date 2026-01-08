const express = require("express");
const router = express.Router(); // 🔥 YOU MISSED THIS
const pool = require("../db");
const { sendContactEmail } = require("../utils/mailer");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields required",
      });
    }

    await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    await sendContactEmail({ name, email, message });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Contact API error:", err);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
