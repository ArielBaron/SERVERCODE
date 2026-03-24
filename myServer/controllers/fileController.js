
import fs from "fs";
import path from "path";
import os from "os";
import multer from "multer";

const MY_SECRET_TOKEN = "super-secret-token";

// uploads folder
export const uploadDir = path.resolve(os.homedir(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, file.originalname),
});
export const upload = multer({ storage });

// controller for JSON download
export const fileController = async (req, res) => {
  const { FILE_ACTION, FILENAME } = req.body;

  if (!FILE_ACTION) return res.status(400).json({ error: "Missing FILE_ACTION" });

  if (FILE_ACTION === "DOWNLOAD") {
    if (!FILENAME) return res.status(400).json({ error: "Missing FILENAME" });

    const filePath = path.join(uploadDir, FILENAME);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });

    res.download(filePath);
  } else {
    res.status(400).json({ error: "Unknown FILE_ACTION" });
  }
};
