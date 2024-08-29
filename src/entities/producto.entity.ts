import { CategoriaEnum } from "src/enums/categoriaEnum.enum";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Modelo } from "./modelo.entity";
import { Pedido } from "./pedido.entity";

@Entity()
export class Producto {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type:'enum', enum:CategoriaEnum})
    categoria: CategoriaEnum
    
    @ManyToOne(() => Modelo, (modelo) => modelo.productos, {cascade: ["insert"]})
    @JoinColumn()
    modelo:Modelo

    @Column()
    talle: number

    @Column()
    color: String

    @Column()
    stock: number;

    @OneToMany(() => Pedido, (pedidos) => pedidos.producto)
    pedidos: Pedido[]

}