import UserController from "@/controllers/user.controller";
import express from "express";

const router = express.Router();

const { createOrEdit } = UserController;

router.post("/createOrEdit", createOrEdit);

export default router;
