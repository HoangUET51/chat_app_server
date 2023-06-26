import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";
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
  const mongoClient = new MongoClient(URI);

  try {
    LogHelper.logInfo("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    LogHelper.logInfo("Database connected");
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
  } finally {
    await mongoClient.close();
  }
};

export { initEnvironments, initMongooseConnection };
