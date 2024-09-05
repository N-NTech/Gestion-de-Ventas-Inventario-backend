import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Modelo } from "./modelo.entity";

@Entity()
export class Marca {
    @PrimaryGeneratedColumn('increment')
    id:number;
    
    @Column()
    nombre:String;

    @OneToMany(() => Modelo, (modelos) => modelos.marca)
    modelos:Modelo[]


    constructor(
        nombre: string
    ) {
        this.nombre = nombre;
    }
}