import { User, Users } from "@/entities/user";
import { UserModel } from "@/models/user.model";
import uuid from "uuid";
class _UserRepository {
  async createOrEdit(user: UserModel) {
    try {
      const checkedUser = await Users.findOne({ _id: user._id });

      if (checkedUser) {
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
        const newUser = new User();
        newUser._id = uuid.v4();
        newUser.fullName = user.fullName;
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.phone = user.phone;
        newUser.gender = user.gender;
        newUser.address = user.address;
        newUser.avatar = user.avatar;
        return Users.create(newUser);
      }
    } catch (error) {
      return null;
    }
  }
}

const UserRepository = new _UserRepository();

export default UserRepository;
