import express from "express";
import { UserController } from "../controllers/UserController";
import { auth } from "../middlewares/auth";
// import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();
const userController = new UserController();

router.get("/:id", auth , userController.getById);//ver NUESTRO perfil
// router.delete("/:id", userController.delete);
//router.get("/",auth, userController.getAll);


export default router;