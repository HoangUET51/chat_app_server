import bcrypt from "bcryptjs";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};

export const checkPassword = (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};
