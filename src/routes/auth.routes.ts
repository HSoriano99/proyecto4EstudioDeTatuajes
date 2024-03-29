import express from "express";
import { AuthController } from "../controllers/AuthController";
import { auth } from "../middlewares/auth";

// -----------------------------------------------------------------------------

const router = express.Router();
const authController = new AuthController();

router.post("/registerClient", authController.registerClient);
router.post("/registerArtist", authController.registerArtist);
router.post("/login", authController.login);
router.patch("/update/:id", auth, authController.update);//actualizamos NUESTRO perfil de USER
router.patch("/updateClient/user/:id", auth, authController.updateClient);//actualizamos NUESTRO perfil de CLIENTE
router.patch("/updateArtist/user/:id", auth, authController.updateArtist);//actualizamos NUESTRO perfil de ARTISTA
router.get("/getAllArtists", authController.getAllArtist);//traemos todos los artistas
router.get("/getArtistUser/:id", authController.getArtistUser);//NOS TRAEMOS EL USER_ID DE NUESTRO ARTISTA
router.get("/getClienttUser/:id", authController.getClientUser);//NOS TRAEMOS EL USER_ID DE NUESTRO CLIENTE
router.get("/getClientByUser/:id", auth, authController.getClientByUser);//NOS TRAEMOS EL CLIENTE Y EL USER, SUS CITAS Y LOS DETALLES DEL TATUADOR, TODO CON EL ID DE USER(TOKEN DESDE EL FRONT)
router.get("/getArtistByUser/:id", auth, authController.getArtistByUser);//NOS TRAEMOS EL ARTISTA Y EL USER, LOS DISEÑOS DEL ARTISTA, SUS CITAS Y LOS DETALLES DEL CLIENTE, TODO CON EL ID DE USER(TOKEN DESDE EL FRONT)

export default router;