import express from "express";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
// import clientRoutes from "./routes/clients.routes";


const router = express.Router();

// User routes
router.use("/api/users", userRoutes);
//Auth routes
router.use("/api/auth", authRoutes);
//Client routes
// router.use("/api/clients", clientRoutes);

export default router;
