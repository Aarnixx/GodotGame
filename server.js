const express = require("express");
const app = express();
const path = require("path");
const WebSocket = require("ws");

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});

// Serve HTML5 Godot export
app.use(express.static(path.join(__dirname, "public")));

// Setup WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Message: ${message}`);
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});
