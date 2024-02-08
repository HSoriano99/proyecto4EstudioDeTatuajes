import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";
import { Appointment } from "./Appointment";
import { Design } from "./Design";

@Entity("artists")
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name?: string;

  @Column()
  phone_number!: string;

  @Column()
  tattoo_style!: string;

  // 1:1 con User
  @OneToOne(() => User, (user) => user.artist)
  @JoinColumn({ name: "user_id" })
  user!: User;

  // 1:N con Appointment
  @OneToMany(() => Appointment, (appointment) => appointment.artist)
  appointment!: Appointment;

  //1:N con Designs
  @OneToMany(() => Design, (design) => design.artist)
  design!: Design;



}
