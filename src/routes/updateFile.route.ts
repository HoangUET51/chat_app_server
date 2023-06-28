import UpdateFileController from "@/controllers/updateFile.controller";
import { authenticateJwt } from "@/middlewares/auth.middleware";
import { updateFileImage } from "@/services/updateFileImage.service";
import express from "express";

const router = express.Router();
const { updateAvatar } = UpdateFileController;

router.post("/", updateFileImage("avatar"), authenticateJwt, updateAvatar);

export default router;
