import express from "express";
import { UserController } from "../controllers/UserController";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);

export default router;