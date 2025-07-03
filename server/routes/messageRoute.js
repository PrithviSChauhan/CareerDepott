import express from "express";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

const router = express.Router();

router.get("/conversations/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.params.userId,
    }).populate("participants", "name email"); // optional
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/messages/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
