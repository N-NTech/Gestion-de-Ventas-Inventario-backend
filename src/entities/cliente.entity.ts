import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "./pedido.entity";

@Entity()
export class Cliente{
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    nombre:string;

    @Column()
    dni:string;

    @Column()
    telefono:string;
    
    @OneToOne(() => Pedido, (pedido) => pedido.cliente)
    pedido: Pedido
}