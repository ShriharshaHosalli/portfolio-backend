const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields required"
    });
  }

  const query = `
    INSERT INTO contact_messages (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.run(query, [name, email, message], function (err) {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({ success: false });
    }

    console.log("✅ Data inserted, ID:", this.lastID);

    res.json({ success: true });
  });
});

module.exports = router;