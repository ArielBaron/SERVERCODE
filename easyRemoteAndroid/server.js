import express from "express";
import https from "https";
import { WebSocketServer } from "ws";
import fs from "fs";
import "dotenv/config";

const app = express();
const PORT = 4000;
app.use(express.json());

function auth(req, res, next) {
  if (req.headers["x-token"] !== process.env.TOKEN)
    return res.status(403).json({ error: "Invalid token" });
  next();
}
app.use(auth);

app.post("/ping", (req, res) => {
  const from = req.socket.remoteAddress.replace("::ffff:", "");
  console.log(`Incoming from ${from}`, req.body);
  broadcast({ from, body: req.body });
  res.json({ ok: true, from: `${from}` });
});

const server = https.createServer(
  {
    cert: fs.readFileSync("/home/server/certs/server.crt"),
    key: fs.readFileSync("/home/server/certs/server.key"),
  },
  app
);

const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on("connection", (ws, req) => {
  const token = new URL(req.url, "https://x").searchParams.get("token");
  if (token !== process.env.TOKEN) {
    ws.close(1008, "Invalid token");
    return;
  }
  clients.add(ws);
  console.log("PC client connected");
  ws.on("close", () => clients.delete(ws));
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  for (const ws of clients) ws.send(msg);
}

server.listen(PORT, "0.0.0.0", () =>
  console.log(`easyRemoteAndroid running on port ${PORT}`)
);
