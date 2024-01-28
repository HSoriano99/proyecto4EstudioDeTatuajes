import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isArtist } from "../middlewares/isArtist";
import { isClient } from "../middlewares/isClient";


const router = express.Router();
const appointmentController = new AppointmentController();

router.post("/newAppointment", auth, isArtist, appointmentController.create);//CREAMOS CITA UICAMENTE COMO ARTISTA
router.patch("/update/:id", auth, isArtist, appointmentController.update);//EDITAMOS CITA UNICAMENTE COMO ARTISTA
router.delete("/delete/:id", auth, isArtist, appointmentController.delete);//BORRAMOS CITA UNICAMENTE COMO ARTISTA
router.get("/mysessions/:id", auth, isClient , appointmentController.getById);//BUSCAMOS NUESTRAS CITAS COMO CLIENTE


export default router;