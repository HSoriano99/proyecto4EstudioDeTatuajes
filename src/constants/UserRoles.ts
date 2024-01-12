import { Role } from "../models/Role";

//Definimos los Roles para nuestros usuarios como objetos para para importarlos en la asignacion de roles a nuestros usuarios.
export const UserRoles = {
   ADMIN: { id: 1, role_name: "admin" } as Role,
   CLIENT: { id: 2, role_name: "client" } as Role,
   ARTIST: { id: 3, role_name: "artist" } as Role,
};
