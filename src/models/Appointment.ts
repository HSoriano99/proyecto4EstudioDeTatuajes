import { BaseEntity, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Client } from "./Client"
import { Artist } from "./Artist"

@Entity("appointments")
export class Appointment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: "date" })
    date!: Date

    @Column()
    shift!: string

    // N:1 con Client 
    @ManyToOne(() => Client, (client) => client.appointment)
    @JoinColumn({name: "client_id", referencedColumnName: "id"})
    client!: Client;

     // N:1 con Artist 
     @ManyToOne(() => Artist, (artist) => artist.appointment)
     @JoinColumn ({name: "artist_id", referencedColumnName: "id"})
     artist!: Artist;


 }