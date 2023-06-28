import { MAIL_ACTION } from "@/constants/sendMail.const";
import { Users } from "@/entities/user";
import { hashPassword, randomPassword } from "@/helpers/user.helper";
import { UserModel } from "@/models/user.model";
import { MailInfo, sendMails } from "@/services/sendMail.service";
import { sign, verify } from "jsonwebtoken";
class _UserRepository {
  async getUser(email: string) {
    return Users.findOne({ email });
  }

  async createOrEdit(user: UserModel) {
    try {
      if (user._id) {
        const hassPassword = hashPassword(user.password);
        return Users.updateOne(
          { _id: user._id },
          {
            $set: {
              fullName: user.fullName,
              gender: user.gender,
              address: user.address,
              password: hassPassword,
            },
          },
        );
      } else {
        const hassPassword = hashPassword(user.password);
        const token = sign(
          {
            email: user.email,
            fullName: user.fullName,
            avatar: user?.avatar ?? null,
            address: user.address,
            gender: user.gender,
            phone: user.phone,
            password: hassPassword,
          },
          `${process.env.TOKEN_KEY}`,
          { expiresIn: "1d" },
        );

        const mailAction: MailInfo = {
          mailAction: MAIL_ACTION.ACTIVATE_ACCOUNT,
          toEmail: user.email,
          toUser: user.fullName,
          others: token,
        };

        sendMails(mailAction);
        return token;
      }
    } catch (error) {
      return null;
    }
  }

  async activateAccount(token: string | null) {
    try {
      if (!token) return;

      const user = (await verify(
        token,
        process.env.TOKEN_KEY ?? "",
      )) as UserModel;

      if (!user) {
        return;
      }

      const newUser = new Users({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: user.phone,
        gender: user.gender,
        avatar: user?.avatar ?? null,
      });

      const result = await newUser.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  async forgetPassword(email: string) {
    try {
      const user = await Users.findOne({ email });
      if (!user) {
        return;
      }

      const newPassword = randomPassword();
      const hassPassword = hashPassword(newPassword);

      const mailAction: MailInfo = {
        mailAction: MAIL_ACTION.FORTGET_PASSWORD,
        toEmail: email,
        toUser: user.fullName,
        others: newPassword,
      };

      sendMails(mailAction);
      return Users.updateOne(
        { email },
        {
          $set: {
            password: hassPassword,
          },
        },
      );
    } catch (error) {
      return null;
    }
  }
}

const UserRepository = new _UserRepository();

export default UserRepository;
