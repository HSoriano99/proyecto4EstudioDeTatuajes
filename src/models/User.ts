import { BaseEntity, Column, Entity, OneToOne, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role" 
import { Appointment } from "./Appointment"

@Entity("users")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    role_id!: number

    @Column()
    username!: string

    @Column()
    password_hash!: string

    @Column()
    email!: string

    // N:1 con Role
    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn ({name: "role_id"})
    role!: Role;

     // 1:1 con Clients PENDIENTE
   @OneToOne(() => blabla, (blabla) => blabla.user)
   teacher?: Teacher;

    // 1:1 con Artists PENDIENTE
    @OneToOne(() => blabla, (blabla) => blabla.user)
    teacher?: Teacher;
 }
  

 




