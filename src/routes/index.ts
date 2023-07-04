import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import updateFileRouter from "./updateFile.route";
import chatRoomRoute from "./chatRoom.route";
import messageRoute from "./message.route";
import AuthController from "@/controllers/auth.controller";
import UserController from "@/controllers/user.controller";

const router = express.Router();
const { login } = AuthController;
const { forgetPassword, activateAccount } = UserController;

router.post("/login", login);
router.post("/forget-pasword", forgetPassword);
router.get("/activate", activateAccount);
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/update-avatar", updateFileRouter);
router.use("/chat", chatRoomRoute);
router.use("/message", messageRoute);

export default router;
