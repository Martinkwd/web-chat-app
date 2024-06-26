const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/clientsjs", (req, res) => {
  res.sendFile(__dirname + "/clients.js");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
const usersMap = new Map();
const getUserOnline = () => {
  io.emit("user is online", Array.from(usersMap.values()));
};

io.on("connection", (socket) => {
  usersMap.set(socket.id, socket.id);
  getUserOnline();
  console.log("a user connected");
  io.emit("chat message", "user connected"); // This will emit the event to all connected so
  socket.on("disconnect", () => {
    io.emit("chat message", "user disconnect");
    console.log("user disconnected");
    usersMap.delete(socket.id);
    getUserOnline();
  });
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", `${usersMap.get(socket.id)}: ${msg}`);
  });

  socket.on("change username", (username) => {
    usersMap.set(socket.id, username);
    getUserOnline();
  });
});
