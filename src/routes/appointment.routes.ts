import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";
import { isArtist } from "../middlewares/isArtist";


const router = express.Router();
const appointmentController = new AppointmentController();

router.post("/newAppointment", auth, isArtist, appointmentController.create);
router.patch("/update/:id", auth, isArtist, appointmentController.update);
router.delete("/delete/:id", auth, isArtist, appointmentController.delete)

export default router;