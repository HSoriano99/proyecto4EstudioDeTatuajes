import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./User"

@Entity("roles")
export class Role extends BaseEntity {
@PrimaryGeneratedColumn()
id!: number

@Column()
role_name!: string

// 1:N con User
@OneToMany(() => User, (user) => user.role)

users!: User[];
 

}
