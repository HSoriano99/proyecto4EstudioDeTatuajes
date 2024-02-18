import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Appointment } from "../models/Appointment";
import { Client } from "../models/Client";
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

  async delete(
    req: Request,
    res: Response
  ): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;

      const appointmentRepository = AppDataSource.getRepository(Appointment);
      await appointmentRepository.delete(id);

      res.status(200).json({
        message: "Appointment deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while deleting appointment",
      });
    }
  }

  async getByClientId(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointments = await appointmentRepository.findBy({
         client_id:id
      });

      if (!appointments) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }

  async getByArtistId(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointments = await appointmentRepository.findBy({
         artist_id:id
      });

      if (!appointments) {
        return res.status(404).json({
          message: "Appointment not found",
        });
      }

      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting appointments",
      });
    }
  }


  async getAllPaginated(req: Request, res: Response): Promise<void | Response<any>> {
    try {
       const appointmentRepository = AppDataSource.getRepository(Appointment);

       let { page, skip } = req.query;

       let currentPage = page ? +page : 1;
       let itemsPerPage = skip ? +skip : 3;

       const [allAppointments, count] = await appointmentRepository.findAndCount({
          skip: (currentPage - 1) * itemsPerPage,
          take: itemsPerPage,
          relations: {
            client: true,
            artist: true,
          },
          select: {
             id: true,
             date: true,
             shift: true,
             client: {
              first_name: true,
              phone_number: true,
             },
             artist: {
              first_name: true,
              phone_number: true,
             }
          },
       });
       res.status(200).json({
          count,
          skip: itemsPerPage,
          page: currentPage,
          results: allAppointments,
       });
    } catch (error) {
       res.status(500).json({
          message: "Error while getting users",
       });
    }
 }

}
