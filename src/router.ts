import express from "express";
import userRoutes from "./routes/user.routes";


const router = express.Router();

// User routes
router.use("/api/users", userRoutes);

export default router;
