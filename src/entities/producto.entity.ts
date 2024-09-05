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
    
    @ManyToOne(() => Modelo, (modelo) => modelo.productos, {cascade: true})
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



    constructor(
        categoria: CategoriaEnum,
        modelo: Modelo,
        talle: number,
        color: string,
        stock: number
    ) {
        this.categoria = categoria;
        this.modelo = modelo;
        this.talle = talle;
        this.color = color;
        this.stock = stock;
    }

}