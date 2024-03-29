import { AppDataSource } from "../data-source";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Role } from "../../models/Role";
import { UserRoles } from "../../constants/UserRoles";

// -----------------------------------------------------------------------------

/**
 * Seeder para la generación de usuarios y su almacenamiento en la base de datos.
 */
export const userSeeder = async () => {
   try {
      // Inicializar la conexión con la base de datos
      await AppDataSource.initialize();

      // Definir la cantidad de estudiantes a crear
      const count = 5;

      // / Llamar a la función para sembrar usuarios con roles
      await seedUsersWithRoles({
         roles: [UserRoles.ADMIN], //Elegimos ADMIN, ARTIST o CLIENTS en funcion de que rol queramos
         count: count,
      });

      // Imprimir mensaje de éxito
      console.log("Seeding users successfully completed");
   } catch (error) {
      console.error("Error seeding the database:", error);
   } finally {
      // Cerrar la conexión con la base de datos, independientemente del resultado
      await AppDataSource.destroy();
   }
};

export const seedUsersWithRoles = async ({
   roles,
   count,
}: {
   roles: Role[] ;
   count: number;
}) => {

   // Obtener repositorios y fábricas necesarios
   const userRepository = AppDataSource.getRepository(User);
   const userFactory = new UserFactory(userRepository);

   const roleRepository = AppDataSource.getRepository(Role);
   let rolesData = await roleRepository.find();

   // Generar usuarios
   const users = userFactory.createMany(count);

   // Asignar roles a cada usuario(si queremos ARTISTS debemos poner [1] en rolesData y [2] si queremos CLIENTS)
   users.forEach((user) => {
      user.role = rolesData[0];
   });
  

   // Guardar usuarios en la base de datos
   await userRepository.save(users);

   return users;
};
