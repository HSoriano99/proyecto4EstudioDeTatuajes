import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";

export class UserController implements Controller {

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const allUsers = await User.find();
            res.status(200).json(allUsers);
        } catch (error) {
            res.status(500).json({
                message: "Error while getting users",
            })
        }
    }   
}