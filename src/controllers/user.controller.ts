import { BaseController } from "@/base";
import { AppError } from "@/models";
import UserRepository from "@/repositories/user.repository";
import express from "express";
class _UserController extends BaseController {
  async getUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { email } = req.body;
      console.log(req.body.user);
      const result = await UserRepository.getUser(email);
      if (!result) {
        throw new AppError("User not found");
      }
      return this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async createOrEdit(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { user } = req.body;
      const result = await UserRepository.createOrEdit(user);
      if (!result) {
        throw new AppError("User not found");
      }
      return this.success(req, res)(result);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const UserController = new _UserController("USER_CONTROLLER");
export default UserController;
