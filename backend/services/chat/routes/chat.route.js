import express from "express";
import { createConversation, getConversations, updateConversation, saveMessage, getMessages } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/conversation",createConversation);
router.get("/conversations",getConversations);
router.put("/conversations/:conversationId",updateConversation);
router.post("/messages",saveMessage);
router.get("/messages/:conversationId", getMessages);

export default router;