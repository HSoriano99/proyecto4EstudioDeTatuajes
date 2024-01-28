import express from "express";
import { AppointmentController } from "../controllers/AppointmentController";
import { auth } from "../middlewares/auth";


const router = express.Router();
const appointmentController = new AppointmentController();

router.post("/newAppointment", appointmentController.create);
router.patch("/update/:id", appointmentController.update);

export default router;