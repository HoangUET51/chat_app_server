import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import LogHelper from "./helpers/log.helper";

const initEnvironments = (): void => {
  dotenv.config({
    path: path.join(process.cwd(), "environments", ".env.common"),
  });
  dotenv.config({
    path: path.join(
      process.cwd(),
      "environments",
      `.env.${process.env.NODE_ENV}`,
    ),
  });
};

const initMongooseConnection = async () => {
  const URI = process.env.ATLAS_URI || "";
  try {
    LogHelper.logInfo("Connecting to MongoDB Atlas cluster...");
    await mongoose.connect(URI);
    LogHelper.logInfo("Database connected");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
  }
};

export { initEnvironments, initMongooseConnection };
