import ChatRoomController from "@/controllers/chatRoom.controller";
import { authenticateJwt } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

const { createChatRoom, findUserChatRooms, findChatRooms } = ChatRoomController;

router.post("/", authenticateJwt, createChatRoom);
router.get("/user-chat-room/:userId", authenticateJwt, findUserChatRooms);
router.post("/chat-room", authenticateJwt, findChatRooms);

export default router;
