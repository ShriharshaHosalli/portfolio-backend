const sqlite3 = require("sqlite3").verbose();

// Create / connect to database file
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("❌ SQLite connection error:", err);
  } else {
    console.log("✅ Connected to SQLite database");
  }
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    message TEXT
  )
`);

module.exports = db;