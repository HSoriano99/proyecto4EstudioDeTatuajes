import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();
const userController = new UserController();

router.get("/getAllPaginated", auth, isAdmin, userController.getAllPaginated);//como ADMIN, ver todos los users, con su rol y telefono.
router.get("/:id", auth, userController.getById);//ver NUESTRO perfil
router.delete("/:id", userController.delete);



export default router;