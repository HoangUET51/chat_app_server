import UserController from "@/controllers/user.controller";
import { authenticateJwt } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

const { createOrEdit, getUser } = UserController;

router.post("/createOrEdit", createOrEdit);
router.get("/", authenticateJwt, getUser);

export default router;
