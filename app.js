import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
// import cors from "cors";
const PORT = 3000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("User Connected");
  console.log("id", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
