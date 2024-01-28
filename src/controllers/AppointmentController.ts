import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";
import { CreateAppointmentsRequestBody } from "../types/types";

export class AppointmentController {
  async create(
    req: Request<{}, {}, CreateAppointmentsRequestBody>,

    res: Response
  ): Promise<void | Response<any>> {
    try {
      const data = req.body;
      console.log(data)
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      await appointmentRepository.save(data);
      res.status(201).json({
        message: "Appointment created successfully",
      });
    } catch (error: any) {
      console.error("Error while creating Appointment:", error);
      res.status(500).json({
        message: "Error while creating Appointment",
        error: error.message,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      await appointmentRepository.update({ id: id }, data);

      res.status(202).json({
        message: "Appointment updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating appointment",
      });
    }
  }
}
