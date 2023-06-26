import mongoose from "mongoose";

export class User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  gender: string;
  avatar?: string;
}

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true, min: 1 },
    fullName: { type: String, required: true, minLength: 3, maxLength: 30 },
    email: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
      unique: true,
    },
    password: { type: String, required: true, minLength: 1024 },
    address: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      unique: true,
      minLength: 10,
      maxLength: 10,
    },
    gender: { type: String, required: true },
    avatar: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Users = mongoose.model("User", userSchema);

// class UserSchemas {
//   userSchemas() {
//     return new mongoose.Schema(
//       {
//         _id: { type: String, required: true, unique: true, min: 1 },
//         fullName: { type: String, required: true, minLength: 3, maxLength: 30 },
//         email: {
//           type: String,
//           required: true,
//           minLength: 3,
//           maxLength: 200,
//           unique: true,
//         },
//         password: { type: String, required: true, minLength: 1024 },
//         address: { type: String, required: true },
//         phone: {
//           type: String,
//           required: true,
//           unique: true,
//           minLength: 10,
//           maxLength: 10,
//         },
//         gender: { type: String, required: true },
//         avatar: { type: String },
//       },
//       {
//         timestamps: true,
//       },
//     );
//   }
// }

// const userSchemas = new UserSchemas();

// const userModel = mongoose.model("User", userSchemas.userSchemas());

// export default userModel;
