import { Request, Response } from "express";
import { CreateClientRequestBody, CreateArtistRequestBody, LoginUserRequestBody, TokenData} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { AppDataSource } from "../database/data-source";
import { Role } from "../models/Role";
import { Client } from "../models/Client";
import { Artist } from "../models/Artist";
import { Design } from "../models/Design";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Appointment } from "../models/Appointment";

export class AuthController {
    
    async registerClient(
      //Proceso de registro de nuevo cliente 
        req: Request<{}, {}, CreateClientRequestBody>,
        res: Response
     ): Promise<void | Response<any>> {
        const { username, password, email, first_name, phone_number } = req.body;


        const userRepository = AppDataSource.getRepository(User);
        const clientRepository = AppDataSource.getRepository(Client);
        const roleRepository = AppDataSource.getRepository(Role);
        const rolesData = await roleRepository.find();

        try {
           //Crear neuvo usuario
            const newUser = userRepository.create({
                username,
                email,
                password_hash: bcrypt.hashSync(password, 10),
                role: rolesData[2],
            });
            await userRepository.save(newUser);
            
          //Crear nuevo cliente y asociarlo con el usuario recien creado
            const newClient = clientRepository.create({
              user: newUser,
              first_name,
              phone_number,
            });
            await clientRepository.save(newClient);

            res.status(201).json(newClient);
          } catch (error: any) {
            console.error("Error while creating user:", error);
            res.status(500).json({
              message: "Error while creating user",
              error: error.message,
            });
          }

    }

    async registerArtist(
      req: Request<{}, {}, CreateArtistRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email, first_name, phone_number, tattoo_style } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const artistRepository = AppDataSource.getRepository(Artist);
      const roleRepository = AppDataSource.getRepository(Role);
      const rolesData = await roleRepository.find();


