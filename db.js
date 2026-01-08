const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

// 🔥 VERY IMPORTANT: prevent app crash
pool.on("error", (err) => {
  console.error("❌ Unexpected PostgreSQL error:", err);
});

pool
  .query("SELECT 1")
  .then(() => console.log("✅ Connected to Neon PostgreSQL"))
  .catch((err) => console.error("❌ Neon connection failed:", err));

module.exports = pool;
