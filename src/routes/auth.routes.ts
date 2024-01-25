import express from "express";
import { AuthController } from "../controllers/AuthController";
import { auth } from "../middlewares/auth";

// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();

router.post("/registerClient", authController.registerClient);
router.post("/registerArtist", authController.registerArtist);
router.post("/login", authController.login);
router.patch("/:id", auth , authController.update);


export default router;