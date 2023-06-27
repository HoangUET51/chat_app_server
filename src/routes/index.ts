import express from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";
import AuthController from "@/controllers/auth.controller";

const router = express.Router();
const { login } = AuthController;

router.post("/login", login);
router.use("/auth", authRoute);
router.use("/user", userRoute);

export default router;
