const express = require("express");
const router = express.Router();
const db = require("../db");

// Optional GET route (for browser testing)
router.get("/", (req, res) => {
  res.send("Contact API is working");
});

// POST route (actual functionality)
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields are required"
    });
  }

  const query = `
    INSERT INTO contact_messages (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.run(query, [name, email, message], function (err) {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({
        success: false,
        error: "Database error"
      });
    }

    console.log("✅ Data inserted, ID:", this.lastID);

    res.status(201).json({
      success: true,
      id: this.lastID
    });
  });
});

module.exports = router;