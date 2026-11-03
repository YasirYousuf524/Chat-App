import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./src/lib/db.js";

import authRoutes from "./src/routes/auth.route.js"
import messageRoutes from "./src/routes/message.route.js";


dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = process.env.PORT || 5001;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Socket.io logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  }

  // Handle sending messages
  socket.on("sendMessage", (message) => {
    const { receiverId } = message;
    if (receiverId) {
      io.to(receiverId).emit("newMessage", message);
      console.log(`Message sent to user ${receiverId}`);
    }
  });

  // Handle typing indicators
  socket.on("typing", ({ receiverId }) => {
    if (receiverId) {
      io.to(receiverId).emit("userTyping", { senderId: userId });
    }
  });

  socket.on("stopTyping", ({ receiverId }) => {
    if (receiverId) {
      io.to(receiverId).emit("userStopTyping", { senderId: userId });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});
connectDB()
