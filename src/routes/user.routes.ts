import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getAll);
router.get("/:id", auth , userController.getById);
router.delete("/:id", userController.delete);

export default router;