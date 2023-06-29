import { BaseController } from "@/base";
import { AppError } from "@/models";
import UserRepository from "@/repositories/user.repository";
import express from "express";

class _ChatRoomController extends BaseController {
  async createChatRoom(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { userIds } = req.body;

      const result = await UserRepository.createOrEdit(userIds);

      if (!result) {
        throw new AppError("Serve error");
      }

      return this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const ChatRoomController = new _ChatRoomController("CHAT-ROOM-CONTROLLER");

export default ChatRoomController;
