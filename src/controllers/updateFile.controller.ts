import { BaseController } from "@/base";
import { Users } from "@/entities/user";
import { AppError } from "@/models";
import express from "express";

class _UpdateFileController extends BaseController {
  async updateAvatar(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { user } = req.body;
      const { file } = req;
      const urlAvatar = `${process.env.URL_PORT}/${file?.path}`;

      const checkUser = Users.findOne({ email: user.email });

      if (!checkUser) {
        throw new AppError("User not found");
      }

      await Users.updateOne(
        { email: user.email },
        {
          $set: {
            avatar: urlAvatar,
          },
        },
      );

      return this.success(req, res)({ avatar: urlAvatar });
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const UpdateFileController = new _UpdateFileController(
  "UPDATE-FILE-CONTROLLER",
);

export default UpdateFileController;
