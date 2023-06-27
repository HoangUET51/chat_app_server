import { Users } from "@/entities/user";
import { hashPassword } from "@/helpers/user.helper";
import { UserModel } from "@/models/user.model";
class _UserRepository {
  async getUser(email: string) {
    return Users.findOne({ email });
  }

  async createOrEdit(user: UserModel) {
    try {
      if (user._id) {
        return Users.updateOne(
          { _id: user._id },
          {
            $set: {
              fullName: user.fullName,
              gender: user.gender,
              address: user.address,
            },
          },
        );
      } else {
        const hassPassword = hashPassword(user.password);
        const newUser = new Users({
          fullName: user.fullName,
          email: user.email,
          password: hassPassword,
          address: user.address,
          phone: user.phone,
          gender: user.gender,
          avatar: user?.avatar ?? null,
        });
        const result = await newUser.save();
        return result;
      }
    } catch (error) {
      return null;
    }
  }
}

const UserRepository = new _UserRepository();

export default UserRepository;
