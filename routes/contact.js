const express = require("express");
const router = express.Router();
const db = require("../db");

// GET route (for testing)
router.get("/", (req, res) => {
  res.send("Contact API is working");
});

// POST route
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  // validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields are required"
    });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO contact_messages (name, email, message)
      VALUES (?, ?, ?)
    `);

    const result = stmt.run(name, email, message);

    console.log("✅ Inserted ID:", result.lastInsertRowid);

    res.status(201).json({
      success: true,
      id: result.lastInsertRowid
    });

  } catch (err) {
    console.error("❌ DB error:", err);

    res.status(500).json({
      success: false,
      error: "Database error"
    });
  }
});

module.exports = router;