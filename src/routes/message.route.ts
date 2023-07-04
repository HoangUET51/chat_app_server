import ChatMessageController from "@/controllers/message.controller";
import { authenticateJwt } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

const { createChatMesssage, getMessageByChatRoom } = ChatMessageController;

router.post("/", authenticateJwt, createChatMesssage);
router.get("/:chatId", authenticateJwt, getMessageByChatRoom);

export default router;
