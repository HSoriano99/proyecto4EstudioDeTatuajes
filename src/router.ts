import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import appointmentRoutes from "./routes/appointment.routes"
// import clientRoutes from "./routes/clients.routes";


const router = express.Router();

// User routes
router.use("/api/users", userRoutes);
//Auth routes
router.use("/api/auth", authRoutes);
//Appointments routes
router.use("/api/appointments", appointmentRoutes);


export default router;
