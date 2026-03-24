import { MashovParser } from "mashovscraper";
import express from "express";
import dotenv from "dotenv";
import cors  from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Test route
app.post("/api", async (req, res) => {
  try {
    const { SEMEL, ID, PASSWORD } = req.body;
    if (!SEMEL || !ID || !PASSWORD) {
      return res.status(400).json({ error: "Missing SEMEL, ID, or PASSWORD" });
    }

    const data = await MashovParser.GetData({ SEMEL, ID, PASSWORD });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
