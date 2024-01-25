import express from "express";
import { AuthController } from "../controllers/AuthController";

// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();

router.post("/registerClient", authController.registerClient);
router.post("/registerArtist", authController.registerArtist);
router.post("/login", authController.login);


export default router;