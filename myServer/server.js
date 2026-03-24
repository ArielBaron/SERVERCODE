
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { mashovController } from "./controllers/mashovController.js";
import { fileController, upload, uploadDir } from "./controllers/fileController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // needed for form fields

const MY_SECRET_TOKEN = "super-secret-token";

// static file paths
const mashovDist = path.resolve(__dirname, "../way-better-mashov-live/dist");
const calcDist = path.resolve(__dirname, "../Calc/dist");
const trainingCardsDist = path.resolve(__dirname, "/home/server/code/Train-for-Test-using-traning-cards/dist");

// serve static files
app.use("/mashov", express.static(mashovDist));
app.use("/flashcards", express.static(trainingCardsDist));
app.use("/calculator", express.static(calcDist));

// controllers map
const controllers = {
  MASHOV: mashovController,
};
// Add this after your middleware setup, before the static file routes
app.get('/', (req, res) => {
  res.json({ 
    message: "API Server is running",
    endpoints: {
      "/api": "POST - Main API endpoint (requires ACTION in body)",
      "/mashov": "Static files for Mashov app",
      "/flashcards": "Static files for Flashcards app", 
      "/calculator": "Static files for Calculator app"
    },
    documentation: "Send POST requests to /api with ACTION field"
  });
});

// Optional: Add a health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
// unified /api endpoint
app.post("/api", (req, res) => {
  const contentType = req.headers["content-type"] || "";

  const isFileUpload = contentType.startsWith("multipart/form-data");
  const isFileDownload = req.body?.ACTION === "FILE" && req.body?.FILE_ACTION === "DOWNLOAD";

  // check token only for file operations
  if ((isFileUpload || isFileDownload) && req.headers["x-api-token"] !== MY_SECRET_TOKEN) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (isFileUpload) {
    // handle file upload via multer
    upload.single("file")(req, res, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });
      res.json({ message: "File uploaded", filename: req.file.filename });
    });
  } 
  else if (isFileDownload) {
    fileController(req, res).catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
  } 
  else {
    // handle other controllers
    const { ACTION } = req.body;
    if (!ACTION) return res.status(400).json({ error: "Missing ACTION" });

    const handler = controllers[ACTION];
    if (!handler) return res.status(400).json({ error: "Unknown ACTION" });

    handler(req, res).catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Upload folder: ${uploadDir}`);
});
