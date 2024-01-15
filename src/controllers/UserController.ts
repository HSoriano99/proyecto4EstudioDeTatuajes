import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";

export class UserController implements Controller {
  async getAll(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const allUsers = await userRepository.find();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting users",
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        id: id,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }


async delete(req: Request, res: Response): Promise<void | Response<any>> {
  try {
     const id = +req.params.id;

     const userRepository = AppDataSource.getRepository(User);
     await userRepository.delete(id);
  

     res.status(200).json({
        message: "User deleted successfully",
     });
  } catch (error: any) { 
     console.error("Error while delete users:", error); 
     res.status(500).json({ 
       message: "Error while delete users", 
       error: error.message, 
     }); 
   } 
 }
}



