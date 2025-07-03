import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import messageRoute from "./routes/messageRoute.js";
import Message from "./models/Message.js";
import Conversation from "./models/Conversation.js";
import jwt from "jsonwebtoken";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("_");
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("privateMessage", async ({ senderId, receiverId, message }) => {
    try {
      if (!senderId || !receiverId || !message?.trim()) {
        console.log("Invalid data:", { senderId, receiverId, message });
        return;
      }

      const roomId = [senderId, receiverId].sort().join("_");

      let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [senderId, receiverId],
        });
        await conversation.save();
      }

      const newMessage = new Message({
        conversationId: conversation._id,
        senderId,
        message,
      });

      await newMessage.save();

      io.to(roomId).emit("privateMessage", {
        senderId,
        message,
        conversationId: conversation._id,
      });
    } catch (err) {
      console.error("Error in privateMessage:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/auth/check", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return res.status(200).json({ user: decoded, success: true });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
