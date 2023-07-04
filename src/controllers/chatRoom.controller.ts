import { BaseController } from "@/base";
import { AppError } from "@/models";
import ChatRoomRepository from "@/repositories/chatRoom.repository";
import express from "express";

class _ChatRoomController extends BaseController {
  async createChatRoom(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { userIds } = req.body;
      const result = await ChatRoomRepository.createChatRoom(userIds);
      if (!result) {
        throw new AppError("Serve error");
      }
      return this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async findUserChatRooms(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { userId } = req.params;
      const result = await ChatRoomRepository.findUserChatRooms(userId);
      if (!result) {
        throw new AppError("User chat room not found");
      }
      return this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async findChatRooms(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { userIds } = req.body;
      const result = await ChatRoomRepository.findChatRooms(userIds);

      console.log(result);
      if (!result) {
        throw new AppError("Chat room not found");
      }
      this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const ChatRoomController = new _ChatRoomController("CHAT-ROOM-CONTROLLER");

export default ChatRoomController;
