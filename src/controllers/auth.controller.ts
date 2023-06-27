import { Request, Response, NextFunction } from "express";
import { BaseController } from "../base";
import { Users } from "@/entities/user";
import { checkPassword } from "@/helpers/user.helper";
import { sign } from "jsonwebtoken";
import { AppError } from "@/models";

class _AuthController extends BaseController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) {
        throw new AppError("User not found");
      }

      const checkPass = await checkPassword(password, user.password);

      if (!checkPass) {
        throw new AppError("Username or password is not valid.");
      }

      const token = sign(
        {
          email: user.email,
          fullname: user.fullName,
          avatar: user?.avatar,
          address: user.address,
          gender: user.gender,
          phone: user.phone,
        },
        `${process.env.TOKEN_KEY}`,
        { expiresIn: "1d" },
      );

      const userModel = {
        accessToken: token,
        user: {
          email: user.email,
          fullname: user.fullName,
          avatar: user?.avatar,
          address: user.address,
          gender: user.gender,
          phone: user.phone,
        },
      };

      this.success(req, res)(userModel);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const AuthController = new _AuthController("AUTH_CONTROLLER");
export default AuthController;
