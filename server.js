require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (sanity check)
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Routes
const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

// 404 handler (IMPORTANT — avoids confusing errors)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});