      try {
         
          const newUser = userRepository.create({
              username,
              email,
              password_hash: bcrypt.hashSync(password, 10),
              role: rolesData[1],
          });
          await userRepository.save(newUser);

           //Crear nuevo artista y asociarlo con el usuario recien creado
           const newArtist = artistRepository.create({
            user: newUser,
            first_name,
            phone_number,
            tattoo_style,
          });
          await artistRepository.save(newArtist);

          res.status(201).json(newArtist);
        } catch (error: any) {
          console.error("Error while creating user:", error);
          res.status(500).json({
            message: "Error while creating user",
            error: error.message,
          });
        }
  }

  async login(
    req: Request<{}, {}, LoginUserRequestBody>,
    res: Response
  ): Promise<void | Response<any>> {
    const { password, email } = req.body;

    const userRepository = AppDataSource.getRepository(User);

    try {
      // Validar existencia de email y contraseña
      if (!email || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Email or password is required",
        });
      }
      // Encontrar un usuario por email
      const user = await userRepository.findOne({
        where: {
          email: email,
        },
        relations: {
          role: true,
        },
        select: {
          id:true,
          password_hash: true,
          role: {
            role_name: true,
          },
        },
      });


      // Verificar usuario inexistente
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      // Verificar contraseña si el usuario existe
      const isPasswordValid = bcrypt.compareSync(
        password,
        user.password_hash
      );

      // Verificar contraseña valida
      if (!isPasswordValid) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Bad email or password",
        });
      }

      // Generar token
      const userRole = user.role.role_name

      const tokenPayload: TokenData = {
        userId: user.id?.toString() as string,
        userRoles: userRole as string
      
      };

      const token = jwt.sign(tokenPayload, "123", {
        expiresIn: "3h",
      });

      res.status(StatusCodes.OK).json({
        message: "Login successfully",
        token,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error while login",
        error,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const userRepository = AppDataSource.getRepository(User);
      await userRepository.update({ id: id }, data);

      res.status(202).json({
        message: "User updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating user",
      });
    }
  }

  async updateClient(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const userRepository = AppDataSource.getRepository(User);
      
      const user = await userRepository.findOneBy({
        id: id,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const userClient = Number(user.id);
      const clientRepository = AppDataSource.getRepository(Client);
      const client = await clientRepository.findOneBy({
        user_id: userClient

      });

      const clientId = Number(client?.id)

      const clientRepositoryUpdate = AppDataSource.getRepository(Client);
      await clientRepositoryUpdate.update({ id: clientId }, data);

      res.status(202).json({
        message: "Client updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating client",
      });
    }
  }

  async updateArtist(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const id = +req.params.id;
      const data = req.body;

      const userRepository = AppDataSource.getRepository(User);
      
      const user = await userRepository.findOneBy({
        id: id,
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const userArtist = Number(user.id);
      const artistRepository = AppDataSource.getRepository(Artist);
      const artist = await artistRepository.findOneBy({
        user_id: userArtist

      });

      const artistId = Number(artist?.id)

      const artistRepositoryUpdate = AppDataSource.getRepository(Artist);
      await artistRepositoryUpdate.update({ id: artistId }, data);

      res.status(202).json({
        message: "Artist updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error while updating client",
      });
    }
  }

  async getAllArtist(req: Request, res: Response): Promise<void | Response<any>> {
    try {
      const artistRepository = AppDataSource.getRepository(Artist);
      const allArtists = await artistRepository.find();
      res.status(200).json(allArtists);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting users",
      });
    }
  }

  async getArtistUser(req: Request, res: Response): Promise<void | Response<any>> {
    try {

      const id = +req.params.id;

      const artistRepository = AppDataSource.getRepository(Artist);
      
      const artist = await artistRepository.findOneBy({
        id: id,
      });

      if (!artist) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const artistUser = Number(artist.user_id);
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        id: artistUser

      });
       // operador spread "..." desempaqueta las claves del objeto
      const response = {
        ...artist,
        ...user,
      }
      //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
      response.id = artist.id

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }

  async getClientUser(req: Request, res: Response): Promise<void | Response<any>> {
    try {

      const id = +req.params.id;

      const clientRepository = AppDataSource.getRepository(Client);
      
      const client = await clientRepository.findOneBy({
        id: id,
      });

      if (!client) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const clientUser = Number(client.user_id);
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({
        id: clientUser

      });
       // operador spread "..." desempaqueta las claves del objeto
      const response = {
        ...client,
        ...user,
      }
      //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
      response.id = client.id

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }

  async getClientByUser(req: Request, res: Response): Promise<void | Response<any>> {
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

      const userClient = Number(user.id);
      const clientRepository = AppDataSource.getRepository(Client);
      const client = await clientRepository.findOneBy({
        user_id: userClient

      });

      const clientId = Number(client?.id)
      
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointment = await appointmentRepository.find({
        where: {client_id: clientId},
        relations: {
          artist:true
        },
        select: {
          id:true,
          date:true,
          shift:true,
          artist: {
            first_name:true,
            tattoo_style:true,
            phone_number:true,
          }
        }

      })

       // operador spread "..." desempaqueta las claves del objeto
      const response = {
        ...client,
        ...user,
        appointment
      }
      //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
      response.id = client!.id

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }

  async getArtistByUser(req: Request, res: Response): Promise<void | Response<any>> {
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

      const userArtist = Number(user.id);
      
      const artistRepository = AppDataSource.getRepository(Artist);
      const artist = await artistRepository.findOneBy({
        user_id: userArtist

      });

      const artistId = Number(artist?.id)

      const designRepository = AppDataSource.getRepository(Design);
      const design = await designRepository.find({
        where: {artist_id: artistId},
        select: {
          id: true,
          artist_id: true,
          design_name:true,
          image:true,
        }
      })
      
      const appointmentRepository = AppDataSource.getRepository(Appointment);
      const appointment = await appointmentRepository.find({
        where: {artist_id: artistId},
        relations: {
          client:true
        },
        select: {
          id:true,
          date:true,
          shift:true,
          client: {
            first_name:true,
            phone_number:true,
          }
        }

      })

       // operador spread "..." desempaqueta las claves del objeto
      const response = {
        ...artist,
        ...design,
        ...user,
        appointment
      }
      //Reasigno el valor de response.id puesto que se pisa su valor con el método spread.
      response.id = artist!.id

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: "Error while getting user",
      });
    }
  }

 

}