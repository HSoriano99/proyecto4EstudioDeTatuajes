import { BaseEntity, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Artist } from "./Artist"

@Entity("designs")
export class Design extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    artist_id!: string

    @Column()
    design_name!: string

    @Column({array: true})
    image!: string

     // N:1 con Artist 
     @ManyToOne(() => Artist, (artist) => artist.design)
     @JoinColumn ({name: "artist_id"})
     artist!: Artist;


 }