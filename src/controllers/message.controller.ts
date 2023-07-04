import { BaseController } from "@/base";
import { ChatRooms } from "@/entities/chatRoom";
import { Users } from "@/entities/user";
import { AppError } from "@/models";
import ChatMessageRepository from "@/repositories/message.repository";
import express from "express";

class _ChatMessageController extends BaseController {
  async createChatMesssage(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { chatId, senderId, message } = req.body;
      const chatRoom = await ChatRooms.findOne({ _id: chatId });
      const userSender = await Users.findOne({ _id: senderId });
      if (!chatRoom) {
        throw new AppError("Chat room not found");
      }
      if (!userSender) {
        throw new AppError("User not found");
      }
      const result = await ChatMessageRepository.createChatMessage(
        chatId,
        senderId,
        message,
      );

      this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async getMessageByChatRoom(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { chatId } = req.params;
      const chatRoom = await ChatRooms.findOne({ _id: chatId });
      if (!chatRoom) {
        throw new AppError("Chat room not found");
      }
      const result = await ChatMessageRepository.getMessageByChatRoom(chatId);
      this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const ChatMessageController = new _ChatMessageController(
  "CHAT-MESSAGE-CONTROLLER",
);

export default ChatMessageController;
