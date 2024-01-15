import express from "express";
import { ClientController } from "../controllers/ClientController";



const router = express.Router();
const clientController = new ClientController();

router.get("/", clientController.getAllClients);

export default router;