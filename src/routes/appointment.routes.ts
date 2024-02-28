import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import { isArtist } from "../middlewares/isArtist";
import { isClient } from "../middlewares/isClient";


const router = express.Router();
const appointmentController = new AppointmentController();

router.post("/newAppointment", auth, appointmentController.create);//CREAMOS CITA
router.patch("/update/:id", auth, isAdmin, appointmentController.update);//EDITAMOS CITA UNICAMENTE COMO ADMIN
router.delete("/delete/:id", auth, isAdmin, appointmentController.delete);//BORRAMOS CITA UNICAMENTE COMO ADMIN
router.get("/myClientSessions/:id", auth, isClient , appointmentController.getByClientId);//BUSCAMOS NUESTRAS CITAS COMO CLIENTE
router.get("/myArtistSessions/:id", auth, isArtist , appointmentController.getByArtistId);//BUSCAMOS NUESTRAS CITAS COMO ARTISTA
router.get("/getAllPaginated", auth, isAdmin , appointmentController.getAllPaginated);//BUSCAMOS TODAS LAS CTAS PAGINADAS COMO ADMIN LOGUEADO, TRAYENDO INFO DE LA CITA Y NOMBRE DE CLIENTE Y ARTISTA


export default router;