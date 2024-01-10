import { BaseEntity, Column, Entity, OneToOne, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role" 
import { Client } from "./Client"
import { Artist } from "./Artist"

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    username!: string

    @Column()
    password_hash!: string

    @Column()
    email!: string

    // N:1 con Role
    @ManyToOne(() => Role, (role) => role.user)
    @JoinColumn ({name: "role_id"})
    role!: Role;

     // 1:1 con Clients 
   @OneToOne(() => Client, (client) => client.user)
   client?: Client;

    // 1:1 con Artists PENDIENTE
    @OneToOne(() => blabla, (blabla) => blabla.user)
    teacher?: Teacher;
 }
  

 




