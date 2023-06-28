import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import updateFileRouter from "./updateFile.route";
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

export default router;
