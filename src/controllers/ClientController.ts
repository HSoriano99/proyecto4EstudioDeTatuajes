import { Controller } from "./Controller";
import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User} from "../models/User";

export class ClientController {
  async getAllClients(req: Request, res: Response): Promise<void | Response<any>> {
    try {

    //   const roles = +req.params.role;
        
      const userRepository = AppDataSource.getRepository(User);
      const allClients = await userRepository.findOneBy({
        // role: roles,
      });
      res.status(200).json(allClients);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting users",
      });
    }
  }
}