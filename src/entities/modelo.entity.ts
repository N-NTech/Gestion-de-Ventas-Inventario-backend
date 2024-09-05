import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Marca } from "./marca.entity";
import { Producto } from "./producto.entity";

@Entity()
export class Modelo {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @ManyToOne(() => Marca, marca => marca.modelos, {cascade:true})
    @JoinColumn()
    marca: Marca

    @Column()
    nombre: String

    @Column()
    variante: String

    @OneToMany(() => Producto, productos => productos.modelo)
    productos: Producto[]


    constructor(
        marca: Marca,
        nombre: string,
        variante: string
    ) {
        this.marca = marca;
        this.nombre = nombre;
        this.variante = variante;
    }
    
}