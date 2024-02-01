import express from "express";
import { AuthController } from "../controllers/AuthController";
import { auth } from "../middlewares/auth";

// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();

router.post("/registerClient", authController.registerClient);
router.post("/registerArtist", authController.registerArtist);
router.post("/login", authController.login);
router.patch("/update/:id", auth, authController.update);//actualizamos NUESTRO perfil
router.get("/getAllArtists", authController.getAllArtist);//traemos todos los artistas
router.get("/getArtistUser/:id", authController.getArtistUser);//NOS TRAEMOS EL USER_ID DE NUESTRO ARTISTA


export default router;