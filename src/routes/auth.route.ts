import AuthController from "@/controllers/auth.controller";
import { authenticateJwt } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

const { authValidate } = AuthController;

router.post("/validate", authenticateJwt, authValidate);

export default router;
