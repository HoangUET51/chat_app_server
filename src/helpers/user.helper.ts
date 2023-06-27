import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};

export const checkPassword = (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};

export const randomPassword = () => {
  const length = 12;
  const charset =
    "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz";
  let password = "";

  for (let i = 0, n = charset.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};
