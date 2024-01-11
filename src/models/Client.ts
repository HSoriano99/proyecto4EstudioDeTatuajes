import { BaseEntity, Column, Entity, OneToOne, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Role } from "./Role" 
import { User } from "./User"
import { Appointment } from "./Appointment"

@Entity("clients")
export class Client extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    @Column()
    phone_number!: string

    // 1:1 con User 
    @OneToOne(() => User, (user) => user.client)
    @JoinColumn({name: "user_id"})
    user!: User;

     // 1:N con Appointment 
     @OneToMany(() => Appointment, (appointment) => appointment.client)
     appointment!: Appointment;


 }
  
