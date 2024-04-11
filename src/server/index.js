const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

const server = http.createServer(app);
app.use(cors());
let elements = [];

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(__dirname, "../../build")));
app.get("/", (req, res, next) => res.sendFile(__dirname + "./index.html"));

io.on("connection", (socket) => {
  console.log("user connected");
  io.to(socket.id).emit("whiteboard-state", elements);
  socket.on("element-update", (elementData) => {
    updateElementInElements(elementData);
    // send the updated whiteboard state to all clients
    socket.broadcast.emit("element-update", elementData);
  });
  socket.on("whiteboard-clear", () => {
    elements = [];
    socket.broadcast.emit("whiteboard-clear");
  });
  socket.on("cursor-position", (cursorData) => {
    socket.broadcast.emit("cursor-position", {
      ...cursorData,
      userId: socket.id,
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3003;

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

const updateElementInElements = (elementData) => {
  const index = elements.findIndex((element) => element.id === elementData.id);

  if (index === -1) return elements.push(elementData);
  elements[index] = elementData;
};
