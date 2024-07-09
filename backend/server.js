const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require('mongoose');
const messageModel = require("./models/message.model");
const port = 5000;

// Connexion à la DB
connectDB();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


// Autorisation CORS
app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/account", require("./routes/account.routes"));
app.use("/message", require("./routes/message.routes"));

// WebSocket connection
wss.on('connection', (ws) => {
  // console.log('New client connected');
  
  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    const newMessage = new messageModel(data);
    await newMessage.save();
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newMessage));
      }
    });
  });

  ws.on('close', () => {
    // console.log('Client disconnected');
  });
});

// Lancer le serveur
server.listen(port, () => console.log("The server started at port " + port));
