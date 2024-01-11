import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateRoles1704969342834 } from "./migrations/1704969342834-CreateRoles";
import { CreateUsers1704969387758 } from "./migrations/1704969387758-CreateUsers";
import { CreateClients1704969426948 } from "./migrations/1704969426948-CreateClients";
import { CreateArtists1704969446584 } from "./migrations/1704969446584-CreateArtists";
import { CreateAppointments1704969467186 } from "./migrations/1704969467186-CreateAppointments";
import { CreateDesigns1704969478724 } from "./migrations/1704969478724-CreateDesigns";

// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root",
   password: "root",
   database: "EstudioTatuajeDB",
   entities: [`${__dirname}/../models/**/*{.js,.ts}`],
   // migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
   migrations: [
        CreateRoles1704969342834,
        CreateUsers1704969387758,
        CreateClients1704969426948,
        CreateArtists1704969446584,
        CreateAppointments1704969467186,
        CreateDesigns1704969478724
   ],
   synchronize: false,
   logging: false,
});

// console.log(`${__dirname}/migrations`);
