import ChatRoomController from "@/controllers/chatRoom.controller";
import { authenticateJwt } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

const { createChatRoom } = ChatRoomController;

router.post("/", authenticateJwt, createChatRoom);

export default router;
