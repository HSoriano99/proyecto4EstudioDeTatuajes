import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserRoles } from "../constants/UserRoles";

const isAdmin = (req: any, res: Response, next: NextFunction) => {

    
       const roles = req.tokenData.userRoles;
    
       if (!roles.includes("admin")) {
          return res.status(StatusCodes.FORBIDDEN).json({
             message: "You are not allowed to access this resource",
          });
       }
    
       next();
    };
    

export { isAdmin }