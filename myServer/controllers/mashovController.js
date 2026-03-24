import { MashovParser } from "mashovscraper";

export const mashovController = async (req, res) => {
  const { SEMEL, ID, PASSWORD } = req.body;

  if (!SEMEL || !ID || !PASSWORD) {
    return res.status(400).json({ error: "Missing SEMEL, ID, or PASSWORD" });
  }

  try {
    const data = await MashovParser.GetData({ SEMEL, ID, PASSWORD });
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};
