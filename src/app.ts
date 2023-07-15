import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";
import routes from "./routes/index";
import LogHelper from "./helpers/log.helper";
import { AppError, ManagedError } from "./models";
import { handleAppError, handleError } from "./middlewares/error.middleware";
import { Server } from "socket.io";
import sockets from "./socket/index.socket";
import { initEnvironments, initMongooseConnection } from "./app.init";
import path from "path";

const app = express();
initEnvironments();
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use("/api", routes);
app.use(
  (
    instance: ManagedError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    const { error } = instance;
    if (error instanceof AppError) {
      handleAppError(req, res)(error);
    } else {
      handleError(req, res)(error);
    }
  },
);

setImmediate(async () => {
  await initMongooseConnection();
  const server = app.listen(process.env.APP_PORT, () => {
    LogHelper.logInfo(
      "App listening on",
      `http://localhost:${process.env.APP_PORT}`,
    );
  });

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: "*",
    },
  });

  io.on("connection", (socket) => {
    LogHelper.logInfo("SOCKET", "Socket connect", socket.id);
    for (let i = 0; i < sockets.length; i++) {
      const s = sockets[i];
      socket.on(s.event, (data) => s.handler(socket, data));
      socket.on("disconnect", () => {
        LogHelper.logInfo("SOCKET", "Socket disconnect", socket.id);
        socket.removeAllListeners();
      });
    }
  });

  process.on("SIGTERM", () => {
    LogHelper.logInfo("SIGTERM signal received: closing HTTP server");
    io.close(() => {
      LogHelper.logInfo("SOCKET", "Shutdown socket server");
    });
    server.close(() => {
      LogHelper.logInfo("HTTP server closed");
    });
  });
});
